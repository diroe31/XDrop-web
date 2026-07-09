from rest_framework.routers import DefaultRouter
from .views import ContenidoHomeViewSet, PreguntaViewSet, QuienesSomosViewSet

router = DefaultRouter()
router.register('preguntas', PreguntaViewSet, basename='preguntas')
router.register('nosotros', QuienesSomosViewSet, basename='nosotros')
router.register('', ContenidoHomeViewSet, basename='contenido-home')

urlpatterns = router.urls