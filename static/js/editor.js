// Capturamos los botones de las carpetas
const btnHistoria = document.getElementById('btn-ver-historia');
const btnPersonaje = document.getElementById('btn-ver-personaje');

// Capturamos los paneles de trabajo
const panelHistoria = document.getElementById('panel-historia');
const panelPersonaje = document.getElementById('panel-personaje');

// Evento para ver el Editor de la Historia
btnHistoria.addEventListener('click', () => {
    // 1. Intercambiamos visibilidad de paneles
    panelPersonaje.style.display = 'none';
    panelHistoria.style.display = 'block';
    
    // 2. Cambiamos la estética de los botones activos
    btnPersonaje.classList.remove('activo');
    btnHistoria.classList.add('activo');
});

// Evento para ver los Apuntes del Personaje
btnPersonaje.addEventListener('click', () => {
    // 1. Intercambiamos visibilidad de paneles
    panelHistoria.style.display = 'none';
    panelPersonaje.style.display = 'block';
    
    // 2. Cambiamos la estética de los botones activos
    btnHistoria.classList.remove('activo');
    btnPersonaje.classList.add('activo');
});