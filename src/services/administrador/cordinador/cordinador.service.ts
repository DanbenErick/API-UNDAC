
import connectMysql from '../../../config/connection.mysqldb'
import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface'
import bcrypt from 'bcrypt'
import { CordinadorRepository } from '../../../repository/administrador/cordinador/cordinador.repo'


export class CordinadorService {
    
    public cordinadorRepo: CordinadorRepository

    public constructor() {
        this.cordinadorRepo = new CordinadorRepository()
        
    }

    public obtenerCordinadores = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.cordinadorRepo.obtenerCordinadores(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public crearCordinador = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        const salt = await bcrypt.genSalt(10);
        const password_encript: any = await bcrypt.hash(params.PASSWORD || '', salt);
        params.PASSWORD = password_encript
        const result = await this.cordinadorRepo.crearCordinador(dbConnect, params)
        if(result[0].affectedRows > 0) {
          return {ok: true, message: 'Cordinador registrado correctamente'}
        }
        return {ok: false, message: 'Cordinador no se registrado correctamente'}
        
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }

    public buscarCordinador = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        params = {
          USUARIO : params.USUARIO || '',
          DNI: params.DNI || ''
        }
        const result = await this.cordinadorRepo.buscarCordinadorPorUsuario(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }

    public modificarCordinador = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        const result = await this.cordinadorRepo.modificarCordinador(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }
}