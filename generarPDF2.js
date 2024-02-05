const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function generarCarnet() {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Cargar la imagen desde un archivo
    const imagenBytes = fs.readFileSync('./71036908.jpg');
    const imagen = await pdfDoc.embedJpg(imagenBytes);

    // Crear una nueva página y agregar la imagen
    const page = pdfDoc.addPage([240, 150]);  // Ajusta el tamaño de la página según tus necesidades
    page.drawImage(imagen, { x: 0, y:50, width: 80, height: 80 });

    //page.drawText('Aquí va tu texto', {x: 50,y: 50,size: 10,// font: helveticaFont,// color: textColor,});
    page.drawText('UNIVERSIDAD DANIEL ALCIDES CARRION', {x: 50,y: 120,size: 10 });
    page.drawText('CEPRE III - 2024', {x: 50,y: 20,size: 10 });
    page.drawText('A. PATERNO: CRUZ', {x: 50,y: 30,size: 10 });
    page.drawText('A. MATERNO: BARRETO', {x: 50,y: 40,size: 10 });
    page.drawText('NOMBRES: DANBEN ERICK', {x: 50,y: 50,size: 10 });
    

    // Guardar el documento PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('carnet.pdf', pdfBytes);
}

// Llamar a la función para generar el carnet
generarCarnet();
