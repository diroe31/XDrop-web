from rest_framework import serializers
from .models import Pedido, PedidoItem
from clientes.models import Cliente


class PedidoItemInputSerializer(serializers.Serializer):
    producto_id = serializers.IntegerField()
    cantidad = serializers.IntegerField(min_value=1)


class CrearPedidoSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=150)
    telefono = serializers.CharField(max_length=20)
    departamento = serializers.CharField(max_length=100, required=False, allow_blank=True)
    provincia = serializers.CharField(max_length=100, required=False, allow_blank=True)
    distrito = serializers.CharField(max_length=100, required=False, allow_blank=True)
    tipo_entrega = serializers.ChoiceField(choices=['shalom', 'contraentrega'])
    punto_recojo = serializers.ChoiceField(
        choices=['plaza_puruchuco', 'mall_santa_anita', 'plaza_norte', 'megaplaza'],
        required=False, allow_null=True
    )
    items = PedidoItemInputSerializer(many=True)

    def validate(self, data):
        if data['tipo_entrega'] == 'contraentrega' and not data.get('punto_recojo'):
            raise serializers.ValidationError(
                "Debes elegir un punto de recojo si el tipo de entrega es contraentrega."
            )
        return data