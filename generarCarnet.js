const PDFDocument = require('pdfkit');
const fs = require('fs');

// Especifica las dimensiones personalizadas en milímetros (ancho x alto)
const customPageSize = [85.6 * 2, 53.98 * 2]; // Por ejemplo, A4 en milímetros

// Crea un nuevo documento PDF con las dimensiones personalizadas
const doc = new PDFDocument({ size: customPageSize });

// Puedes agregar contenido al documento aquí
const imagePath = '71036908.jpg';
doc.image(imagePath, { width: 50 });

// Guarda el documento en un archivo
const outputPath = 'output.pdf';
const outputStream = fs.createWriteStream(outputPath);
doc.pipe(outputStream);
doc.end();

console.log(`El archivo PDF se ha creado en: ${outputPath}`);
