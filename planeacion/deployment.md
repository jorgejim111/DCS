
# Guía de Despliegue

Esta guía explica cómo instalar, configurar y publicar el sistema en un servidor local o en producción (VPS, nube, etc.).

---

## 1. Requisitos previos

- Servidor con Node.js, npm y MySQL instalados.
- Acceso SSH o panel de control.
- Configuración de DNS y dominio (opcional).

---

## 2. Despliegue del Backend (Node.js)

1. Sube el código al servidor (por git, FTP, etc.).
2. Instala dependencias:
	```bash
	npm install
	```
3. Configura variables de entorno en `.env`:
	```env
	DB_HOST=localhost
	DB_USER=root
	DB_PASSWORD=tu_password_db
	DB_NAME=nombre_de_tu_db
	JWT_SECRET=tu_clave_secreta
	PORT=3000
	```

4. Ejecuta migraciones y seeds si es necesario.
5. Inicia el backend escuchando en todas las interfaces (LAN):
	```bash
	npm run start
	# o
	node src/index.js
	```
> El backend ahora escucha en 0.0.0.0, así que puedes acceder desde otras computadoras usando la IP local de este equipo (ejemplo: http://192.168.2.181:3000)

6. (Opcional) Usa PM2 para mantener el proceso activo:
	```bash
	npm install -g pm2
	pm2 start src/index.js -- --host 0.0.0.0
	pm2 save
	pm2 startup
	```

---

## 3. Despliegue del Frontend (React)

1. Sube el código al servidor.
2. Instala dependencias:
	```bash
	npm install
	```

3. Configura variables de entorno en `.env`:
	```env
	VITE_API_URL=http://[TU_IP_LOCAL]:3000/api
	```
4. Para desarrollo, inicia el frontend escuchando en todas las interfaces (LAN):
	```bash
	npm run dev -- --host
	```
> El frontend ahora escucha en 0.0.0.0, así que puedes acceder desde otras computadoras usando la IP local de este equipo (ejemplo: http://192.168.2.181:5173)

5. Para producción, compila el frontend:
	```bash
	npm run build
	```
6. Sirve los archivos estáticos (puedes usar [serve](https://www.npmjs.com/package/serve), Nginx, Apache, etc.):
	```bash
	npm install -g serve
	serve -s dist
	```

---

## 5. Pruebas en red local (LAN)

1. Averigua la IP local del servidor (ejecuta `ipconfig` en Windows).
2. Asegúrate de que el backend y frontend estén escuchando en 0.0.0.0.
3. Desde otra computadora en la misma red, abre el navegador y accede a:
	- Frontend: `http://[IP_DEL_SERVIDOR]:5173`
	- Backend/API: `http://[IP_DEL_SERVIDOR]:3000`
4. Si hay firewall, permite los puertos necesarios.
5. Prueba con diferentes roles y usuarios para validar el sistema.

---

## 4. Despliegue de la Base de Datos (MySQL)

1. Instala MySQL y crea la base de datos.
2. Ejecuta los scripts SQL para crear tablas y relaciones.
3. Ejecuta los seeds para poblar catálogos y usuarios iniciales.
4. Configura backups automáticos (mysqldump, servicios en la nube, etc.).

---

## 5. Variables de entorno y configuración

- Nunca subas archivos `.env` al repositorio.
- Usa claves y contraseñas seguras.
- Revisa y ajusta los puertos y rutas según tu entorno.

---

## 6. Recomendaciones para backups y restauración

- Realiza backups periódicos de la base de datos y archivos importantes.
- Documenta el proceso de restauración.
- Prueba la restauración antes de un despliegue importante.

---


## 8. Uso de PC como servidor temporal

**Retos principales:**
- Disponibilidad limitada (reinicios, apagados, uso personal).
- Seguridad más vulnerable (accesos, malware, errores humanos).
- Rendimiento limitado para múltiples usuarios.
- Configuración de red (puertos, firewall, IP fija).
- Backups frecuentes necesarios.
- Actualizaciones automáticas pueden interrumpir el servicio.

**Sugerencias:**
- Usa una cuenta de usuario dedicada para el servidor.
- Configura el firewall para permitir solo los puertos necesarios.
- Documenta la instalación y configuración.
- Prueba el acceso desde otras PCs antes de la presentación.
- Realiza backups diarios de la base de datos y archivos clave.
- Mantén el sistema actualizado, pero controla cuándo se aplican los cambios.

---

## 9. Migración a servidor local

- Planifica la migración (exporta/importa la base de datos, copia archivos).
- Revisa la configuración de red y seguridad.
- Haz pruebas de carga y acceso simultáneo.
- Documenta el proceso de migración y validación.

---


## 11. Nota motivacional y estrategia

Este proyecto inicia con los recursos disponibles y el objetivo de crecer dentro de la empresa. Cada reto es una oportunidad para aprender y mejorar el sistema. Con apoyo, documentación y trabajo en equipo, se puede demostrar el valor del proyecto y justificar la inversión en infraestructura dedicada.

"El que no juega, no gana. Apostamos por la innovación y el crecimiento, enfrentando los riesgos con preparación y visión."

---

## 12. Recursos

- [PM2 Docs](https://pm2.keymetrics.io/)
- [Guía Node.js Deployment](https://nodejs.org/en/docs/guides/deployment/)
- [Guía React Deployment](https://vitejs.dev/guide/static-deploy.html)
