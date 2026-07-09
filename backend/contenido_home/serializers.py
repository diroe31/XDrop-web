from rest_framework import serializers
from .models import ContenidoHome
from .models import Pregunta, QuienesSomos



class ContenidoHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContenidoHome
        fields = '__all__'

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'pregunta', 'respuesta', 'orden']


class QuienesSomosSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuienesSomos
        fields = ['id', 'titulo', 'contenido', 'imagen']