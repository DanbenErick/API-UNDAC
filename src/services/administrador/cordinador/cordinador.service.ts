
import connectMysql from '../../../config/connection.mysqldb'
import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface'

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
        const result = await this.cordinadorRepo.crearCordinador(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }

    public buscarCordinador = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
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