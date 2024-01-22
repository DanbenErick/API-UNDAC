"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procesos_rest_api_1 = require("./procesos.rest.api");
const vacantes_rest_api_1 = __importDefault(require("./vacantes.rest.api"));
const carrera_routing_1 = __importDefault(require("./carrera.routing"));
const voucher_rest_api_1 = __importDefault(require("./voucher.rest.api"));
const estudiantes_rest_api_1 = __importDefault(require("./estudiantes.rest.api"));
const inscritos_routing_1 = __importDefault(require("./inscritos.routing"));
const aulas_rest_api_1 = __importDefault(require("./aulas.rest.api"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AdministradorRouting {
    constructor() {
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
                req.locals = verified;
                if (verified.rol === 'ADMINISTRADOR') {
                    next();
                }
                else {
                    res.status(403).json({ message: 'No tienes los permisos nesesarios' });
                }
            }
            catch (err) {
                res.status(401).send({ ok: 'error', message: 'Se vencio tu token' });
            }
        };
        this.procesos = new procesos_rest_api_1.ProcesosController();
        this.vacantes = new vacantes_rest_api_1.default();
        this.carreras = new carrera_routing_1.default();
        this.vouchers = new voucher_rest_api_1.default();
        this.estudiantes = new estudiantes_rest_api_1.default();
        this.inscritos = new inscritos_routing_1.default();
        this.aulas = new aulas_rest_api_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use(this.authenticateToken);
        this.router.use('/procesos', this.procesos.router);
        this.router.use('/vacantes', this.vacantes.router);
        this.router.use('/carreras', this.carreras.router);
        this.router.use('/vouchers', this.vouchers.router);
        this.router.use('/estudiantes', this.estudiantes.router);
        this.router.use('/inscritos', this.inscritos.router);
        this.router.use('/aulas', this.aulas.router);
    }
}
exports.default = new AdministradorRouting().router;
