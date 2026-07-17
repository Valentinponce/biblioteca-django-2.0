from django import forms
from .models import Libro, Biblioteca

class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = ['titulo', 'categoria', 'sinopsis', 'es_publico', 'portada']
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Título del libro'}),
            'categoria': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Fantasía, Terror, Romance...'}),
            'sinopsis': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }