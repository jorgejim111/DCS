# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Patrones para Dropdowns Filtrables de FK en Formularios

## Regla General
Para todos los campos que referencian una FK (Foreign Key) en formularios, se debe usar el patrón de `<input list="...">` con `<datalist>`, permitiendo filtrar y seleccionar opciones provenientes del backend. Este patrón debe aplicarse en todos los formularios nuevos y existentes.

## Ejemplo: Serial# en Damage Report Modal y Die Description en New Serial Modal
```jsx
<div className="col-span-2 flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Serial # <span className="text-red-600">*</span></label>                                      <input
                className="border px-2 py-1 rounded"
                placeholder="Select serial..."
                value={serialInput}
                onChange={e => setSerialInput(e.target.value)}
                list="serial-list"
                autoComplete="off"
                required
              />
              <datalist id="serial-list">
                {serials
                  .filter(s => s.serial_number.toLowerCase().includes(serialInput.toLowerCase()))
                  .map(s => (
                    <option key={s.id} value={s.serial_number} />
                  ))}
              </datalist>
            </div>

## Pasos para Implementar
1. Traer los datos reales del backend y guardarlos en el estado.
2. Usar un `<input list="...">` para el campo FK.
3. Usar un `<datalist>` con las opciones filtradas según el valor del input.
4. Validar que el valor seleccionado exista en la lista antes de guardar.
5. No cambiar este patrón sin autorización.

## Beneficios
- Consistencia visual y funcional en todos los formularios.
- Facilidad para filtrar y seleccionar opciones.
- Menos errores y mayor mantenibilidad.

## Nota
Si necesitas un dropdown clásico sin filtro, usa `<select>`, pero para FK con muchas opciones, siempre usa este patrón.

---
