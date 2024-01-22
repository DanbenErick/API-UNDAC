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
const inscritos_service_1 = require("../../services/administrador/inscritos/inscritos.service");
class InscritosController {
    constructor() {
        this.obtenerInscritos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inscritosService.obtenerInscritos();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarInscrito = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.inscritosService.buscarInscrito(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarInscrito = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.inscritosService.modificarInscrito(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.inscribirEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.inscritosService.inscribirEstudiante(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.inscritosService = new inscritos_service_1.InscritosService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-inscritos', (0, express_async_handler_1.default)(this.obtenerInscritos));
        this.router.post('/buscar-inscrito', (0, express_async_handler_1.default)(this.buscarInscrito));
        this.router.put('/modificar-inscrito', (0, express_async_handler_1.default)(this.modificarInscrito));
        this.router.post('/incribir-estudiante', (0, express_async_handler_1.default)(this.inscribirEstudiante));
    }
}
exports.default = InscritosController;
