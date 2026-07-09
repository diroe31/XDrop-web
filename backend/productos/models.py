from django.db import models


class Coleccion(models.Model):
    nombre = models.CharField(max_length=100)       # Ej: "Resident Evil"
    slug = models.SlugField(max_length=100, unique=True)
    imagen_portada = models.ImageField(upload_to='colecciones/', blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class Categoria(models.Model):
    coleccion = models.ForeignKey(Coleccion, on_delete=models.CASCADE, related_name='categorias')
    nombre = models.CharField(max_length=100)        # Ej: "Figuras", "Pósters", "Armas"
    slug = models.SlugField(max_length=100)

    class Meta:
        unique_together = ('coleccion', 'slug')

    def __str__(self):
        return f"{self.coleccion.nombre} - {self.nombre}"


class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    nombre = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class ProductoImagen(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes')
    imagen = models.ImageField(upload_to='productos/')
    orden = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"