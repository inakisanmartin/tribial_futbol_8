# ⚽ Futbol 8 Tribiala

Juego web de trivial sobre las reglas de fútbol 8, en euskera, para niñas y niños de unos 11 años.
No necesita base de datos ni servidor: las preguntas salen del documento **`Tribial futbol galderak.md`**.

## Cómo jugar

Abre `index.html` con doble clic en cualquier navegador moderno (Edge, Chrome, Firefox o Safari).

1. Elige la **categoría**: Guztiak, Epailea, Atezaina, Jokalaria, Zelaia o Entrenatzailea.
2. Elige la **dificultad**: Guztiak, Errazak, Ertainak o Zailak.
3. Pulsa **Jokatu!**. Salen 10 preguntas al azar y sin repetir. Si la selección tiene menos de 10, salen todas las que haya.
4. Al responder cada pregunta se ve la respuesta correcta y la explicación (*Zergatik?*).
5. Al final se muestran los aciertos, un mensaje de ánimo, un chiste y la revisión de todas las preguntas, con filtros *Denak / Asmatuak / Hutsak*.

También se puede responder con el teclado (`a`, `b`, `d` o `1`, `2`, `3`). El botón 🔊 activa o quita el sonido.

Desde la pantalla de inicio, el botón **🗺️ Zelaia eta atea ezagutu** abre un mapa interactivo del campo y de la portería. Al pulsar una parte del dibujo (o su botón debajo), se explica qué es, qué medidas tiene y para qué sirve. Los textos y medidas están en `js/zelaia.js`.

## Cómo modificar las preguntas

Edita `Tribial futbol galderak.md` respetando su formato:

```markdown
## 6. 🧢 Kategoria berria          ← categoría (número, emoji, nombre)
### 🟢 Erraza                       ← dificultad: Erraza / Ertaina / Zaila
**6.1. Galderaren testua?**
- a) Aukera bat
- b) Beste aukera bat
- d) Hirugarren aukera
**Erantzuna:** b)
**Azalpena:** Zergatik den zuzena (puede ocupar varias líneas y llevar listas).
---
```

Reglas de redacción:

- **No uses nunca punto y coma (`;`)** en preguntas, opciones ni explicaciones. Según el caso, usa `,`, `:` o `.`, para que el texto sea más fácil de entender.

Después:

- **Abriendo `index.html` directamente:** ejecuta `eguneratu-galderak.bat` (o `node tresnak/eguneratu-galderak.js`). Esto copia el documento a `js/dokumentua.js` y muestra un resumen con las preguntas por categoría y dificultad, y avisa de las que tengan errores. Necesita Node.js.
- **Sirviendo la carpeta con un servidor web** (por ejemplo `python -m http.server`): la aplicación lee el `.md` directamente y no hace falta regenerar nada.

Las categorías nuevas aparecen solas. Si no tienen dibujo propio, se usa el emoji del título.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Pantallas: inicio, pregunta, resultados, mapa del campo y ventana de reglas especiales |
| `css/estiloak.css` | Estilos, animaciones y diseño para móvil |
| `js/parser.js` | Lee el Markdown: categorías, dificultades, preguntas, reglas del torneo |
| `js/marrazkiak.js` | Dibujos SVG: mascota *Baloitxo*, portería, iconos de categoría, trofeo y medallas |
| `js/zelaia.js` | Mapa interactivo del campo y la portería: dibujos SVG, textos y medidas de cada parte |
| `js/jokoa.js` | Lógica del juego, sonidos (Web Audio), mensajes, chistes y confeti |
| `js/dokumentua.js` | Copia generada del `.md` (no editar a mano) |
| `tresnak/eguneratu-galderak.js` | Regenera `js/dokumentua.js` |

La única dependencia externa es la fuente *Baloo 2* de Google Fonts. Sin conexión se usa una fuente del sistema.
