// =========================================================================
// 1. CARGA INICIAL Y VARIABLES GLOBALES
// =========================================================================

// Usamos 'let' porque 'misLibros' va a cambiar (mutar) cuando agreguemos o eliminemos libros.
// 'localStorage.getItem' saca texto del navegador. Como JavaScript no entiende texto plano para operar,
// usamos 'JSON.parse()' para convertir ese texto otra vez en un Array [] de objetos.
// El operador '|| []' (OR) es un salvavidas: si el navegador está vacío, nos da un array vacío para que el código no explote.
let misLibros = JSON.parse(localStorage.getItem('librosGuardados')) || [];

// Usamos 'const' porque la referencia al Set no va a cambiar nunca.
// Un 'Set' es una estructura especial de JavaScript similar a un array, pero con un superpoder:
// NO permite elementos duplicados. Ideal para almacenar categorías únicas.
const clasificaciones = new Set();

// 'document' representa a toda tu página web. 'addEventListener' es un "escuchador".
// Aquí le decimos: "En cuanto el navegador termine de leer y construir el HTML (DOMContentLoaded), ejecuta este código".
// Usamos una "función flecha" (() => { ... }) que es una forma moderna y limpia de escribir funciones.
document.addEventListener('DOMContentLoaded', () => {
    
    // '.forEach' es un bucle que recorre el array 'misLibros' uno por uno.
    // En cada vuelta, la variable temporal 'libro' guarda los datos del libro actual.
    misLibros.forEach(libro => {
        // 'if' evalúa si el libro actual tiene escrita una categoría.
        if (libro.categoria) {
            // '.add' mete la categoría al Set. Si la categoría ya existía, el Set la ignora automáticamente.
            clasificaciones.add(libro.categoria);
        }
    });

    // 'const' aquí es obligatorio porque estos elementos del HTML son fijos, no los vas a intercambiar por otros.
    // 'document.getElementById' busca en tu HTML la etiqueta que tenga ese ID específico.
    const pantallaSeleccion = document.getElementById('pantalla-seleccion');
    const panelWorkspace = document.getElementById('panel-workspace');
    
    // Validamos con 'if' por seguridad: "Si el elemento existe en la página, haz lo siguiente..."
    // '.classList' nos da acceso a las clases CSS de esa etiqueta.
    // '.remove' borra la clase 'oculto' (haciendo que el elemento aparezca en pantalla).
    if (pantallaSeleccion) pantallaSeleccion.classList.remove('oculto');
    // '.add' añade la clase 'oculto' (escondiendo el panel de trabajo al arrancar).
    if (panelWorkspace) panelWorkspace.classList.add('oculto');
});

// =========================================================================
// 2. TRANSICIÓN DE PANTALLAS
// =========================================================================

// Definición de función clásica. Se ejecutará cuando alguien haga clic en el botón de entrar.
function entrarABiblioteca() {
    const pantallaSeleccion = document.getElementById('pantalla-seleccion');
    const panelWorkspace = document.getElementById('panel-workspace');

    // Añade una clase CSS que activa una animación de difuminado (blur).
    pantallaSeleccion.classList.add('efecto-blur');

    // 'setTimeout' es un temporizador nativo de JavaScript.
    // Ejecuta el código de adentro en diferido. El '800' del final son milisegundos (0.8 segundos).
    // Esto da tiempo a que la animación de difuminado termine antes de cambiar de pantalla.
    setTimeout(() => {
        pantallaSeleccion.classList.add('oculto');    // Esconde la pantalla de bienvenida
        panelWorkspace.classList.remove('oculto');   // Muestra la biblioteca real
        
        // Llamamos a otras dos funciones encargadas de dibujar los datos en la pantalla.
        actualizarSidebar();
        actualizarGridLibros();
    }, 800);
}

// =========================================================================
// 3. CONTROLADORES DEL MODAL (VENTANA EMERGENTE)
// =========================================================================

function abrirModal() {
    // Quita la clase oculto para que el formulario flotante aparezca visualmente.
    document.getElementById('modal-libro').classList.remove('oculto');
}

function cerrarModal() {
    // Añade 'oculto' para hacer desaparecer el formulario de la vista.
    document.getElementById('modal-libro').classList.add('oculto');
    // '.reset()' limpia todos los campos de texto e inputs del formulario, dejándolos en blanco para la próxima vez.
    document.getElementById('form-nuevo-libro').reset();
}

// =========================================================================
// 4. CREAR LIBRO
// =========================================================================

// Esta función recibe el parámetro 'event', que es un objeto que contiene toda la información del clic de envío.
function crearLibro(event) {
    // IMPORTANTE: Por defecto, los formularios HTML intentan recargar la página entera al enviarse.
    // 'event.preventDefault()' frena ese comportamiento para que la página NO se recargue y podamos usar JavaScript.
    event.preventDefault(); 

    // '.value' extrae el texto exacto que el usuario escribió dentro de los campos de texto del HTML.
    const titulo = document.getElementById('libro-titulo').value;
    // '.trim()' es una función de texto que borra los espacios vacíos por accidente al inicio y al final (ej: "  Terror " -> "Terror").
    const categoria = document.getElementById('libro-categoria').value.trim();
    const sinopsis = document.getElementById('libro-sinopsis').value;
    
    const inputImagen = document.getElementById('libro-imagen');
    // '.files[0]' accede al archivo real (imagen) que el usuario subió desde su computadora (el primero de la lista).
    const archivo = inputImagen.files[0];

    // Esto es una función flecha guardada dentro de una constante ('guardarYRenderizar').
    // Recibe la URL de la imagen (ya sea procesada o por defecto).
    const guardarYRenderizar = (urlImagen) => {
        // Creamos un objeto {} con los datos estructurados.
        // 'Date.now()' genera un número gigante basado en los milisegundos actuales. Lo usamos como ID único para el libro.
        // Al poner 'titulo', 'categoria', 'sinopsis' a secas, JavaScript entiende que la clave y el valor se llaman igual.
        const nuevoLibro = { id: Date.now(), imagen: urlImagen, titulo, categoria, sinopsis }; 
        
        // '.push()' mete este nuevo objeto libro al final de nuestro array 'misLibros'.
        misLibros.push(nuevoLibro);

        // 'localStorage' solo entiende texto. 'JSON.stringify()' hace lo contrario a parse:
        // convierte nuestro array de objetos de JavaScript en un texto plano (string) para poder guardarlo en el disco duro del navegador.
        localStorage.setItem('librosGuardados', JSON.stringify(misLibros));

        // El '!' significa NEGACIÓN. Traducido: "Si hay una categoría Y el Set de clasificaciones NO la tiene guardada..."
        if (categoria && !clasificaciones.has(categoria)) {
            clasificaciones.add(categoria); // La añade para que no se pierda.
        }

        // Volvemos a renderizar los componentes visuales para que el nuevo libro aparezca inmediatamente en pantalla.
        actualizarSidebar();
        actualizarGridLibros();
        cerrarModal(); // Cerramos la ventana flotante.
    };

    // 'if (archivo)' verifica si el usuario efectivamente subió una foto propia.
    if (archivo) {
        // 'FileReader' es un objeto nativo del navegador que sabe leer archivos locales de la computadora del usuario.
        const lector = new FileReader();
        // Le programamos un evento: "Cuando termines de procesar la imagen (onload), ejecuta esto..."
        lector.onload = function(e) {
            // 'e.target.result' contiene la imagen convertida en un texto larguísimo en formato Base64 (DataURL).
            guardarYRenderizar(e.target.result); 
        };
        // Aquí inicia formalmente la lectura de la imagen física.
        lector.readAsDataURL(archivo);
    } else {
        // Si el usuario no subió una foto, llamamos a la función pasándole un enlace de una imagen genérica de Internet.
        guardarYRenderizar("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400");
    }
}

// =========================================================================
// 5. PINTAR CLASIFICACIONES (SIDEBAR)
// =========================================================================

function actualizarSidebar() {
    const lista = document.getElementById('lista-clasificaciones');
    // Cláusula de guarda: Si por algún motivo este elemento no está en el HTML, el 'return' frena la función en seco para evitar errores.
    if (!lista) return;
    
    // '.innerHTML' borra todo el contenido HTML que había dentro de la lista y le clava el primer botón estático de "Todos".
    lista.innerHTML = `<li class="item-clasificacion activa" id="cat-todos" onclick="filtrarLibros('todos')">Todos los libros</li>`;

    // Recorremos el Set de categorías únicas usando '.forEach'.
    clasificaciones.forEach(cat => {
        // 'document.createElement' fabrica una etiqueta HTML <li> completamente desde el código, aún no visible.
        const li = document.createElement('li');
        li.className = 'item-clasificacion';       // Le asigna la clase CSS para diseño.
        li.textContent = cat;                      // Le inyecta el texto del nombre de la categoría.
        // Le asignamos un evento de clic dinámico: al pulsar, llamará a 'filtrarLibros' pasando su propio nombre y su etiqueta.
        li.onclick = () => filtrarLibros(cat, li);
        
        // '.appendChild' agarra esa etiqueta <li> que creamos en el limbo y la mete físicamente dentro de la lista en el HTML.
        lista.appendChild(li);
    });
}

// =========================================================================
// 6. PINTAR LIBROS EN EL GRID
// =========================================================================

// Usamos un parámetro por defecto: si llamamos a la función sin pasarle nada, 'librosFiltrados' valdrá automáticamente 'misLibros'.
function actualizarGridLibros(librosFiltrados = misLibros) {
    const grid = document.getElementById('grid-libros');
    if (!grid) return;
    
    // Limpiamos por completo el contenedor de libros viejo antes de pintar el nuevo.
    grid.innerHTML = ''; 

    const zonaVacia = document.getElementById('zona-vacia');
    // Evaluamos el tamaño del array mediante '.length' (longitud).
    if (librosFiltrados.length === 0) {
        // Si es 0 (no hay libros), quitamos 'oculto' al texto del centro que dice "No tienes libros".
        if (zonaVacia) zonaVacia.classList.remove('oculto');
    } else {
        // Si hay aunque sea uno, escondemos ese cartel molesto.
        if (zonaVacia) zonaVacia.classList.add('oculto');
    }

    // Creamos la tarjeta fija que sirve como botón para abrir el Modal.
    const tarjetaAgregar = document.createElement('div');
    tarjetaAgregar.className = 'tarjeta-libro tarjeta-agregar-nueva';
    tarjetaAgregar.onclick = abrirModal; // Al hacer clic en cualquier parte de esta tarjeta, se abre el modal.
    tarjetaAgregar.innerHTML = `
        <div class="icono-mas">➕</div>
        <p>Añadir libro</p>
    `;
    grid.appendChild(tarjetaAgregar);

    // Iteramos sobre la lista de libros que toca mostrar.
    librosFiltrados.forEach((libro) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-libro';
        // '.title' es un atributo del navegador: cuando dejas el mouse quieto encima de la tarjeta, sale un flotante con la sinopsis.
        tarjeta.title = libro.sinopsis;

        // Evaluación de cortocircuito: si el libro por alguna razón vieja no tiene ID, le asigna temporalmente la fecha de hoy.
        const libroId = libro.id || Date.now();

        // Inyectamos la estructura interna de la tarjeta usando Template Literals (las comillas invertidas ``).
        // '.replace(/'/g, "\\'")' es una expresión regular. Sirve para que si el título del libro tiene comillas simples (ej: "L'amour"), 
        // JavaScript no se rompa al procesar el texto en la función de eliminar.
        // 'event.stopPropagation()' evita el "Efecto Burbuja": impide que al hacer clic en el botón, el clic se propague a la tarjeta entera.
        // 'window.location.href' es el encargado de redirigir el navegador hacia la URL de Django para editar el libro.
        tarjeta.innerHTML = `
           <button class="btn-eliminar-libro" onclick="eliminarLibro(event, '${libro.titulo.replace(/'/g, "\\'")}')">❌</button>
           <img src="${libro.imagen}" alt="${libro.titulo}">
           <div class="capa-info">
               <h4>${libro.titulo}</h4>
            <button class="btn-escribir-libro" onclick="event.stopPropagation(); window.location.href='/libro/${libroId}/editar/'">✒️ Escribir</button>
        </div>
    `;
        grid.appendChild(tarjeta); // Añadimos la tarjeta completa armada al contenedor principal.
    });
}

// =========================================================================
// 7. FILTRAR LIBROS POR CATEGORÍA
// =========================================================================

function filtrarLibros(categoria, elementoClickeado = null) {
    // Buscamos todas las categorías en pantalla y les borramos la clase 'activa' para "apagarlas" visualmente.
    document.querySelectorAll('.item-clasificacion').forEach(li => li.classList.remove('activa'));
    
    // Si la función recibió el elemento HTML al que se le dio clic:
    if(elementoClickeado) {
        elementoClickeado.classList.add('activa'); // Encendemos esa categoría visualmente.
    } else {
        // Si no recibió nada (fue un reset), buscamos por código el botón "Todos" y lo encendemos.
        const elTodos = document.getElementById('cat-todos');
        if (elTodos) elTodos.classList.add('activa');
    }

    // Lógica del filtro de datos
    if (categoria === 'todos') {
        // Si eligió todos, pasamos el array original completo.
        actualizarGridLibros(misLibros);
    } else {
        // '.filter' es un método brillante: recorre 'misLibros' y genera un NUEVO array conteniendo
        // ÚNICAMENTE los libros cuya categoría coincida exactamente con la seleccionada.
        const filtrados = misLibros.filter(l => l.categoria === categoria);
        actualizarGridLibros(filtrados); // Pintamos solo ese subconjunto.
    }
}

// =========================================================================
// 8. ELIMINAR UN LIBRO INDIVIDUAL
// =========================================================================

function eliminarLibro(event, tituloAEliminar) {
    // Nuevamente frenamos el clic para que el navegador no crea que queremos abrir el libro al intentar borrarlo.
    event.stopPropagation(); 
    
    // 'confirm()' lanza una ventana nativa de alerta del navegador con opciones "Aceptar" y "Cancelar". Devuelve true o false.
    if (confirm(`¿Seguro que quieres eliminar el libro "${tituloAEliminar}"?`)) {
        
        // Re-escribimos 'misLibros' filtrándolo: "Conserva todos los libros EXCEPTO el que tenga este título".
        misLibros = misLibros.filter(libro => libro.titulo !== tituloAEliminar);
        
        // Guardamos los cambios actualizados en el disco local convertido a texto.
        localStorage.setItem('librosGuardados', JSON.stringify(misLibros));

        // '.clear()' vacía por completo el Set de categorías guardadas en memoria RAM.
        clasificaciones.clear();
        // Re-corremos la lista de libros sobrevivientes para re-armar el Set de categorías desde cero (por si borramos la última de un tipo).
        misLibros.forEach(libro => {
            if (libro.categoria) clasificaciones.add(libro.categoria);
        });

        // Actualizamos los dos componentes visuales reflejando la eliminación inmediata.
        actualizarSidebar();
        actualizarGridLibros();
    }
}

// =========================================================================
// 9. VACÍAR TODA LA BIBLIOTECA
// =========================================================================

function eliminarTodo() {
    if (confirm("⚠️ ¿Estás seguro de vaciar toda la biblioteca?")) {
        misLibros = []; // Destruimos el contenido del array en memoria RAM poniéndolo vacío.
        clasificaciones.clear(); // Limpiamos el Set de categorías.
        localStorage.removeItem('librosGuardados'); // Borramos definitivamente la llave del almacenamiento del navegador.
        
        // 'window.location.reload()' es el equivalente en código a pulsar F5 en el teclado. 
        // Recarga toda la web limpiando cualquier rastro residual.
        window.location.reload();
    }
}