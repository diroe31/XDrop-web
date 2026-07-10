from rest_framework import viewsets
from .models import ContenidoHome
from .serializers import ContenidoHomeSerializer
from .models import Pregunta, QuienesSomos
from .serializers import PreguntaSerializer, QuienesSomosSerializer


class ContenidoHomeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContenidoHomeSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = ContenidoHome.objects.filter(activo=True)
        tipo = self.request.query_params.get('tipo')
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        return queryset


class PreguntaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pregunta.objects.filter(activo=True)
    serializer_class = PreguntaSerializer
    pagination_class = None


class QuienesSomosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = QuienesSomos.objects.all()
    serializer_class = QuienesSomosSerializer
    pagination_class = None