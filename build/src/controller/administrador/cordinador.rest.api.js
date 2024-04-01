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
const cordinador_service_1 = require("../../services/administrador/cordinador/cordinador.service");
class CordinadorController {
    constructor() {
        this.obtenerCordinadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.cordinadorService.obtenerCordinadores();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarCordinador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.cordinadorService.buscarCordinador(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.crearCordinador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.cordinadorService.crearCordinador(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarCordinador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.cordinadorService.modificarCordinador(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modifcarEstadoCordinador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.cordinadorService.modifcarEstadoCordinador(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerIngresantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.cordinadorService.obtenerIngresantes(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerIngresantesParaContanciaProDNIyProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.cordinadorService.obtenerIngresantesParaContanciaProDNIyProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.cordinadorService = new cordinador_service_1.CordinadorService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-ingresantes', (0, express_async_handler_1.default)(this.obtenerIngresantes));
        this.router.get('/obtener-ingresantes-para-contancia-pro-dni-y-proceso', (0, express_async_handler_1.default)(this.obtenerIngresantesParaContanciaProDNIyProceso));
        this.router.get('/modificar-estado-cordinador', (0, express_async_handler_1.default)(this.modifcarEstadoCordinador));
        this.router.get('/obtener-cordinadores', (0, express_async_handler_1.default)(this.obtenerCordinadores));
        this.router.post('/buscar-cordinador', (0, express_async_handler_1.default)(this.buscarCordinador));
        this.router.post('/crear-cordinador', (0, express_async_handler_1.default)(this.crearCordinador));
        this.router.put('/modificar-cordinador', (0, express_async_handler_1.default)(this.modificarCordinador));
        // this.router.post('/buscar-voucher', asyncHandler(this.buscarVoucher))
    }
}
exports.default = CordinadorController;
