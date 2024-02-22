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
                // Leer el contenido del archivo como una cadena
                console.log("Path archivo", req.file.path);
                const fileContent = fs_1.default.readFileSync(req.file.path, 'utf-8');
                console.log(JSON.parse(fileContent));
                // Validar el archivo
                // if (!/\.csv$/.test(req.file.originalname) || !/\.txt$/.test(req.file.originalname) ) {
                //   return res.status(400).send('El archivo debe ser un archivo CSV o TXT');
                // }
                console.log("Contenido del archivo", fileContent);
                // Almacenar el archivo en la base de datos
                // ...
                // Procesar el contenido del archivo
                // ...
                res.send('El archivo se ha subido correctamente');
            }
            catch (error) {
                console.error(error);
            }
        });
        this.resultadosService = new resultados_service_1.ResultadosAdministradorService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/procesar-solapas-csv', upload.single('solapa'), (0, express_async_handler_1.default)(this.procesarSolapasCSV));
    }
}
exports.default = ResultadosAdministradorController;
