from rest_framework import viewsets
from .models import Coleccion, Categoria, Producto
from .serializers import ColeccionSerializer, CategoriaSerializer, ProductoSerializer


class ColeccionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coleccion.objects.all()
    serializer_class = ColeccionSerializer
    lookup_field = 'slug'


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    lookup_field = 'slug'