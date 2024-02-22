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
exports.InputsControlsController = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const inputs_controls_service_1 = require("../../services/inputs-controls/inputs-controls.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ip_1 = __importDefault(require("ip"));
class InputsControlsController {
    constructor() {
        this.obtenerProcesos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inputsControlsService.obtenerProcesos("");
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerCarreras = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inputsControlsService.obtenerCarreras("");
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerCarrerasCodigo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inputsControlsService.obtenerCarrerasPorCodigo("");
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerFacultades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerFacultades();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerDiscapacidades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerDicapacidades();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerTodosLosProcesosActivos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerTodosLosProcesosActivos();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerRazasEtnicas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.token;
                // Decodificar el token
                if (!process.env.JWT_TOKEN_SECRET) {
                    throw new Error('JWT_TOKEN_SECRET must be defined');
                }
                const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
                // El objeto 'decodedToken' contiene la información decodificada
                console.log("Decoded Token:", decodedToken);
                console.log("TOKEN", token);
                const resp = yield this.inputsControlsService.obtenerRazasEtnicas();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerProcesoActivo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.inputsControlsService.obtenerProcesoActivo(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerUbicaciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerUbicacionesAutocomplete();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
        this.obtenerDepartamentos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerDepartamentos();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
        this.obtenerProvincias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const resp = yield this.inputsControlsService.obtenerProvincias(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
        this.obtenerDistritos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const resp = yield this.inputsControlsService.obtenerDistritos(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
        });
        this.buscarAulaPorTurno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.inputsControlsService.buscarAulaPorTurno(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerProcesosAbiertos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerProcesosAbiertos();
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
                if (verified != null) {
                    next();
                }
                else {
                    res.status(403).json({ message: 'No tienes los permisos nesesarios' });
                }
            }
            catch (err) {
                res.status(401).send('Invalid token !');
            }
        };
        this.obtenerIp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({
                ip: ip_1.default.address(),
            });
        });
        this.obtenerModalidades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerModalidades();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerCarrerasPorModalidades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.inputsControlsService.obtenerCarrerasPorModalidades(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerLugarAutocomplete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.inputsControlsService.obtenerLugarAutocomplete(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerPadronEstudiantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    inicio: req.params.inicio,
                    fin: req.params.fin,
                    area: req.params.area
                };
                const resp = yield this.inputsControlsService.obtenerPadronEstudiantes(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerResultadosModalidades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    modalidad: req.params.modalidad
                };
                const resp = yield this.inputsControlsService.obtenerResultadosModalidades(params);
                res.status(200).json(resp);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.obtenerSedes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.inputsControlsService.obtenerSedes();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.inputsControlsService = new inputs_controls_service_1.InputsControlsService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //TODO: Revisar cuales son los endpoints que nesesitan permisos
        this.router.post('/obtener-ubicacion-autocomplete', (0, express_async_handler_1.default)(this.obtenerLugarAutocomplete));
        this.router.post('/obtener-carreras-por-modalidades', (0, express_async_handler_1.default)(this.obtenerCarrerasPorModalidades));
        this.router.get('/obtener-modalidades', (0, express_async_handler_1.default)(this.obtenerModalidades));
        this.router.get('/obtener-todos-procesos-activo', (0, express_async_handler_1.default)(this.obtenerTodosLosProcesosActivos));
        this.router.get("/obtener-procesos-abiertos", this.authenticateToken, (0, express_async_handler_1.default)(this.obtenerProcesosAbiertos));
        this.router.get("/obtener-procesos", (0, express_async_handler_1.default)(this.obtenerProcesos));
        this.router.get("/obtener-carreras", (0, express_async_handler_1.default)(this.obtenerCarreras));
        this.router.post('/buscar-aula-por-turno', (0, express_async_handler_1.default)(this.buscarAulaPorTurno));
        this.router.get('/obtener-ips', (0, express_async_handler_1.default)(this.obtenerIp));
        this.router.get('/obtener-sedes', (0, express_async_handler_1.default)(this.obtenerSedes));
        this.router.get('/obtener-resultados-modalidades/:modalidad', (0, express_async_handler_1.default)(this.obtenerResultadosModalidades));
        this.router.get('/obtener-padron-estudiantes/:inicio/:fin/:area', (0, express_async_handler_1.default)(this.obtenerPadronEstudiantes));
        this.router.get("/obtener-carreras-codigo", (0, express_async_handler_1.default)(this.obtenerCarrerasCodigo));
        this.router.get("/obtener-facultades", (0, express_async_handler_1.default)(this.obtenerFacultades));
        this.router.get("/obtener-discapacidades", (0, express_async_handler_1.default)(this.obtenerDiscapacidades));
        this.router.get("/obtener-razas-etnicas", (0, express_async_handler_1.default)(this.obtenerRazasEtnicas));
        this.router.post("/obtener-proceso-activo", (0, express_async_handler_1.default)(this.obtenerProcesoActivo));
        this.router.get("/obtener-ubicaciones", (0, express_async_handler_1.default)(this.obtenerUbicaciones));
        this.router.get("/obtener-departamentos", (0, express_async_handler_1.default)(this.obtenerDepartamentos));
        this.router.get("/obtener-provincias", (0, express_async_handler_1.default)(this.obtenerProvincias));
        this.router.get("/obtener-distritos", (0, express_async_handler_1.default)(this.obtenerDistritos));
    }
}
exports.InputsControlsController = InputsControlsController;
