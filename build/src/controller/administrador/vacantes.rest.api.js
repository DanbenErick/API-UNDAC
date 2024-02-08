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
const Vacantes_service_1 = require("../../services/administrador/vacantes/Vacantes.service");
class VacantesController {
    constructor() {
        this.obtenerVacantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {};
                const result = yield this.vacantesService.obtenerVacantes(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerVacantesPorProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { ID_PROCESO: Number(req.query.ID_PROCESO) };
                const result = yield this.vacantesService.obtenerVacantesPorProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.verificarDisponibilidadProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { ID_PROCESO: Number(req.query.ID_PROCESO) };
                const result = yield this.vacantesService.verificarDisponibilidadProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.crearVacante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datosMiddleware = req.locals;
                const params = req.body;
                params.USUARIO_REGISTRO = datosMiddleware.id;
                const result = yield this.vacantesService.crearVacante(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.oobtenerCarrerasPorProcesoInput = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.vacantesService.obtenerCarrerasPorProcesoInput();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.vacantesService = new Vacantes_service_1.VacantesService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-vacantes', (0, express_async_handler_1.default)(this.obtenerVacantes));
        this.router.get('/obtener-vacantes-proceso', (0, express_async_handler_1.default)(this.obtenerVacantesPorProceso));
        this.router.get('/verificar-proceso-id', (0, express_async_handler_1.default)(this.verificarDisponibilidadProceso));
        this.router.get('/obtener-carreras-inputs', (0, express_async_handler_1.default)(this.oobtenerCarrerasPorProcesoInput));
        this.router.post('/crear-vacante', (0, express_async_handler_1.default)(this.crearVacante));
    }
}
exports.default = VacantesController;
