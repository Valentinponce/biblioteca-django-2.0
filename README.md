#  Biblioteca Django 2.0

¡Bienvenido a **Biblioteca Django 2.0**! Una aplicación web desarrollada con **Django** y **PostgreSQL**, totalmente contenedorizada utilizando **Docker** para garantizar un entorno de desarrollo limpio, rápido y portátil.

---

## Tecnologías Utilizadas

*   **Backend:** Python / Django
*   **Base de Datos:** PostgreSQL
*   **Entorno:** Docker / Docker Compose
*   **Frontend:** HTML5, CSS3, JavaScript (diseño modular con bloques estáticos)

---

## 🛠️ Requisitos Previos

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

