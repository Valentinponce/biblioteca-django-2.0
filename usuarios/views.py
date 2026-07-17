from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.contrib import messages

# Vista de LOGIN REAL
def login_vista(request):
    if request.user.is_authenticated:
        return redirect('inicio')
        
    if request.method == 'POST':
        nombre = request.POST.get('usuario_nombre')
        clave = request.POST.get('usuario_clave')
        
        # Autenticamos contra la base de datos de Postgres
        usuario = authenticate(request, username=nombre, password=clave)
        
        if usuario is not None:
            login(request, usuario)
            return redirect('inicio')
        else:
            messages.error(request, "Usuario o contraseña incorrectos.")
            
    return render(request, 'usuarios/login.html')

# Vista de REGISTRO REAL
def registro_vista(request):
    if request.user.is_authenticated:
        return redirect('inicio')
        
    if request.method == 'POST':
        nombre = request.POST.get('reg_nombre')
        email = request.POST.get('reg_email')
        clave = request.POST.get('reg_clave')
        clave_confirm = request.POST.get('reg_clave_confirm')
        
        # Validaciones básicas
        if clave != clave_confirm:
            messages.error(request, "Las contraseñas no coinciden.")
            return render(request, 'usuarios/registro.html')
            
        if User.objects.filter(username=nombre).exists():
            messages.error(request, "El nombre de usuario ya está registrado.")
            return render(request, 'usuarios/registro.html')
            
        if User.objects.filter(email=email).exists():
            messages.error(request, "El correo electrónico ya está registrado.")
            return render(request, 'usuarios/registro.html')
            
        # Crear usuario real en Postgres
        nuevo_usuario = User.objects.create_user(username=nombre, email=email, password=clave)
        nuevo_usuario.save()
        
        # Iniciar sesión automáticamente e ir al inicio
        login(request, nuevo_usuario)
        return redirect('inicio')
        
    return render(request, 'usuarios/registro.html')

from django.contrib.auth import logout # 👈 Asegúrate de importar logout arriba

def logout_vista(request):
    logout(request)
    return redirect('login')