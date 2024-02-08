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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);
class DatabaseMysql {
    constructor() {
        this.connectMysql = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield (0, promise_1.createConnection)({
                    host: process.env.HOST,
                    user: process.env.USER,
                    password: process.env.PASSWORD,
                    database: process.env.DATABASE,
                });
                return yield this.connection.connect();
                // console.log('Connected to the database');
            }
            catch (error) {
                console.log("OCurrio un error", error);
                throw new Error(`Error connecting to the database: ${error.message}`);
            }
        });
        //   async connect(): Promise<void> {
        //     try {
        //       await this.connection.connect();
        //       console.log('Connected to the database');
        //     } catch (error) {
        //       throw new Error(`Error connecting to the database: ${error.message}`);
        //     }
        //   }
        //   async query<T>(sql: string, values?: any): Promise<T[]> {
        //     try {
        //       const [results] = await this.connection.query(sql, values);
        //       return results as T[];
        //     } catch (error) {
        //       throw new Error(`Error executing query: ${error.message}`);
        //     }
        //   }
        this.close = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.end();
                console.log('Connection closed');
            }
            catch (error) {
                throw new Error(`Error closing connection: ${error.message}`);
            }
        });
    }
}
// const db = new DatabaseMysqk(dbConfig);
// (async () => {
//   try {
//     await db.connect();
//     const results = await db.query<{ columna1: string, columna2: number }>('SELECT columna1, columna2 FROM tu_tabla');
//     console.log(results);
//   } catch (error) {
//     console.error('Error:', error.message);
//   } finally {
//     await db.close();
//   }
// })();
exports.default = new DatabaseMysql();
