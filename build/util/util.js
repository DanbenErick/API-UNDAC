"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerQuery = exports.generarConsulta = exports.generarPdfAula = exports.construirPdfAula = void 0;
const manager_log_resource_1 = require("../resources/manager-log.resource");
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
const construirPdfAula = (dataCallback, endCallback, data, cabecera) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new pdfkit_table_1.default({
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
    doc.text(`${cabecera.PROCESO}`, { align: 'center', width: 535, height: 30 })
        .moveDown(1.5);
    const arrayData = [];
    data.forEach((element) => {
        arrayData.push(Object.values(element));
    });
    const tableArray = {
        title: `AULA: ${cabecera.AULA}`,
        subtitle: `TURNO: ${cabecera.TURNO}`,
        headers: [
            { label: 'DNI', width: 60, headerAlign: "center", align: 'center', headerColor: "#A8A8A8", headerOpacity: 0.5 },
            { label: 'NOMBRE COMPLETO', width: 250, headerAlign: "center", align: 'center', headerColor: "#A8A8A8", headerOpacity: 0.5 },
            { label: 'CELULAR', width: 86, headerAlign: "center", align: 'center', headerColor: "#A8A8A8", headerOpacity: 0.5 },
            { label: 'CELULAR APODERADO', width: 138, headerAlign: "center", align: 'center', headerColor: "#A8A8A8", headerOpacity: 0.5 }
        ],
        rows: arrayData,
    };
    doc.table(tableArray, { width: 535 });
    doc.end();
});
exports.construirPdfAula = construirPdfAula;
const generarPdfAula = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
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
    const page = yield browser.newPage();
    yield page.goto(params, {
        waitUntil: "networkidle0",
    });
    yield page.emulateMediaType("screen");
    const pdf = yield page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "1cm",
            right: "1cm",
            bottom: "1cm",
            left: "1cm",
        },
        displayHeaderFooter: true,
        headerTemplate: '<div style="text-align: center; font-size: 12px; font-family: sans-serif;"><span style="font-size: 12px; font-family: sans-serif;">Reporte de Aulas</span></div>',
        footerTemplate: '<div style="text-align: center; font-size: 12px; font-family: sans-serif;"><span style="font-size: 12px; font-family: sans-serif;">Reporte de Aulas</span></div>',
    });
    yield browser.close();
    return pdf;
});
exports.generarPdfAula = generarPdfAula;
class SeguridadUtil {
    constructor() {
        this.fetchRowsFromRS = (resultSet, numRows) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (resultSet) {
                    resultSet.getRows(numRows, (err, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            manager_log_resource_1.logger.log("error in fetchRowsFromRS", err);
                            reject(err);
                        }
                        else if (rows.length > 0) {
                            //_this.fetchRowsFromRS(resultSet, numRows);
                            resolve(rows);
                        }
                        else {
                            resolve([]);
                        }
                    }));
                }
                else {
                    resolve(null);
                }
            }));
        });
        this.fetchRows = (resultSet) => __awaiter(this, void 0, void 0, function* () {
            let row;
            let resultRows = [];
            while ((row = yield resultSet.getRow())) {
                resultRows.push(row);
            }
            yield resultSet.close();
            return resultRows;
        });
    }
}
exports.default = SeguridadUtil;
const generarConsulta = (tabla, valores, condicion) => __awaiter(void 0, void 0, void 0, function* () {
    if (condicion) {
        // Generar consulta UPDATE
        const actualizaciones = Object.entries(valores)
            .map(([columna, valor]) => `${columna} = ?`)
            .join(", ");
        return `UPDATE ${tabla} SET ${actualizaciones} WHERE ${condicion}`;
    }
    else {
        // Generar consulta INSERT
        const columnas = Object.keys(valores).join(", ");
        const marcadores = Object.values(valores)
            .map(() => "?")
            .join(", ");
        return `INSERT INTO ${tabla} (${columnas}) VALUES (${marcadores})`;
    }
});
exports.generarConsulta = generarConsulta;
const obtenerQuery = (accion, tabla, campos, where) => __awaiter(void 0, void 0, void 0, function* () {
    let resultado = "";
    let queryTabla = tabla;
    let queryCampos = "";
    let queryParametros = "";
    let queryWhere = " WHERE 1=1 ";
    switch (accion) {
        case "UPDATE":
            queryTabla = "UPDATE " + tabla + " SET ";
            queryCampos = "";
            queryWhere = " WHERE 1=1 ";
            for (let key of Object.keys(campos)) {
                // console.log('key', key);
                const existe = where.filter((f) => f.ID.toUpperCase() == key.toUpperCase()).length;
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
            queryParametros = queryParametros.substring(0, queryParametros.length - 1);
            resultado =
                queryTabla + "(" + queryCampos + ") VALUES (" + queryParametros + ")";
            break;
    }
    return resultado;
});
exports.obtenerQuery = obtenerQuery;
