
# Reglas de Seguridad

Esta guía cubre las prácticas esenciales para proteger tu sistema web, separando recomendaciones para **backend** y **frontend**.

---

## 1. Seguridad en Backend

**Validaciones y manejo de datos sensibles:**
- Validar todos los datos recibidos desde el cliente (usar Yup, Joi, etc.).
- Nunca almacenar contraseñas en texto plano: usar bcrypt para hashear.
- Proteger variables sensibles con `.env` y nunca subirlas al repositorio.

**Autenticación y autorización:**
- Usar JWT para sesiones seguras y control de acceso.
- Limitar los permisos por rol y validar en cada endpoint.
- Expirar tokens y revocarlos en caso de riesgo.

**Prevención de vulnerabilidades comunes:**
- SQL Injection: usar consultas preparadas (mysql2, Sequelize).
- XSS: sanitizar entradas y salidas.
- CSRF: implementar tokens CSRF si el sistema lo requiere.
- Rate limiting: limitar intentos de login y peticiones sospechosas.


**Ejemplo de creación de usuario admin con contraseña cifrada (script Node.js):**
```js
// Ejecuta este script con Node.js para crear el usuario admin directamente en la base de datos
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const ADMIN_USER = {
	username: 'admin',
	password: 'TuPasswordSeguro',
	email: 'admin@tusistema.com',
	rol: 'admin'
};

const DB_CONFIG = {
	host: 'localhost',
	user: 'root',
	password: 'tu_password_db',
	database: 'nombre_de_tu_db'
};

async function crearAdmin() {
	const hash = await bcrypt.hash(ADMIN_USER.password, 10);
	const connection = await mysql.createConnection(DB_CONFIG);
	const sql = `INSERT INTO usuarios (username, password, email, rol) VALUES (?, ?, ?, ?)`;
	await connection.execute(sql, [ADMIN_USER.username, hash, ADMIN_USER.email, ADMIN_USER.rol]);
	await connection.end();
	console.log('Usuario admin creado con contraseña cifrada.');
}

crearAdmin().catch(console.error);
```

**Recomendación:** Usar este método para crear el usuario inicial admin antes de implementar el login en el frontend.

---

## 2. Seguridad en Frontend

**Validaciones y manejo de datos:**
- Validar datos antes de enviarlos al backend (Yup, custom validation).
- No mostrar información sensible en la interfaz.

**Autenticación y autorización:**
- No guardar tokens en localStorage; preferir cookies httpOnly si es posible.
- Ocultar rutas y componentes según el rol del usuario.

**Prevención de vulnerabilidades comunes:**
- XSS: nunca renderizar HTML sin sanitizar.
- Evitar exponer datos internos en el código fuente.

**Ejemplo de validación en frontend (Yup):**
```js
import * as yup from 'yup';
const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});
```

---

## 3. Buenas Prácticas Generales

- Mantener dependencias actualizadas.
- Usar HTTPS en producción.
- Auditar el código y dependencias periódicamente.
- Realizar pruebas de seguridad (OWASP Top 10).
- Limitar información en mensajes de error.

---

## 4. Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://github.com/checkly/nodejs-security-checklist)
- [Frontend Security Checklist](https://frontendchecklist.io/)
