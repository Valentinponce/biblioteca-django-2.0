from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),       # Ruta del panel de administrador
    
    # 🔑 Rutas nativas de Django para la recuperación de contraseña
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='usuarios/registration/password_reset_form.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='usuarios/registration/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='usuarios/registration/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='usuarios/registration/password_reset_complete.html'), name='password_reset_complete'),

    # 🔗 Rutas de tus aplicaciones modulares
    path('', include('usuarios.urls')),    # Las rutas de login irán a la app usuarios
    path('', include('biblioteca.urls')),  # Las rutas del sistema irán a la app biblioteca
]

# 📷 Esto le dice a Django cómo servir las imágenes (media) en tu entorno de desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)