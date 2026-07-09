from rest_framework.routers import DefaultRouter
from .views import ColeccionViewSet, CategoriaViewSet, ProductoViewSet

router = DefaultRouter()
router.register('colecciones', ColeccionViewSet)
router.register('categorias', CategoriaViewSet)
router.register('productos', ProductoViewSet)

urlpatterns = router.urls