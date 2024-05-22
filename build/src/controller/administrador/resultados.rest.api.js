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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const resultados_service_1 = require("../../services/administrador/resultados/resultados.service");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const nombreSinExtension = file.originalname.split('.')[0];
        const directorioDestino = `./build/uploads/${nombreSinExtension}`;
        // Verificar si el directorio existe, y si no, crearlo
        if (!fs_1.default.existsSync(directorioDestino)) {
            fs_1.default.mkdirSync(directorioDestino, { recursive: true });
        }
        cb(null, `./build/uploads/${nombreSinExtension}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
class ResultadosAdministradorController {
    constructor() {
        this.procesarSolapasCSV = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.createReadStream(req.file.path, 'utf-8');
                const jsonArray = [];
                fileContent.pipe((0, csv_parser_1.default)({ separator: ';' }))
                    .on('data', (row) => {
                    console.log("row: ", row);
                    const jsonObject = {};
                    Object.keys(row).forEach(key => {
                        if (key !== 'APELLIDOS Y NOMBRES' && key !== '') {
                            jsonObject[key.trim()] = row[key].trim();
                        }
                    });
                    jsonArray.push(jsonObject);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    console.log(req.query);
                    const proceso = req.query.ID_PROCESO;
                    const resp_duplicado_dni = yield this.resultadosService.duplicarDNIInscritosAResultados({ ID_PROCESO: req.query.ID_PROCESO });
                    if (resp_duplicado_dni.affectedRows >= jsonArray.length) {
                        const resp_actualiza_daracod_dni = yield this.resultadosService.actualizarDaraCodePorDNI(jsonArray, proceso);
                        res.status(200).json(resp_actualiza_daracod_dni);
                    }
                    else {
                        res.status(200).json({ ok: false, message: 'Hay mas estudiantes en la solapa que la cantidad de inscritos para este proceso' });
                    }
                }))
                    .on('error', (error) => {
                    console.log('Error al procesar el csv', error);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.procesarSolapasSECSV = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.createReadStream(req.file.path, 'utf-8');
                const jsonArray = [];
                fileContent.pipe((0, csv_parser_1.default)({ separator: ';' }))
                    .on('data', (row) => {
                    console.log("row: ", row);
                    const jsonObject = {};
                    Object.keys(row).forEach(key => {
                        if (key !== 'APELLIDOS Y NOMBRES' && key !== '') {
                            jsonObject[key.trim()] = row[key].trim();
                        }
                    });
                    jsonArray.push(jsonObject);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const proceso = req.query.ID_PROCESO;
                    const resp_actualiza_daracod_dni = yield this.resultadosService.actualizarDaraCodePorDNISE(jsonArray, proceso);
                    res.status(200).json(resp_actualiza_daracod_dni);
                    // if(resp_actualiza_daracod_dni.affectedRows === jsonArray.length) {
                    // }else {
                    //   res.status(200).json({ok: false, message: 'Hay mas estudiantes en la solapa que la cantidad de inscritos para este proceso'})
                    // }
                    // res.status(200).json(resp_actualiza_daracod_dni)
                }))
                    .on('error', (error) => {
                    console.log('Error al procesar el csv', error);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.procesarMultiPCSV = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.createReadStream(req.file.path, 'utf-8');
                const jsonArray = [];
                fileContent.pipe((0, csv_parser_1.default)({ separator: ';' }))
                    .on('data', (row) => {
                    const jsonObject = {};
                    Object.keys(row).forEach(key => {
                        if (key !== 'APELLIDOS Y NOMBRES' && key !== '') {
                            jsonObject[key.trim()] = row[key].trim();
                        }
                    });
                    jsonArray.push(jsonObject);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    // console.log(jsonArray)
                    // req.query.ID_PROCESO = 26
                    const resp_notas_daras = yield this.resultadosService.establecerNotasPorDaraCode(jsonArray);
                    const params = {};
                    const resp_asignarIngresantes = yield this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query);
                    res.status(200).json(Object.assign(Object.assign({}, resp_notas_daras), resp_asignarIngresantes));
                }))
                    .on('error', (error) => {
                    console.log('Error al procesar el csv', error);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.procesarMultiPCSVPE = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.createReadStream(req.file.path, 'utf-8');
                const jsonArray = [];
                fileContent.pipe((0, csv_parser_1.default)({ separator: ';' }))
                    .on('data', (row) => {
                    const jsonObject = {};
                    Object.keys(row).forEach(key => {
                        if (key !== 'APELLIDOS Y NOMBRES' && key !== '') {
                            jsonObject[key.trim()] = row[key].trim();
                        }
                    });
                    jsonArray.push(jsonObject);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    // console.log(jsonArray)
                    // req.query.ID_PROCESO = 26
                    const resp_notas_daras = yield this.resultadosService.establecerNotasPorDaraCodePE(jsonArray, req.query);
                    const params = {};
                    // const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
                    res.status(200).json(resp_notas_daras);
                }))
                    .on('error', (error) => {
                    console.log('Error al procesar el csv', error);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.procesarMultiPCSVEF = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.createReadStream(req.file.path, 'utf-8');
                const jsonArray = [];
                fileContent.pipe((0, csv_parser_1.default)({ separator: ';' }))
                    .on('data', (row) => {
                    const jsonObject = {};
                    Object.keys(row).forEach(key => {
                        if (key !== 'APELLIDOS Y NOMBRES' && key !== '') {
                            jsonObject[key.trim()] = row[key].trim();
                        }
                    });
                    jsonArray.push(jsonObject);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    // console.log(jsonArray)
                    // req.query.ID_PROCESO = 26
                    const resp_notas_daras = yield this.resultadosService.establecerNotasPorDaraCodeEF(jsonArray, req.query);
                    const resp_asignarIngresantes = yield this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query);
                    res.status(200).json(Object.assign(Object.assign({}, resp_notas_daras), resp_asignarIngresantes));
                    // const params = {}
                    // const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
                    // res.status(200).json({...resp_notas_daras, ...resp_asignarIngresantes})
                    res.status(200).json(resp_notas_daras);
                }))
                    .on('error', (error) => {
                    console.log('Error al procesar el csv', error);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.resultadosService = new resultados_service_1.ResultadosAdministradorService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/procesar-solapas-csv', upload.single('solapa'), (0, express_async_handler_1.default)(this.procesarSolapasCSV));
        this.router.post('/procesar-multip-csv', upload.single('multip'), (0, express_async_handler_1.default)(this.procesarMultiPCSV));
        this.router.post('/procesar-solapas-segundo-examen', upload.single('solapa'), (0, express_async_handler_1.default)(this.procesarSolapasSECSV));
        this.router.post('/procesar-multip-primer-examen-csv', upload.single('multip'), (0, express_async_handler_1.default)(this.procesarMultiPCSVPE));
        this.router.post('/procesar-multip-ultimo-examen-csv', upload.single('multip'), (0, express_async_handler_1.default)(this.procesarMultiPCSVEF));
    }
}
exports.default = ResultadosAdministradorController;
