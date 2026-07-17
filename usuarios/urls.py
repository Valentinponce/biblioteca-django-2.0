from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_vista, name='login'),
    path('registro/', views.registro_vista, name='registro'), # 👈 Nueva ruta de 
    path('logout/', views.logout_vista, name='logout'), # 👈 Nueva ruta de logout
]