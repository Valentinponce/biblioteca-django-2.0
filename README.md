#  Biblioteca Django 2.0

¡Bienvenido a Biblioteca Django 2.0! Una aplicación web modular desarrollada con Django y PostgreSQL totalmente contenedorizada mediante Docker para garantizar un entorno de desarrollo limpio, rápido y portátil.

*Tecnologías Utilizadas

- Backend: Python / Django Framework
- Base de Datos: PostgreSQL
- Contenedorización: Docker & Docker Compose
- Frontend: HTML5, CSS, JavaScript 
- Autenticación y Seguridad: Django Auth System & protocolo SMTP para correos


##  Funcionalidades y Módulos Desarrollados

A lo largo de la programación del proyecto se implementaron e integraron los siguientes módulos clave:

*  Entorno Contenedorizado con Docker:**
    -   Aislamiento de servicios mediante contenedores independientes (aplicación web Django + base de datos PostgreSQL).
    -   Uso de volúmenes persistentes para la gestión y seguridad de datos en PostgreSQL.
*  Sistema de Autenticación (Login / Registro):**
    -   Procesamiento seguro de credenciales y manejo de sesiones de usuario.
    -   Protección contra ataques CSRF (`{% csrf_token %}`) en los formularios de autenticación.
    -   Validaciones personalizadas para el registro de nuevos usuarios y control de duplicados en la base de datos.
*  Gestión de Permisos y Roles de Usuario:**
    -   Diferenciación de accesos entre usuarios estándar y administradores/superusuarios (`is_staff`, `is_superuser`).
    -   Restricción de vistas y contenido sensible según el nivel de permisos del usuario autenticado.
    -   Integración y personalización del panel de administración nativo de Django.
*  Recuperación de Contraseña por Correo Electrónico:**
    -   Flujo completo de restablecimiento de contraseña mediante el envío de tokens temporales por correo electrónico (protocolo SMTP).
    -   Integración de vistas y plantillas personalizadas para la solicitud, validación de token e ingreso de nueva contraseña.


--Esta página fue simplificada para uso individual y planteamientos de ideas, a futuro puede seguir desarrollándose para darle un uso colectivo, con cientos de usuarios e ideas desarrolladas en la susodicha página-- 

##  Requisitos Previos

Antes de empezar, asegúrate de tener instalado en tu sistema:
*   [Git](https://git-scm.com/)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Instalación y Configuración (Paso a Paso)

Sigue estos pasos para clonar el repositorio y levantar el entorno local de desarrollo:

### 1. Clonar el repositorio
Abre tu terminal y ejecuta el siguiente comando para traerte el proyecto:
```bash
git clone [https://github.com/Valentinponce/biblioteca-django-2.0.git](https://github.com/Valentinponce/biblioteca-django-2.0.git)
cd biblioteca-django-2.0

2. Construir y encender los contenedores
Levanta todo el ecosistema (Django + Postgres) con Docker:
docker-compose up --build

3. Crear las tablas en la Base de Datos (PostgreSQL)
En una nueva pestaña de tu terminal, corre las migraciones de Django para impactar la base de datos limpia:
docker-compose exec web python manage.py migrate

4. Crear un Súper Usuario (Administrador)
Para poder acceder al panel de administración y probar los flujos de login, crea un administrador ejecutando:
docker-compose exec web python manage.py createsuperuser



