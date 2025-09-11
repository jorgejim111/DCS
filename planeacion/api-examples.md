
# Ejemplos de Uso de la API

Esta guía muestra cómo consumir la API usando diferentes herramientas y métodos, útil para pruebas rápidas, debugging y desarrollo frontend.

---

## 1. Peticiones con curl

**GET troqueles:**
```bash
curl -X GET http://localhost:3000/api/troqueles
```

**POST login:**
```bash
curl -X POST http://localhost:3000/api/login \
	-H "Content-Type: application/json" \
	-d '{"username": "admin", "password": "TuPasswordSeguro"}'
```

---

## 2. Peticiones con Postman

1. Abre Postman y crea una nueva petición.
2. Selecciona el método (GET, POST, etc.) y la URL (ejemplo: `http://localhost:3000/api/troqueles`).
3. Para POST, ve a la pestaña "Body", selecciona "raw" y elige "JSON". Ejemplo:
```json
{
	"username": "admin",
	"password": "TuPasswordSeguro"
}
```
4. Haz clic en "Send" y revisa la respuesta.

---

## 3. Peticiones desde el frontend (Axios)

**GET troqueles:**
```js
import axios from 'axios';

const getTroqueles = async () => {
	const res = await axios.get('http://localhost:3000/api/troqueles');
	console.log(res.data);
};
```

**POST login:**
```js
import axios from 'axios';

const login = async (username, password) => {
	const res = await axios.post('http://localhost:3000/api/login', {
		username,
		password
	});
	console.log(res.data);
};
```

---

## 4. Casos de prueba rápidos

- Probar login con credenciales válidas e inválidas.
- Probar acceso a endpoints protegidos con y sin token.
- Probar creación, edición y borrado de troqueles.

---

## 5. Debugging

- Revisar respuestas de error (status, mensaje).
- Usar herramientas como Postman para simular flujos completos.
- Verificar headers y payloads enviados y recibidos.
