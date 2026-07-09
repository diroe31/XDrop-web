from decimal import Decimal
from urllib.parse import quote

from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .serializers import CrearPedidoSerializer
from .models import Pedido, PedidoItem
from clientes.models import Cliente
from productos.models import Producto

COSTO_CONTRAENTREGA = Decimal('2.50')

NOMBRES_PUNTOS = {
    'plaza_puruchuco': 'Real Plaza Puruchuco',
    'mall_santa_anita': 'Mall Aventura Santa Anita',
    'plaza_norte': 'Plaza Norte',
    'megaplaza': 'Megaplaza',
}


class CrearPedidoView(APIView):
    def post(self, request):
        serializer = CrearPedidoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        with transaction.atomic():
            cliente, _ = Cliente.objects.update_or_create(
                telefono=data['telefono'],
                defaults={
                    'nombre': data['nombre'],
                    'departamento': data.get('departamento', ''),
                    'provincia': data.get('provincia', ''),
                    'distrito': data.get('distrito', ''),
                }
            )

            subtotal = Decimal('0')
            items_creados = []
            for item in data['items']:
                producto = Producto.objects.get(id=item['producto_id'])
                sub = producto.precio * item['cantidad']
                subtotal += sub
                items_creados.append((producto, item['cantidad'], producto.precio))

            costo_extra = COSTO_CONTRAENTREGA if data['tipo_entrega'] == 'contraentrega' else Decimal('0')
            total = subtotal + costo_extra

            pedido = Pedido.objects.create(
                cliente=cliente,
                tipo_entrega=data['tipo_entrega'],
                punto_recojo=data.get('punto_recojo'),
                subtotal_productos=subtotal,
                costo_extra=costo_extra,
                total=total,
            )
            for producto, cantidad, precio in items_creados:
                PedidoItem.objects.create(
                    pedido=pedido, producto=producto,
                    cantidad=cantidad, precio_unitario=precio
                )

        lineas = [
            "*XDrop - Nuevo pedido*",
            f"Codigo: {pedido.codigo}",
            "",
            "*Productos:*",
        ]
        for producto, cantidad, precio in items_creados:
            sub = precio * cantidad
            lineas.append(f"- {producto.nombre} x{cantidad} — S/{sub:.2f}")

        lineas += ["", f"Subtotal productos: S/{subtotal:.2f}"]

        if data['tipo_entrega'] == 'contraentrega':
            punto = NOMBRES_PUNTOS.get(data['punto_recojo'], data['punto_recojo'])
            lineas += [
                f"Costo contraentrega: S/{costo_extra:.2f}",
                f"*Total: S/{total:.2f}*",
                "",
                "*Entrega:* Contraentrega",
                f"Punto de recojo: {punto}",
            ]
        else:
            lineas += [
                "",
                "*Entrega:* Envio por Shalom",
            ]
            if cliente.departamento:
                lineas.append(f"Departamento: {cliente.departamento}")
            if cliente.provincia:
                lineas.append(f"Provincia: {cliente.provincia}")
            if cliente.distrito:
                lineas.append(f"Distrito: {cliente.distrito}")
            lineas += [
                "",
                "Podrian cotizarme el envio por Shalom a este distrito?",
            ]

        lineas += [
            "",
            f"Nombre: {cliente.nombre}",
            f"Telefono: {cliente.telefono}",
            "",
            "Gracias!",
        ]

        mensaje = "\n".join(lineas)
        numero = config('WHATSAPP_NUMERO')
        link_whatsapp = f"https://wa.me/{numero}?text={quote(mensaje)}"

        return Response({
            "pedido_codigo": pedido.codigo,
            "total": str(total),
            "link_whatsapp": link_whatsapp
        }, status=status.HTTP_201_CREATED)