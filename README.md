# Memorice

Juego de memorice hecho con HTML, CSS y JavaScript vanilla. No necesita instalación, compilación ni servidor backend: funciona en GitHub Pages o Netlify como sitio estático.

## Probar en tu computador

Abre `index.html` en tu navegador. Las imágenes remotas requieren conexión a internet.

## Cambiar las imágenes

Edita `images.js`. Cada categoría tiene una lista de rutas de imágenes. Puedes usar enlaces HTTPS o guardar archivos en las carpetas `assets/categoria-1/`, `assets/categoria-2/` y `assets/categoria-3/` y poner sus rutas, por ejemplo:

```js
"categoria-1": [
  "assets/categoria-1/flor.jpg",
  "assets/categoria-1/arbol.jpg"
]
```

Usa al menos 12 imágenes diferentes por categoría para que funcione el nivel experto. El juego duplica cada imagen para formar las parejas. Puedes cambiar los nombres visibles de las categorías en `script.js` (objeto `names`).

## Publicar en GitHub y Netlify

1. Descomprime el proyecto.
2. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `script.js`, `images.js`, `README.md` y la carpeta `assets`.
3. En Netlify elige **Add new site → Import an existing project** y conecta GitHub.
4. Selecciona el repositorio. Deja **Build command** vacío y **Publish directory** como `.` (raíz del repositorio).
5. Pulsa **Deploy site**. Para actualizarlo, sube tus cambios a GitHub y Netlify volverá a publicar automáticamente.

## Notas

- El tablero usa 3×3 (4 parejas y una casilla sobrante), 4×4 (8 parejas) y 5×5 (12 parejas y una casilla sobrante). En los tableros impares queda una carta sin pareja porque el total de casillas es impar.
- Las imágenes de ejemplo usan URLs de Unsplash. Puedes sustituirlas por imágenes propias; asegúrate de tener derecho a usarlas y mantener las rutas relativas exactas.
