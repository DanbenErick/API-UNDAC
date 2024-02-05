
const { jsPDF } = require('jspdf');

// Función para generar el carnet horizontal con imagen de fondo
function generarCarnetHorizontal() {
    // Configurar el tamaño del documento (en milímetros) para un carnet horizontal
    const anchoDocumento = 85.6; // Ancho de una tarjeta de crédito
    const altoDocumento = 53.98; // Alto de una tarjeta de crédito
    const pdf = new jsPDF({
        unit: 'mm',
        format: [altoDocumento, anchoDocumento],
        orientation: 'landscape'
    });
    // pdf.getFontList()
    // pdf.addImage('https://i.pinimg.com/236x/02/f8/3f/02f83f205fd2c807a1a11d0b360f713a.jpg', 'JPEG', 0, 0, 210, 297);
    // Agregar imagen de fondo
    // const fondoImagen = 'uploads/12121212/12121212.jpg'; // Reemplaza con la ruta de tu imagen
    // pdf.addImage(fondoImagen, 'JPEG', 0, 0, anchoDocumento, altoDocumento);
    
    // Configurar la fuente y tamaño
    // pdf.setFont('Arial');
    const foto = new Image()
    foto.src = '71036908.jpg'
    pdf.addImage(foto, 'JPEG', 30, 30, 200, 300)
    
    
    // Rotar el texto para que esté en formato horizontal
    pdf.setFontSize(8);
    pdf.text('UNIVERSIDAD DANIEL ALCIDES CARRION', 15, 5);
    pdf.text('CEPRE III - 2024', 32, 8);
    
    
    pdf.setFont('Helvetica');
    pdf.setf
    pdf.text('A. PATERNO: CRUZ', 1, 18);
    pdf.text('A. MATERNO: BARRETO', 1, 22);
    pdf.text('NOMBRES: DANBEN ERICK', 1, 26);
    
    
    pdf.text('PROGRAMA', 1, 30);
    pdf.text('DERECHO (PASCO)', 1, 34);
    
    pdf.text('AREA / SEDE EXAMEN', 1, 38);
    pdf.text('4 / PASCO', 1, 42);


    

    // Guardar el PDF como un archivo
    pdf.save("carnet_horizontal.pdf");
}

// Llamar a la función para generar el carnet horizontal con imagen de fondo
generarCarnetHorizontal();



// pdf.text("Nombre: John Doe", anchoDocumento / 4, altoDocumento - 10);
//     pdf.text("Número de Carnet: 123456789", anchoDocumento / 4, altoDocumento - 15);
//     pdf.text("Fecha de Expiración: 01/01/2025", anchoDocumento / 4, altoDocumento - 20);