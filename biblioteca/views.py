from django.shortcuts import render, redirect

def inicio_vista(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'biblioteca/inicio.html')

def biblioteca_vista(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'biblioteca/biblioteca.html')

def editor_libro_vista(request, libro_id):
    if not request.user.is_authenticated:
        return redirect('login')
        
    libro_simulado = {
        'id': libro_id,
        'titulo': f"Libro ID #{libro_id} (Modo Escritura)",
    }
    return render(request, 'biblioteca/libro_editor.html', {'libro': libro_simulado})