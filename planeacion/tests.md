# Documentación de Pruebas Backend

Esta guía explica cómo ejecutar, crear y mantener pruebas para el backend del Die Control System usando Vitest.

## 1. Ejecución de pruebas

Para ejecutar todas las pruebas del backend:
```bash
npx vitest
```
Esto buscará y ejecutará todos los archivos en la carpeta `backend/tests` que terminen en `.test.js`.

## 2. Estructura recomendada

- Ubica los archivos de prueba en `backend/tests/`.
- Nombra los archivos siguiendo el patrón: `<nombreModelo>.test.js` o `<nombreControlador>.test.js`.
- Cada archivo debe probar los métodos principales del modelo o controlador.

## 3. Ejemplo de prueba de catálogo

Archivo: `backend/tests/materialCatalog.test.js`
```js
import { describe, it, expect } from 'vitest';
import MaterialCatalog from '../models/MaterialCatalog';

describe('MaterialCatalog Model', () => {
  it('should find all active materials', async () => {
    const result = await MaterialCatalog.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new material', async () => {
    const newMaterial = { name: 'Test Material', is_active: true };
    const id = await MaterialCatalog.create(newMaterial);
    expect(typeof id).toBe('number');
  });
});
```

## 4. Ejemplo de prueba de módulo funcional

Archivo: `backend/tests/damageReport.test.js`
```js
import { describe, it, expect } from 'vitest';
import DamageReport from '../models/DamageReport';

describe('DamageReport Model', () => {
  it('should find all damage reports', async () => {
    const result = await DamageReport.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new damage report', async () => {
    // Asegúrate de tener datos válidos en los catálogos y workers
    const newReport = {
      die_serial_id: 1,
      line_id: 1,
      product_id: 1,
      operator_id: 1,
      supervisor_id: 2,
      description_dr_id: 1,
      explanation_id: 1,
      if_sample: false,
      note: '',
      status_id: 1,
      verdict: ''
    };
    const id = await DamageReport.create(newReport);
    expect(typeof id).toBe('number');
  });
});
```

## 5. Ejemplo de prueba de endpoint (Supertest)

Archivo: `backend/tests/dieDescriptionEndpoint.test.js`
```js
import request from 'supertest';
import app from '../app';

describe('GET /api/die-description', () => {
  it('should return status 200 and an array', async () => {
    const res = await request(app).get('/api/die-description');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

## 6. Buenas prácticas

- Usa datos de prueba que no afecten la operación real.
- Limpia los datos de prueba si es necesario (por ejemplo, elimina registros creados en tests).
- Documenta cada prueba con comentarios claros.
- Mantén la cobertura de pruebas actualizada al modificar modelos o controladores.
- Verifica que los tests cubran todos los roles y permisos definidos en el sistema.
- Agrega pruebas para casos de error y validaciones de seguridad.

## 7. Mantenimiento y actualización de pruebas

- Actualiza los tests al modificar la estructura de la base de datos o la lógica de negocio.
- Revisa los resultados de los tests en cada cambio importante.
- Si agregas nuevos módulos o endpoints, crea sus pruebas correspondientes.
- Documenta cualquier cambio relevante en esta guía.

## 8. Recursos útiles

- [Vitest Docs](https://vitest.dev/guide/)
- [Supertest Docs](https://github.com/visionmedia/supertest)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Cypress Docs](https://docs.cypress.io/)

---

Esta documentación debe mantenerse actualizada conforme evolucione el sistema y se agreguen nuevas funciones o módulos.
