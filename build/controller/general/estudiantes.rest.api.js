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
const EstudianteGeneral_service_1 = require("../../services/general/estudiantes/EstudianteGeneral.service");
const multer_1 = __importDefault(require("multer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const nombreSinExtension = file.originalname.split('.')[0];
        const directorioDestino = `./uploads/${nombreSinExtension}`;
        // Verificar si el directorio existe, y si no, crearlo
        if (!fs_1.default.existsSync(directorioDestino)) {
            fs_1.default.mkdirSync(directorioDestino, { recursive: true });
        }
        cb(null, `./uploads/${nombreSinExtension}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
class EstudianteController {
    constructor() {
        this.consultarEstudianteExiste = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.estudianteService.consultarEstudianteExiste(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.registrarEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                params.IP_DIRECCION = req.ip;
                console.log(req.ip);
                const resp = yield this.estudianteService.registrarEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.inscribirEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                console.table(params);
                const resp = yield this.estudianteService.inscribirEstudianteProcedimientoAlmacenado(params);
                // const resp_1: any = await this.estudianteService.registrarDatosComplementarios(params)
                // const resp_2: any = await this.estudianteService.registrarInscripcionEstudiante(params)
                if (!resp.ok) {
                    res.status(200).json({ ok: false, message: 'No se llego a registrar' });
                    return;
                }
                res.status(200).json({ ok: true, message: 'Se guardo los cambios correctamente' });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.subirFotoEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(200).json({ error: 'No se proporcionó ningún archivo.' });
                }
                res.status(200).json({ ok: true, message: 'Foto subido correctamente' });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.subirDocumentacionEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(200).json({ error: 'No se proporcionó ningún archivo.' });
                }
                res.status(200).json({ ok: true, message: 'Documento subido correctamente' });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.registrarTestPsicologico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.registrarTestPsicologicoEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.verificarTestpsicologicoInscrito = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.verificarTestpsicologicoInscrito(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.verificarInscripcionEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.verificarInscripcionEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.verificarDatosCompletamerioEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.verificarDatosCompletamerioEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.authenticateToken = (req, res, next) => {
            try {
                // const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
                const token = req.token;
                console.log(token);
                if (!token) {
                    throw new Error('Authentication failed!');
                }
                // const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
                if (!process.env.JWT_TOKEN_SECRET) {
                    throw new Error('JWT_TOKEN_SECRET must be defined');
                }
                const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
                if (verified.rol === 'ESTUDIANTE') {
                    next();
                }
                else {
                    res.status(401).json({ message: 'No tienes los permisos nesesarios' });
                }
            }
            catch (err) {
                res.status(401).send({ ok: false, message: 'Tu token ya se vencio' });
            }
        };
        this.obtenerMisPagos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.obtenerMisPagos(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.estudianteService = new EstudianteGeneral_service_1.EstudiantesGeneralService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/consultar-dni', (0, express_async_handler_1.default)(this.consultarEstudianteExiste));
        this.router.post('/registrar-estudiante', (0, express_async_handler_1.default)(this.registrarEstudiante));
        this.router.post('/inscribir-estudiante', this.authenticateToken, (0, express_async_handler_1.default)(this.inscribirEstudiante));
        this.router.post('/subir-foto-estudiante', this.authenticateToken, upload.single('foto'), (0, express_async_handler_1.default)(this.subirFotoEstudiante));
        this.router.post('/subir-documentos-estudiante', this.authenticateToken, upload.single('documento'), (0, express_async_handler_1.default)(this.subirDocumentacionEstudiante));
        this.router.post('/registrar-test-psicologico', this.authenticateToken, (0, express_async_handler_1.default)(this.registrarTestPsicologico));
        this.router.post('/verificar-test-psicologico-inscrito', this.authenticateToken, (0, express_async_handler_1.default)(this.verificarTestpsicologicoInscrito));
        this.router.post('/verificar-inscripcion-estudiante', this.authenticateToken, (0, express_async_handler_1.default)(this.verificarInscripcionEstudiante));
        this.router.post('/verificar-registro-complementario-estudiante', this.authenticateToken, (0, express_async_handler_1.default)(this.verificarDatosCompletamerioEstudiante));
        this.router.post('/obtener-mis-pagos', this.authenticateToken, (0, express_async_handler_1.default)(this.obtenerMisPagos));
    }
}
exports.default = EstudianteController;
