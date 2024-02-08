"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV;
const logsDir = 'logs';
const filename = path_1.default.join(logsDir, 'logs-api.log');
exports.logger = (0, winston_1.createLogger)({
    level: env === 'development' ? 'debug' : 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.Console({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`))
        }),
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename
        })
    ]
});
