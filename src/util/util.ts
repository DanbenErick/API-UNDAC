import { logger } from "../resources/manager-log.resource";
import puppeteer from "puppeteer";
import PDFDocument from "pdfkit-table";
export const construirPdfAula = async ( dataCallback: any, endCallback: any, data: any, cabecera: any ) => {
  const doc = new PDFDocument({
    size: 'A4',
    font: 'Helvetica',
    margins: {
        top: 40,
        bottom: 40,
        left: 30,
        right: 30
    }
  });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.text(
    `${cabecera.PROCESO}`,
    {align: 'center', width: 535, height: 30}
  )
  .moveDown(1.5)
  
  const arrayData: any = [];
  data.forEach((element: any) => {
    arrayData.push(Object.values(element));
  });
  
  const tableArray = {
    title: `AULA: ${cabecera.AULA}`,
    subtitle: `TURNO: ${cabecera.TURNO}`,
    headers: [
        {label: 'DNI', width: 60, headerAlign:"center", align: 'center', headerColor:"#A8A8A8", headerOpacity:0.5},
        {label: 'NOMBRE COMPLETO', width: 250, headerAlign:"center", align: 'center', headerColor:"#A8A8A8", headerOpacity:0.5},
        {label: 'CELULAR', width: 86, headerAlign:"center", align: 'center', headerColor:"#A8A8A8", headerOpacity:0.5},
        {label: 'CELULAR APODERADO', width: 138, headerAlign:"center", align: 'center', headerColor:"#A8A8A8", headerOpacity:0.5}
    ],
    rows: arrayData,
  };
  doc.table(tableArray, { width: 535 });

  doc.end();
};
export const generarPdfAula = async (params: string) => {
  const browser: any = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 750,
      height: 500,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: false,
      isLandscape: false,
    },
  });
  const page = await browser.newPage();
  await page.goto(params, {
    waitUntil: "networkidle0",
  });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "1cm",
      right: "1cm",
      bottom: "1cm",
      left: "1cm",
    },
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="text-align: center; font-size: 12px; font-family: sans-serif;"><span style="font-size: 12px; font-family: sans-serif;">Reporte de Aulas</span></div>',
    footerTemplate:
      '<div style="text-align: center; font-size: 12px; font-family: sans-serif;"><span style="font-size: 12px; font-family: sans-serif;">Reporte de Aulas</span></div>',
  });
  await browser.close();
  return pdf;
};

export default class SeguridadUtil {
  public fetchRowsFromRS = async (resultSet: any, numRows: any) => {
    return new Promise(async (resolve: any, reject: any) => {
      if (resultSet) {
        resultSet.getRows(numRows, async (err: any, rows: any) => {
          if (err) {
            logger.log("error in fetchRowsFromRS", err);
            reject(err);
          } else if (rows.length > 0) {
            //_this.fetchRowsFromRS(resultSet, numRows);
            resolve(rows);
          } else {
            resolve([]);
          }
        });
      } else {
        resolve(null);
      }
    });
  };

  public fetchRows = async (resultSet: any) => {
    let row: any;
    let resultRows: any[] = [];
    while ((row = await resultSet.getRow())) {
      resultRows.push(row);
    }
    await resultSet.close();
    return resultRows;
  };
}

export const generarConsulta = async (
  tabla: string,
  valores: any,
  condicion: any
) => {
  if (condicion) {
    // Generar consulta UPDATE
    const actualizaciones = Object.entries(valores)
      .map(([columna, valor]) => `${columna} = ?`)
      .join(", ");
    return `UPDATE ${tabla} SET ${actualizaciones} WHERE ${condicion}`;
  } else {
    // Generar consulta INSERT
    const columnas = Object.keys(valores).join(", ");
    const marcadores = Object.values(valores)
      .map(() => "?")
      .join(", ");
    return `INSERT INTO ${tabla} (${columnas}) VALUES (${marcadores})`;
  }
};

export const obtenerQuery = async (
  accion: string,
  tabla: string,
  campos: any,
  where: any[]
) => {
  let resultado: string = "";
  let queryTabla: string = tabla;
  let queryCampos: string = "";
  let queryParametros: string = "";
  let queryWhere: string = " WHERE 1=1 ";
  switch (accion) {
    case "UPDATE":
      queryTabla = "UPDATE " + tabla + " SET ";
      queryCampos = "";
      queryWhere = " WHERE 1=1 ";
      for (let key of Object.keys(campos)) {
        // console.log('key', key);
        const existe = where.filter(
          (f) => f.ID.toUpperCase() == key.toUpperCase()
        ).length;
        if (existe == 0)
          queryCampos += key.toLowerCase() + "=" + ":" + key + ",";
      }
      queryCampos = queryCampos.substring(0, queryCampos.length - 1);
      for (let t of where) {
        queryWhere += " AND " + t.ID + " = " + ":" + t.ID;
      }
      resultado = queryTabla + queryCampos + queryWhere;
      break;
    case "INSERT":
      queryTabla = "INSERT INTO " + tabla + " ";
      queryCampos = "";
      queryWhere = " WHERE 1=1 ";
      for (let key of Object.keys(campos)) {
        queryCampos += key.toLowerCase() + ",";
        queryParametros += ":" + key + ",";
      }
      queryCampos = queryCampos.substring(0, queryCampos.length - 1);
      queryParametros = queryParametros.substring(
        0,
        queryParametros.length - 1
      );
      resultado =
        queryTabla + "(" + queryCampos + ") VALUES (" + queryParametros + ")";
      break;
  }
  return resultado;
};
