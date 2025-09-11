
# Documentación Backend

Guía para la estructura, desarrollo y buenas prácticas del backend del Die Control System.

## 1. Estructura de carpetas y archivos principales

```
backend/
├── controllers/      # Lógica de negocio y endpoints
├── models/           # Definición de entidades y acceso a datos
├── routes/           # Definición de rutas y endpoints REST
├── db/               # Conexión y scripts de base de datos
│   ├── connection.js # Función para obtener la conexión MySQL
│   ├── sql/          # Scripts de creación y migración
├── middleware/       # Autenticación, roles y permisos
├── utils/            # Funciones auxiliares
├── config/           # Configuración de entorno y variables
├── app.js            # Archivo principal de la aplicación
├── package.json      # Dependencias y scripts
```


## 2. Comandos para instalar dependencias, iniciar y testear el backend

- Instalar dependencias principales:
	```bash
	npm install express mysql2 dotenv jsonwebtoken bcrypt
	```
- (Opcional) Instalar dependencias para testing y validaciones:
	```bash
	npm install --save-dev vitest
	npm install yup
	```
- Iniciar el servidor en desarrollo:
	```bash
	npm install --save-dev nodemon
	npm run dev
	```
- Ejecutar pruebas (si existen):
	```bash
	npm test
	# o
	npx vitest
	```

## 3. Reglas para controladores, modelos y rutas

- **Controladores:**
	- Implementan la lógica de negocio y validaciones.
	- Reciben datos de las rutas, interactúan con los modelos y devuelven respuestas.
	- Ejemplo: `dieController.js`, `damageReportController.js`.

- **Modelos:**
	- Definen la estructura de las entidades y su relación con la base de datos.
	- Usan nombres consistentes con la base de datos (`die_serial`, `die_description`, etc.).
	- Ejemplo: `DieSerial.js`, `DieDescription.js`.

- **Rutas:**
	- Definen los endpoints REST y los métodos permitidos (GET, POST, PUT, DELETE).
	- Usan controladores para manejar las peticiones.
	- Ejemplo: `/api/die-description`, `/api/damage-report`.

- **Middleware:**
	- Gestiona autenticación, roles y permisos.
	- Permite definir qué usuarios pueden acceder a cada endpoint según su rol.
	- Ejemplo: `authMiddleware.js`, `roleMiddleware.js`.


## 4. Buenas prácticas

- Mantén la lógica separada en controladores y modelos.
- Usa validaciones en backend para asegurar integridad de datos.
- Documenta cada endpoint y función importante.
- Usa variables de entorno para credenciales y configuración sensible.
- Realiza pruebas unitarias e integración para funciones críticas.
- Actualiza la documentación y los scripts de migración al modificar la base de datos.
- Revisa y refactoriza el código periódicamente para mantener calidad y seguridad.
- **Conexión a base de datos:**
	- Usa siempre la función `getConnection()` desde `db/connection.js` para obtener la instancia de conexión MySQL.
	- Ejemplo de importación:
		```js
		const getConnection = require('../db/connection');
		const db = getConnection();
		```
	- Esto asegura que la conexión se maneje de forma consistente en todos los módulos.

## 5. Ejemplo de endpoint REST

```js
// routes/dieDescriptionRoutes.js
const express = require('express');
const router = express.Router();
const dieDescriptionController = require('../controllers/dieDescriptionController');

router.get('/', dieDescriptionController.getAll);
router.post('/', dieDescriptionController.create);
router.put('/:id', dieDescriptionController.update);
router.delete('/:id', dieDescriptionController.delete);

module.exports = router;
```

## 6. Recomendaciones de seguridad

- Usa middleware para proteger rutas sensibles.
- Encripta contraseñas y datos sensibles.
- Valida y sanitiza todos los datos recibidos del frontend.
- Limita los permisos de cada rol según lo definido en la base de datos y la lógica de negocio.

---

Esta guía debe actualizarse conforme evolucione el sistema y se agreguen nuevas funciones o módulos.
