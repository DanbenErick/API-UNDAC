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

    // Agregar imagen de fondo
    const fondoImagen = 'uploads/12121212/12121212.jpg'; // Reemplaza con la ruta de tu imagen
    pdf.addImage(fondoImagen, 'JPEG', 0, 0, anchoDocumento, altoDocumento);

    // Configurar la fuente y tamaño
    pdf.setFont('Arial');
    pdf.setFontSize(10);

    // Rotar el texto para que esté en formato horizontal
    
    pdf.text("Nombre: John Doe", anchoDocumento / 4, altoDocumento - 10);
    pdf.text("Número de Carnet: 123456789", anchoDocumento / 4, altoDocumento - 15);
    pdf.text("Fecha de Expiración: 01/01/2025", anchoDocumento / 4, altoDocumento - 20);

    // Guardar el PDF como un archivo
    pdf.save("carnet_horizontal.pdf");
}

// Llamar a la función para generar el carnet horizontal con imagen de fondo
generarCarnetHorizontal();
