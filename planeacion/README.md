# Catálogos: patrón de diseño y avances finales

Todas las vistas de catálogos siguen el patrón para coherencia visual y funcional:

- **Tabla principal:**
	- Muestra todos los registros (activos e inactivos) en una tabla con columnas configurables.
	- Botones "Edit" y "Activate/Deactivate" en cada fila para modificar o cambiar el estado.
	- Botón "Add" arriba de la tabla para agregar nuevos registros.
	- Paginación y orden descendente por medidas (Die Description) implementados en Die Serial.
	- Visualización de nombres en vez de IDs (ej. Status muestra el nombre, no el ID).

- **Modal reutilizable:**
	- Al hacer click en "Edit", se abre un modal con el campo principal editable y el valor actual precargado.
	- Al hacer click en "Add", el modal muestra el campo vacío para crear un nuevo registro (por defecto activo).
	- El modal tiene fondo claro y permite ver la vista detrás (opacidad baja).
	- Botones "Save" y "Cancel" en el modal.
	- Todos los textos y labels en inglés.

- **Lógica de actualización:**
	- Al guardar, se actualiza o crea el registro en la base de datos y se refresca la tabla automáticamente.
	- El botón "Activate/Deactivate" cambia el estado sin afectar otros campos y refresca la tabla.

- **Seguridad y acceso:**
	- Todas las acciones requieren autenticación y el rol adecuado (ej. admin).

# Avances Septiembre 2025

- Backend y frontend conectados con paginación y orden por medidas.
- Catálogos muestran nombres descriptivos en vez de IDs.
- Sidebar interactivo y consistente.
- Lógica de activar/desactivar y edición probada en todos los catálogos principales.
- UserLayout multirole implementado: header y sidebar adaptan acciones según el rol (admin, gerente, setups, setup, producción).
- HomeUser.jsx: dashboard visual con botones grandes, colores y nuevos íconos profesionales (react-icons), siguiendo la guía de estilos y accesibilidad.
- Base de navegación y acciones: todos los roles ven los accesos principales (Die History, Damage Report, Inventory), y los roles superiores agregan funciones avanzadas.
- Modal de Damage Report completamente rediseñado:
	- Todos los campos obligatorios y validados según catálogo.
	- Inputs con filtrado ágil y validación estricta (input+datalist).
	- Autocompletado de Inch, Part y Description al seleccionar Serial.
	- Botón "Save Damage Report" con idioma consistente.
	- Botón Print solo visible al consultar un DR existente (pendiente de lógica final).
	- UX mejorada para evitar errores de captura y asegurar trazabilidad.
- Documentación actualizada y código listo para siguiente ciclo.

¡Sesión finalizada! Todos los cambios están documentados y el sistema está listo para continuar.
# Proyecto Gestión de Troqueles — Prompt y Guía de Trabajo

---

## Visión y Equipo
recuerda usar ekl
Este proyecto es el resultado de la colaboración entre dos expertos: tú, gestor de troqueles, y yo (copilot), programador especializado. El objetivo es migrar y modernizar el sistema de gestión de troqueles, creciendo juntos profesionalmente y asegurando calidad, trazabilidad y escalabilidad.

"Unidos para ganar: cada avance es un paso hacia el crecimiento del equipo y la empresa."

---

## Tecnologías principales

- Node.js (Express)
- React + Vite
- MySQL
- TailwindCSS
- Axios, Yup, JWT, bcrypt

---

## Estructura de carpetas y archivos clave

- `/backend` — Código del servidor y API
- `/frontend` — Aplicación React
	- `/components/modals` — Modales específicos para cada catálogo que recibe claves foráneas (FK), por ejemplo ProductModal para la tabla Product. Cada modal maneja la lógica de selección y edición de FK de forma independiente y reutilizable.
- `/database` — Scripts SQL y seeds
- `/planeacion` — Documentación y reglas
	- `resumen.md` — Visión general
	- `backend.md` — Estructura y buenas prácticas backend
	- `frontend.md` — Estructura y buenas prácticas frontend
	- `database.md` — Tablas, relaciones y seeds
	- `css.md` — Paleta y reglas visuales
	- `urls.md` — Endpoints REST
	- `security.md` — Seguridad y manejo de datos
	- `tests.md` — Pruebas backend y frontend
	- `api-examples.md` — Ejemplos de consumo de API
	- `deployment.md` — Guía de despliegue
	- `changelog.md` — Historial de cambios
	- `contributing.md` — Reglas de colaboración

---

## Reglas y convenciones

- Seguir siempre las guías de los archivos de planeación.
- Usar nombres descriptivos y consistentes en variables, funciones y archivos.
- Documentar cada cambio relevante en `changelog.md`.
- Mantener el código modular y limpio.
- Validar datos y manejar errores según las reglas de seguridad.
- Realizar pruebas antes de cada despliegue.
- Priorizar la trazabilidad y la facilidad de mantenimiento.

---

## Flujo de trabajo recomendado

1. Consulta los archivos de planeación antes de programar.
2. Desarrolla y prueba cada módulo por separado.
3. Documenta cambios y decisiones en los archivos correspondientes.
4. Realiza pruebas unitarias e integración (`tests.md`).
5. Despliega siguiendo la guía (`deployment.md`).
6. Revisa y actualiza la documentación periódicamente.

---

## Arquitectura y módulos principales

El backend está diseñado con una arquitectura modular para facilitar la escalabilidad y el mantenimiento. Los principales componentes son:

- **Modelos**: Representan las tablas y entidades del sistema. Incluyen lógica de negocio y validaciones.
- **Controladores**: Gestionan la lógica de las rutas y la interacción con los modelos.
- **Rutas**: Definen los endpoints y su protección mediante middleware.
- **Middleware**: Autenticación, autorización por roles y validación de datos.
- **Seeds**: Scripts para poblar la base de datos con datos iniciales y catálogos.
- **Pruebas**: Unitarias e integración, cubriendo modelos, controladores y endpoints.

---

## Roles y acceso

El sistema implementa control de acceso basado en roles:

- `admin`: Acceso total, gestión de usuarios y catálogos.
- `gerente`: Acceso a reportes y planeación.
- `setupSr`, `setup`: Configuración y operación de troqueles.
- `produccion`: Consulta y registro de producción.

La autenticación se realiza con JWT y las contraseñas se almacenan con bcrypt.

---

## Pruebas y buenas prácticas

- Todas las entidades principales y catálogos tienen pruebas unitarias y de integración (ver `tests.md`).
- Los seeds aseguran datos mínimos para pruebas y desarrollo.
- Se recomienda mantener y actualizar las pruebas conforme evoluciona el sistema.
- Documenta cada nueva prueba y resultado relevante en `tests.md`.

---

## Seeds y datos iniciales

- Ejecuta los scripts de seeds para poblar la base de datos antes de correr pruebas o iniciar el backend.
- Los seeds incluyen roles, usuario admin y todos los catálogos necesarios.
- Consulta `database.md` y los scripts en `/seeds` para detalles y comandos.

---

## Recomendaciones para mantenimiento y escalabilidad

- Mantén la documentación actualizada.
- Prioriza la modularidad y la trazabilidad en cada cambio.
- Revisa y refuerza la seguridad en endpoints y datos sensibles.
- Realiza pruebas periódicas y automatizadas.
- Involucra al equipo en la revisión de código y decisiones técnicas.

---

## Enlaces útiles

- [resumen.md](./resumen.md)
- [backend.md](./backend.md)
- [frontend.md](./frontend.md)
- [database.md](./database.md)
- [css.md](./css.md)
- [urls.md](./urls.md)
- [security.md](./security.md)
- [tests.md](./tests.md)
- [api-examples.md](./api-examples.md)
- [deployment.md](./deployment.md)
- [changelog.md](./changelog.md)
- [contributing.md](./contributing.md)

---

## Nota de idioma

El sistema y la interfaz de usuario estarán en inglés, ya que el desarrollo es para Canadá. La documentación y el chat de soporte pueden estar en español para facilitar la comunicación interna.

## Componente base de navegación (AdminNav)

El frontend incluye un componente de navegación superior reutilizable (`AdminNav.jsx`) con:
- Logo de la empresa y texto “Die Control System” a la izquierda
- “Welcome Admin (username)” como link a perfil
- Link “Home” a la página principal
- Botón “Logout”

Este componente asegura coherencia visual y funcional en todas las vistas administrativas.

---

# Avances recientes (Septiembre 2025)

- Catálogo de Material implementado siguiendo el patrón estándar (tabla, modal, activar/desactivar, refresco automático).
- Lógica de activar/desactivar corregida en todos los catálogos para evitar sobrescribir el nombre y solo modificar el estado.
- Backend ajustado para permitir cambios de estado sin requerir el campo name.
- MaterialCatalog integrado en el menú Sidebar y rutas de administración.
- Todos los catálogos muestran registros activos e inactivos, permitiendo gestión completa desde el panel.
- Mejoras visuales y de usabilidad en modales y tablas.
- Documentación y estructura actualizada para facilitar mantenimiento y escalabilidad.

---

## Nota final

La memoria y contexto del programador son limitados: usa este README y los archivos de planeación como referencia constante para minimizar errores y mantener el rumbo del proyecto. Cada avance y aprendizaje fortalece al equipo.
