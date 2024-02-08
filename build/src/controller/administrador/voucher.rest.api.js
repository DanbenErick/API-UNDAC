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
const Voucher_service_1 = require("../../services/administrador/voucher/Voucher.service");
class VoucherController {
    constructor() {
        this.obtenerVouchers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.voucherService.obtenerVouchers();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.voucherService.buscarVoucher(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarEstudianteParaVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.voucherService.buscarEstudianteParaVoucher(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.crearVoucher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const datosMiddleware = req.locals;
                params.USUARIO_REGISTRO = datosMiddleware.id;
                const resp = yield this.voucherService.crearVoucher(params);
                console.log(resp);
                res.status(200).json(resp);
            }
            catch (error) {
                if (!error.ok) {
                    res.status(401).json(error);
                    return;
                }
                // console.log("DATOS DE ERRORES => ", error)
                res.status(500).json(error);
            }
        });
        this.voucherService = new Voucher_service_1.VoucherService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-vouchers', (0, express_async_handler_1.default)(this.obtenerVouchers));
        this.router.post('/buscar-voucher', (0, express_async_handler_1.default)(this.buscarVoucher));
        this.router.post('/buscar-estudiante-parar-voucher', (0, express_async_handler_1.default)(this.buscarEstudianteParaVoucher));
        this.router.post('/crear-voucher', (0, express_async_handler_1.default)(this.crearVoucher));
    }
}
exports.default = VoucherController;
