
# Documentación de Endpoints (API REST)

Lista y descripción de los endpoints principales del sistema, alineados con los módulos y catálogos definidos.

## Formato estándar para documentar endpoints

| Método | URL                 | Descripción                             | Permiso    |
|--------|---------------------|-----------------------------------------|------------|
| GET    | /api/inch           | Listar todos los tamaños (inch)         | Solo admin |
| POST   | /api/inch           | Crear nuevo tamaño                      | Solo admin |
| PUT    | /api/inch/:id       | Actualizar tamaño                       | Solo admin |
| DELETE | /api/inch/:id       | Eliminar/desactivar tamaño              | Solo admin |
| GET    | /api/part           | Listar todos los parts                  | Solo admin |
| POST   | /api/part           | Crear nuevo part                        | Solo admin |
| PUT    | /api/part/:id       | Actualizar part                         | Solo admin |
| DELETE | /api/part/:id       | Eliminar/desactivar part                | Solo admin |
| GET    | /api/description    | Listar todas las descriptions           | Solo admin |
| POST   | /api/description    | Crear nueva description                 | Solo admin |
| PUT    | /api/description/:id| Actualizar description                  | Solo admin |
| DELETE | /api/description/:id| Eliminar/desactivar description         | Solo admin |
| GET    | /api/die-description  | Listar todos los Die Description       | Admin/User |
| POST   | /api/die-description  | Crear nuevo Die Description            | Solo admin |
| PUT    | /api/die-description/:id | Actualizar Die Description           | Solo admin |
| DELETE | /api/die-description/:id | Eliminar/desactivar Die Description  | Solo admin |
| GET    | /api/die-serial      | Listar todos los Die Serial             | Admin/User |
| POST   | /api/die-serial      | Crear nuevo Die Serial                  | Solo admin |
| PUT    | /api/die-serial/:id  | Actualizar Die Serial                   | Solo admin |
| DELETE | /api/die-serial/:id  | Eliminar/desactivar Die Serial          | Solo admin |
| GET    | /api/damage-report   | Listar todos los Damage Report          | Admin/User |
| POST   | /api/damage-report   | Crear nuevo Damage Report               | Solo admin |
| PUT    | /api/damage-report/:id | Actualizar Damage Report              | Solo admin |
| DELETE | /api/damage-report/:id | Eliminar/desactivar Damage Report     | Solo admin |

## Ejemplo de uso de endpoint

```http
GET /api/inch
```
Respuesta:
```json
[
	{ "id": 1, "name": "2.50", "is_active": true },
	{ "id": 2, "name": "3.00", "is_active": true }
]
```

## Recomendaciones

- Mantén los nombres de los endpoints y parámetros consistentes con los modelos y base de datos.
- Documenta los permisos y roles requeridos para cada endpoint.
- Actualiza este archivo cada vez que se agregue, modifique o elimine un endpoint.

---
