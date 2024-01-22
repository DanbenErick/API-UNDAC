import { createConnection, Connection, Query, QueryOptions } from 'mysql2/promise';
import { CredentialsMysqlDev } from '../resources/properties.resource'
class DatabaseMysql {
  private connection: any;

  constructor() {
    
  }
  public connectMysql = async (): Promise<void> => {
    try {
      
        this.connection = await createConnection({
            host: CredentialsMysqlDev.host,
            user: CredentialsMysqlDev.user,
            password: CredentialsMysqlDev.password,
            database: CredentialsMysqlDev.database,
        });
        return await this.connection.connect();
        // console.log('Connected to the database');
      } catch (error: any) {
        console.log("OCurrio un error", error)
        throw new Error(`Error connecting to the database: ${error.message}`);
      }
  }

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

  public close = async() => {
    try {
      await this.connection.end();
      console.log('Connection closed');
    } catch (error: any) {
      throw new Error(`Error closing connection: ${error.message}`);
    }
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
export default new DatabaseMysql();