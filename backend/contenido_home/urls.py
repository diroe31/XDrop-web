from rest_framework.routers import DefaultRouter
from .views import ContenidoHomeViewSet

router = DefaultRouter()
router.register('', ContenidoHomeViewSet, basename='contenido-home')

urlpatterns = router.urls