import uuid
from django.db import models
from clientes.models import Cliente
from productos.models import Producto

PREFIJOS_CODIGO = {
    'shalom': 'SH',
    'contraentrega': 'CE',
}


class Pedido(models.Model):
    ESTADOS = [
        ('pendiente_whatsapp', 'Pendiente en WhatsApp'),
        ('confirmado', 'Confirmado'),
        ('enviado', 'Enviado'),
        ('cancelado', 'Cancelado'),
    ]

    TIPO_ENTREGA = [
        ('shalom', 'Envio por Shalom'),
        ('contraentrega', 'Recojo - Contraentrega'),
    ]

    PUNTOS_RECOJO = [
        ('plaza_puruchuco', 'Real Plaza Puruchuco'),
        ('mall_santa_anita', 'Mall Aventura Santa Anita'),
        ('plaza_norte', 'Plaza Norte'),
        ('megaplaza', 'Megaplaza'),
    ]

    codigo = models.CharField(max_length=10, unique=True, blank=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, related_name='pedidos')
    estado = models.CharField(max_length=30, choices=ESTADOS, default='pendiente_whatsapp')
    tipo_entrega = models.CharField(max_length=20, choices=TIPO_ENTREGA, default='shalom')
    punto_recojo = models.CharField(max_length=30, choices=PUNTOS_RECOJO, blank=True, null=True)
    subtotal_productos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    costo_extra = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    creado_en = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.codigo:
            prefijo = PREFIJOS_CODIGO.get(self.tipo_entrega, 'PD')
            self.codigo = f"{prefijo}{uuid.uuid4().hex[:4].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Pedido #{self.codigo} - {self.cliente}"


class PedidoItem(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.producto}"