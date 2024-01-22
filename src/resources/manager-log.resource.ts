import { createLogger, format, transports } from 'winston';
import path from 'path';

const env = process.env.NODE_ENV;
const logsDir = 'logs';
const filename = path.join(logsDir, 'logs-api.log');

export const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename
        })
    ]
});
