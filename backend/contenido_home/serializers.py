from rest_framework import serializers
from .models import ContenidoHome


class ContenidoHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContenidoHome
        fields = '__all__'