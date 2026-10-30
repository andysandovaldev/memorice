/*
  IMÁGENES DEL JUEGO
  Cada categoría necesita al menos 12 imágenes.
  Los archivos deben llamarse 1.jpg, 2.jpg, ..., 12.jpg.
*/
window.MEMORICE_IMAGES = {
  "categoria-1": Array.from(
    { length: 12 },
    (_, i) => `assets/categoria-1/${i + 1}.jpg`,
  ),

  "categoria-2": Array.from(
    { length: 12 },
    (_, i) => `assets/categoria-2/${i + 1}.jpg`,
  ),

  "categoria-3": Array.from(
    { length: 12 },
    (_, i) => `assets/categoria-3/${i + 1}.jpg`,
  ),
};
