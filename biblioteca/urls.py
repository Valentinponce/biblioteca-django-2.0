from django.urls import path
from . import views

urlpatterns = [
    path('inicio/', views.inicio_vista, name='inicio'),
    path('biblioteca/', views.biblioteca_vista, name='biblioteca'),
    path('libro/<int:libro_id>/editar/', views.editor_libro_vista, name='editor_libro'),
]