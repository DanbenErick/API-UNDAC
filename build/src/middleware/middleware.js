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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const reportes_service_1 = require("../services/general/reportes/reportes.service");
const formatDateToMySQL = (date) => {
    return (0, moment_timezone_1.default)(date).tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
};
const auditMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Ingreso a middleware');
    const token = req.token;
    console.log("Token", token);
    if (req.originalUrl.contains('/general/reportes/'))
        if (!process.env.JWT_TOKEN_SECRET) {
            throw new Error('JWT_TOKEN_SECRET must be defined');
        }
    let verified;
    if (token) {
        verified = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
        req.locals = verified;
        console.log(verified);
    }
    const reporteServi = new reportes_service_1.ReporteService();
    const originalSend = res.send;
    // res.send = async function(body) {
    try {
        const auditEntry = {
            USER: verified.id ? verified.id : 'Postulante', // Asume que el usuario está en req.user
            METHOD: req.method,
            ENDPOINT: req.originalUrl,
            REQUESTBODY: JSON.stringify(req.body),
            RESPONSESTATUS: res.statusCode,
            TIME: formatDateToMySQL(new Date()),
        };
        console.log(auditEntry);
        const result = yield reporteServi.registrarLog(auditEntry);
    }
    catch (error) {
        console.error('Error saving audit log:', error);
    }
    //   originalSend.apply(res, arguments);
    // };
    next();
});
exports.default = auditMiddleware;
