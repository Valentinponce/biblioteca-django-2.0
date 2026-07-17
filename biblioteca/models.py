from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Biblioteca(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, default="Mi Biblioteca Privada")
    es_publica = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nombre} - {self.usuario.username}"

class Libro(models.Model):
    biblioteca = models.ForeignKey(Biblioteca, on_delete=models.CASCADE, related_name='libros')
    titulo = models.CharField(max_length=200)
    
    contenido = models.TextField(blank=True, default="")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.titulo

class Personaje(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name='personajes')
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    imagen = models.ImageField(upload_to='personajes/', blank=True, null=True) # 👈 ¡Corregido a upload_to!

    def __str__(self):
        return self.nombre

class Ciudad(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name='ciudades')
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    imagen = models.ImageField(upload_to='ciudades/', blank=True, null=True) # 👈 ¡Corregido a upload_to!

    def __str__(self):
        return self.nombre