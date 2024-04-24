
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
    public modifcarEstadoCordinador = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        const result = await this.cordinadorRepo.modifcarEstadoCordinador(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }
    public obtenerIngresantesParaContanciaProDNIyProceso = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        params = {
          dni: params.dni || '',
          proceso: params.proceso || ''
        }
        const result = await this.cordinadorRepo.obtenerIngresantesParaContanciaProDNIyProceso(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }
    public procesarCodigosMatricula = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        console.log(params)
        let okRows = 0
        let fails = []
        for(let i = 0; i < params.dataExcel.length; i++) {
          const [result] = await this.cordinadorRepo.procesarprocesarCodigosMatricula(dbConnect, {PROCESO: params.proceso, DNI: params.dataExcel[i].DNI,CODIGO_MATRICULA: params.dataExcel[i].CODIGO_MATRICULA})
          if(result.affectedRows) {
            okRows += 1
          }else {
            fails.push(params.dataExcel[i].DNI)
          }
        }
        return {
          ok: true,
          correctas: `${okRows}`,
          errores: fails
        }
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }
    public obtenerIngresantes = async(params: any) => {
      const dbConnect: any = await connectMysql.connectMysql()
      try {
        const result = await this.cordinadorRepo.obtenerIngresantes(dbConnect, params)
        return result
      }catch(error) {
        await dbConnect.rollback()
      }finally {
        await dbConnect.close()
      }
    }
}