from rest_framework import viewsets
from .models import ContenidoHome
from .serializers import ContenidoHomeSerializer


class ContenidoHomeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContenidoHomeSerializer

    def get_queryset(self):
        queryset = ContenidoHome.objects.filter(activo=True)
        tipo = self.request.query_params.get('tipo')
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        return queryset