
# Documentación Frontend

Guía para la estructura, desarrollo y buenas prácticas del frontend del Die Control System.

## 1. Estructura de carpetas y archivos principales

```
frontend/
├── src/
│   ├── components/      # Componentes reutilizables (formularios, tablas, modales)
│   ├── pages/           # Vistas principales (catálogos, reportes, dashboard)
│   ├── services/        # Lógica de conexión con la API (Axios)
│   ├── hooks/           # Hooks personalizados para lógica de estado y efectos
│   ├── styles/          # Archivos de TailwindCSS y estilos globales
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
├── package.json         # Dependencias y scripts
```

## 2. Comandos para instalar dependencias, iniciar y testear el frontend

- Instalar dependencias principales:
	```bash
	npm install react react-dom vite axios tailwindcss yup
	```
- (Opcional) Instalar dependencias para testing:
	```bash
	npm install --save-dev vitest
	```
- Iniciar el servidor de desarrollo:
	```bash
	npm run dev
	```
- Ejecutar pruebas (si existen):
	```bash
	npm test
	# o
	npx vitest
	```

## 3. Reglas para componentes, servicios y manejo de estado

- **Componentes:**
	- Usa componentes reutilizables para formularios, tablas y modales.
	- Mantén la lógica de presentación separada de la lógica de negocio.
	- Ejemplo: `DieForm.jsx`, `DamageReportTable.jsx`.

- **Servicios (API):**
	- Centraliza las llamadas a la API en archivos de servicios usando Axios.
	- Ejemplo: `dieService.js`, `damageReportService.js`.

- **Hooks personalizados:**
	- Usa hooks para manejar estado, efectos y lógica compartida.
	- Ejemplo: `useFetch.js`, `useForm.js`.

- **Manejo de estado:**
	- Usa useState y useEffect para estados locales.
	- Considera usar Context API o librerías como Redux si el estado global crece.

## 4. Buenas prácticas

- Usa validaciones con Yup en formularios.
- Aplica estilos con TailwindCSS para mantener coherencia visual.
- Documenta cada componente y servicio importante.
- Mantén la estructura de carpetas clara y ordenada.
- Realiza pruebas unitarias e integración para componentes críticos.
- Actualiza la documentación y los servicios al modificar la API.

## 5. Acceso desde red local (LAN)

- El frontend (Vite) está configurado para escuchar en 0.0.0.0, lo que permite acceso desde otras computadoras en la misma red.
- Usa la IP local del servidor para acceder a la app (ejemplo: `http://192.168.2.181:5173`).
- Si hay firewall, permite el puerto configurado (por defecto 5173).

## 6. Ejemplo de servicio con Axios

```js
// src/services/dieService.js
import axios from 'axios';

export const getDies = () => axios.get('/api/die-description');
export const createDie = (data) => axios.post('/api/die-description', data);
export const updateDie = (id, data) => axios.put(`/api/die-description/${id}`, data);
export const deleteDie = (id) => axios.delete(`/api/die-description/${id}`);
```



## 6. Recomendaciones de seguridad y rendimiento

- Valida y sanitiza los datos antes de enviarlos al backend.
- Maneja errores y estados de carga en los componentes.
- Protege rutas sensibles en el frontend según el rol del usuario.
- Optimiza el rendimiento usando lazy loading y memoización en componentes grandes.

## 7. Diseño base layout

El layout principal de la aplicación web se compone de los siguientes elementos:

- **Nav superior (header):**
	- Izquierda: Logo de la empresa + texto “Die Control System”.
	- Derecha: “Welcome User” (link a perfil) y “Logout” (link a login).

- **Contenedor izquierdo (sidebar):**
	- Menú de navegación dinámico según permisos del usuario.
	- El menú debe ser colapsable y soportar submenús.

- **Área principal:**
	- Espacio para mostrar tablas, formularios y vistas principales.
	- El menú sidebar es estático; solo el área principal se mueve con el scrollbar si es necesario.
	- Después del login, se muestra el layout completo; por ahora solo se diseña el espacio.

---

Esta guía debe actualizarse conforme evolucione el sistema y se agreguen nuevas funciones o módulos.
