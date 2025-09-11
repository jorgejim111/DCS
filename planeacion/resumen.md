
# Resumen del Proyecto

Propósito general del sistema, objetivos principales y reglas de negocio clave.


## Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Estilos:** TailwindCSS
- **Control de versiones:** Git
- **Documentación:** Markdown
- **HTTP requests:** Axios
- **Validaciones:** Yup
- **Testing:** Vitest
- **Autenticación:** JWT (jsonwebtoken)



## Finalidad del Programa

El "Die Control System" es una solución web para la gestión integral de troqueles en la empresa. Surge como evolución de un sistema piloto en Excel y VB, buscando expandir funciones, mejorar el diseño y ofrecer una experiencia más amigable al usuario. El objetivo principal es optimizar el control, inventario y trazabilidad de los troqueles utilizados en producción, minimizando paros y maximizando eficiencia.

### Atributos principales de los troqueles (Die)
- **Tamaño (inch):** Diámetro medido en pulgadas (ejemplo: 2.50").
- **Descripción (description):** Forma de la ranura (ejemplo: SQ de square).
- **Parte (part):** Cantidad y dimensiones de la ranura (ejemplo: 19/20 (0.040 x 0.050), donde 19 y 0.040 corresponden al inner, y 20 y 0.050 al outer).

Con estos atributos se generan las "Die Description", que representan la descripción completa del troquel. Esto permite definir cuántos troqueles se requieren en circulación y en stock, optimizando la inversión y evitando paros de producción.

### Flujo general del sistema
1. **Generación de Dies to Order:** El sistema calcula qué troqueles se deben pedir según el inventario y necesidades de producción.
2. **Ingreso de troqueles nuevos:** Al recibir troqueles del proveedor, se registran con un Serial# único y sus atributos individuales:
    - Serial#: clave única de identificación.
    - Die Description.
    - Inner y Outer: dimensiones de trabajo (ejemplo: 24.52 = .2452).
    - Proudness: diferencia entre inner y outer, medida en mm.
    - Status: New, Circulation, Scraped, Open DR, To Fix (por defecto, New).
3. **Instalación en líneas de producción:** Los troqueles se asignan a líneas (1 a 17) y se registra el producto y material que producen.
4. **Gestión de daños (Damage Report):** Cuando un troquel falla, se genera un reporte con información detallada (serial, línea, material, operador, supervisor, descripción, muestra, nota).
    - Al crear el DR, el status del serial# cambia a Open DR.
5. **Diagnóstico y reparación:** El técnico revisa el troquel y determina:
    - Good (solo estaba sucio): status a Circulation.
    - Scrap (sin reparación): status a Scraped.
    - To Fix (requiere arreglo): status a To Fix, indicando cuánto se debe desbastar (inner/outer).
6. **Desbaste y reincorporación:** Tras el arreglo, se actualizan los valores y el status vuelve a Circulation.
7. **Control semanal:** El sistema lista los troqueles que deben moverse a circulación, mostrando mínimos, inventario real, stock y cantidad de DR.
8. **Registro de movimientos:** Todos los cambios de status y acciones sobre los serial# se registran en una tabla de movimientos para trazabilidad histórica.

Ejemplo de campos en la tabla movimientos:
```sql
id INT AUTO_INCREMENT PRIMARY KEY,
die_serial_id INT NOT NULL,
status_id INT NOT NULL,
fecha DATETIME NOT NULL,
inner_to_grind DECIMAL(10,3),
outer_to_grind DECIMAL(10,3),
note TEXT,
proudness INT,
inner_grinding DECIMAL(10,3),
outer_grinding DECIMAL(10,3),
inner_land_thickness DECIMAL(10,3),
outer_land_thickness DECIMAL(10,3),
damage_report_id INT,
observed_damage_id INT,
performed_by INT NOT NULL,
product_id INT,
line_id INT,
fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
```

---
    


## Módulos principales y su función

El sistema se compone de dos tipos de módulos: **Catálogos** y **Módulos funcionales**.

### Catálogos
Son tablas base que almacenan atributos y valores utilizados en las funciones principales del sistema. Permiten mantener la información estandarizada y facilitar la gestión de los troqueles y procesos.

- **Inches:** Diámetros disponibles para los troqueles.
- **Parts:** Cantidades y dimensiones de ranuras.
- **Description:** Formas y tipos de ranura.
- **Products:** Productos fabricados en la planta.
- **Materials:** Materias primas utilizadas.
- **Lines:** Líneas de producción (1 a 17).
- **Position:** Posiciones o ubicaciones relevantes.
- **Status:** Estados posibles de los troqueles y seriales (New, Circulation, Scraped, etc.).
- **Explanation:** Motivos o explicaciones de daño/reparación.
- **Description_DR:** Tipos de daño reportado.

### Módulos funcionales
Representan las acciones y entidades principales del sistema, gestionando la información y los procesos clave.

- **Die Description:** Combinación de atributos que define un tipo de troquel.
- **Serial#:** Registro individual de cada troquel con serial único y sus atributos.
- **Workers:** Personal técnico y operadores involucrados en el proceso.
- **Users:** Usuarios del sistema con diferentes roles y permisos.
- **Damage Report:** Gestión y registro de reportes de daño de troqueles.
- **Moves:** Historial de movimientos y cambios de estado de cada serial.


## Flujo básico de usuario

El sistema contempla diferentes roles, cada uno con permisos y acciones específicas:

### 1. Administrador
- Gestiona la aplicación y tiene acceso total.
- Crea y administra usuarios.
- Configura parámetros generales del sistema.

### 2. Mantenimiento
**Niveles:**
- **Gerente:**
    - Todas las funciones de Set up Sr.
    - Crea nuevas Die Description.
    - Configura KPIs y parámetros avanzados.
- **Set up Sr:**
    - Todas las funciones de Set up.
    - Revisa y gestiona Damage Reports (DR).
    - Genera reportes de movimientos a circulación.
    - Solicita nuevos troqueles (require new dies).
- **Set up:**
    - Consulta inventarios.
    - Mueve troqueles a circulación.
    - Crea nuevos serial#.
    - Genera Damage Reports.
    - Realiza arreglos y mantenimiento de troqueles.
    - Instala troqueles en líneas.
    - Consulta KPIs y el historial de seriales.

### 3. Producción
    - Crear Damage Report.
    - Consulta historial de seriales
    - Consulta Inventarios.


## Reglas generales de operación

Para asegurar el correcto funcionamiento y la integridad del sistema, se recomienda seguir estas reglas y buenas prácticas:

- Mantener actualizados los catálogos y registros principales.
- Validar la información antes de crear o modificar registros.
- Asignar roles y permisos adecuados a cada usuario según sus funciones.
- Registrar todos los movimientos y cambios de estado de los troqueles.
- Realizar respaldos periódicos de la base de datos y archivos críticos.
- Documentar cualquier cambio importante en el sistema.
- Seguir las políticas de seguridad y acceso definidas por la empresa.
- Capacitar a los usuarios en el uso correcto del sistema y sus módulos.
- Revisar y actualizar los KPIs y parámetros de control según las necesidades de producción.

Estas reglas pueden adaptarse y ampliarse conforme evolucione el sistema y se identifiquen nuevas necesidades operativas.
