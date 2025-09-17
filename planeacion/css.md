
# Guía de Estilos CSS

## Paleta de colores sugerida

| Color     | Hex      | Uso principal                       |
|-----------|----------|-------------------------------------|
| Azul Oscuro | #0C2C65 | Encabezados, botones principales    |
| Azul Medio | #264893 | Menús, enlaces, hover effect        |
| Azul Claro | #23B0E8 | Llamados a la acción, íconos        |
| Gris Claro | #D3D9E1 | Fondos, secciones secundarias       |
| Gris Intermedio | #E4E7ED | Botones secundarios, tarjetas neutras |
| Gris Muy Claro | #F4F6F8 | Fondo general, formularios      |
| Blanco    | #FFFFFF  | Texto sobre fondos oscuros          |

## Tipografía

- Usa fuentes sans-serif modernas (ejemplo: Inter, Roboto, Arial).
- Mantén tamaños de fuente consistentes para títulos, subtítulos y texto general.

## Reglas visuales y componentes

- Aplica la paleta de colores en los componentes principales usando TailwindCSS.
- Usa clases como `bg-[#0C2C65]`, `text-[#FFFFFF]`, `hover:bg-[#264893]` para mantener coherencia.
- Mantén suficiente contraste entre fondo y texto para accesibilidad.
- Usa bordes y sombras suaves para formularios y tarjetas.
- Aplica espaciado (`p-4`, `m-2`, etc.) para mejorar la legibilidad.

## Ejemplo de clases TailwindCSS

```jsx
<button className="bg-[#0C2C65] text-[#FFFFFF] hover:bg-[#264893] px-4 py-2 rounded font-bold">
	Guardar
</button>
```

## Recomendaciones

- Documenta cualquier componente visual personalizado.
- Mantén la paleta y estilos actualizados en este archivo.
- Revisa la accesibilidad y el contraste en todos los componentes.

---

Esta guía debe actualizarse conforme evolucione el diseño y se agreguen nuevos componentes visuales.
