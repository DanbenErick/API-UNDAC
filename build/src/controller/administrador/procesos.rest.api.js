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
exports.ProcesosController = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Procesos_service_1 = require("../../services/administrador/procesos/Procesos.service");
class ProcesosController {
    constructor() {
        this.obtenerProcesos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = [];
                const result = yield this.procesosService.obtenerProcesos(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario } = req.query;
                let result;
                if (usuario != null) {
                    // result = await this.mantenimientoUsuarioService.obtenerUsuarios(usuario);
                }
                else {
                    //   result = await this.mantenimientoUsuarioService.obtenerUsuarios();
                }
                res.status(200).json(result);
            }
            catch (error) {
                // logger.error("obtenerusuarios => ruta ", error)
                res.status(500).json(error);
            }
        });
        this.crearProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datosMiddleware = req.locals;
                const params = req.body;
                params.USUARIO_REGISTRO = datosMiddleware.id;
                const result = yield this.procesosService.crearProceso(params);
                if (result.ok) {
                    res.status(200).json(result);
                }
                else {
                    res.status(500).json(result);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.cerrarProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.cerrarProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosPorSede = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.obtenerInscritosPorSede(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosPorArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.obtenerInscritosPorArea(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosPorCarrera = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.obtenerInscritosPorCarrera(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosPorModalidad = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.obtenerInscritosPorModalidad(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosEstudianteDatos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                // ID_PROCESO
                const result = yield this.procesosService.obtenerInscritosEstudianteDatos(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.abrirProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.abrirProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.actualizarProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.procesosService.actualizarProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.procesosService = new Procesos_service_1.ProcesosService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.put('/actualizar-proceso', (0, express_async_handler_1.default)(this.actualizarProceso));
        this.router.get('/obtener-procesos', (0, express_async_handler_1.default)(this.obtenerProcesos));
        this.router.post('/crear-proceso', (0, express_async_handler_1.default)(this.crearProceso));
        this.router.post('/abrir-proceso', (0, express_async_handler_1.default)(this.abrirProceso));
        this.router.post('/cerrar-proceso', (0, express_async_handler_1.default)(this.cerrarProceso));
        this.router.post('/obtener-inscritos-por-sede', (0, express_async_handler_1.default)(this.obtenerInscritosPorSede));
        this.router.post('/obtener-inscritos-por-carrera', (0, express_async_handler_1.default)(this.obtenerInscritosPorCarrera));
        this.router.post('/obtener-inscritos-por-modalidad', (0, express_async_handler_1.default)(this.obtenerInscritosPorModalidad));
        this.router.post('/obtener-inscritos-por-area', (0, express_async_handler_1.default)(this.obtenerInscritosPorArea));
        this.router.post('/obtener-inscritos-datos-estudiante', (0, express_async_handler_1.default)(this.obtenerInscritosEstudianteDatos));
    }
}
exports.ProcesosController = ProcesosController;
