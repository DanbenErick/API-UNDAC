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
const Estudiante_service_1 = require("../../services/administrador/estudiantes/Estudiante.service");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const storageEst = multer_1.default.diskStorage({
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
const upload = (0, multer_1.default)({ storage: storageEst });
const processImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const originalFilePath = req.file.path;
        const processedFilePath = `${originalFilePath.split('.')[0]}.jpeg`;
        // Verificar si el archivo ya es JPEG
        const isJPEG = req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/jpg';
        // Si ya es JPEG, no es necesario convertirlo
        if (!isJPEG) {
            // console.log("Ingreso aqui")
            yield (0, sharp_1.default)(originalFilePath)
                .jpeg()
                .toFile(processedFilePath);
            fs_1.default.unlinkSync(originalFilePath);
        }
        req.file.filename = req.file.filename.split('.')[0] + '.jpeg';
        req.file.path = processedFilePath;
        next();
    }
    catch (error) {
        next(error);
    }
});
class EstudianteController {
    constructor() {
        this.obtenerEstudiantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.estudianteService.obtenerEstudiantes();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.buscarCarreraPorFacultad(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarEstudiantePorNombre = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { DNI, NOMBRE, CELULAR } = req.query;
                const params = {
                    DNI: DNI || '',
                    NOMBRE: NOMBRE || '',
                    CELULAR: CELULAR || '',
                };
                console.log(params);
                const resp = yield this.estudianteService.buscarEstudiantePorNombre(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.modificarEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.registrarEInscribirEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                // console.log("PARAMETROS", params)
                const resp = yield this.estudianteService.registrarEInscribirEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.resetearPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.resetearPassword(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarDatosComplementariosEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.modificarDatosComplementariosEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.editarFotoEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("NUEVOS MENSAJES", req.body); // contenido texto del form   
            console.log(req.file); // archivo subido procesado por Multer
            try {
                if (!req.file) {
                    res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
                }
                res.status(200).json({ ok: true, message: 'Foto subido correctamente' });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerDatosComplementariosEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.obtenerDatosComplementariosEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.editarDocumentacionEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body); // contenido texto del form   
                console.log(req.file); // archivo subido procesado por Multer
                if (!req.file) {
                    res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
                }
                res.status(200).json({ ok: true, message: 'Documento subido correctamente' });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.estudianteService = new Estudiante_service_1.EstudiantesService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-estudiantes', (0, express_async_handler_1.default)(this.obtenerEstudiantes));
        this.router.post('/obtener-datos-complementarios-estudiante', (0, express_async_handler_1.default)(this.obtenerDatosComplementariosEstudiante));
        this.router.post('/buscar-estudiante', (0, express_async_handler_1.default)(this.buscarEstudiante));
        this.router.put('/modificar-estudiante', (0, express_async_handler_1.default)(this.modificarEstudiante));
        this.router.post('/registrar-inscribir-estudiante', (0, express_async_handler_1.default)(this.registrarEInscribirEstudiante));
        this.router.post('/resetear-password', (0, express_async_handler_1.default)(this.resetearPassword));
        this.router.post('/modificar-datos-complementarios-estudiante', (0, express_async_handler_1.default)(this.modificarDatosComplementariosEstudiante));
        // this.router.post('/editar-documento-estudiante', asyncHandler(this.editarDocumentacionEstudiante))
        this.router.post('/editar-documento-estudiante', upload.single('archivo'), (0, express_async_handler_1.default)(this.editarDocumentacionEstudiante));
        this.router.post('/editar-foto-estudiante', upload.single('fotoEstudiante'), processImage, (0, express_async_handler_1.default)(this.editarFotoEstudiante));
        this.router.get('/buscar-estudiante-por-nombre', (0, express_async_handler_1.default)(this.buscarEstudiantePorNombre));
        // this.router.post('/editar-foto-estudiante',  asyncHandler(this.editarFotoEstudiante))
    }
}
exports.default = EstudianteController;
