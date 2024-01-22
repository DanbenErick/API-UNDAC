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
const sistema_service_1 = __importDefault(require("../../services/sistema/sistema.service"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class UsuarioADminController {
    constructor() {
        this.crearUsuaroAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                console.log(params.CODIGO);
                if (params.CODIGO_ACCESO === '4c72a78b-61d8-41a8-867c-3ea7f3a4210c') {
                    delete params.CODIGO_ACCESO;
                    const result = yield this.sistemaService.crearUsuarioAdmin(params);
                    res.status(200).json(result);
                }
                else {
                    res.status(403).json({ message: 'No tienes los permisos nesesarios' });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.loginUsuarioAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.sistemaService.loginUsuarioAdmin(params);
                res.status(200).header('auth-token', resp.token).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.cerrarSesionAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.sistemaService.cerrarSesionAdmin(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.loginUsuarioEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.sistemaService.loginUsuarioEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.sistemaService = new sistema_service_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/crear-usuario', (0, express_async_handler_1.default)(this.crearUsuaroAdmin));
        this.router.post('/login-usuario', (0, express_async_handler_1.default)(this.loginUsuarioAdmin));
        this.router.post('/cerrar-sesion', (0, express_async_handler_1.default)(this.cerrarSesionAdmin));
        this.router.post('/login-estudiante', (0, express_async_handler_1.default)(this.loginUsuarioEstudiante));
    }
}
exports.default = UsuarioADminController;
