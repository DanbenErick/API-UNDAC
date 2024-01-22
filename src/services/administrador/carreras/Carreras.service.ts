
import connectMysql from '../../../config/connection.mysqldb'
import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface'
import { CarrerasRepository } from '../../../repository/administrador/carreras/carreras.repository'

export class CarrerasService {
    
    public carrerasRepo: CarrerasRepository
    public constructor() {
        this.carrerasRepo = new CarrerasRepository()
        
    }

    public obtenerCarreras = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.carrerasRepo.obtenerCarreras(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public buscarCarreraPorFacultad = async(params: CarreraInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.carrerasRepo.buscarCarreraPorFacultad(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public modificarCarrera = async(params: CarreraInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.carrerasRepo.modificarCarrera(dbConex, params)
            if(result[0].affectedRows > 0) {
                return { ok: true, message: 'Guardado correctamente' }
            }
            return { ok: false, message: 'Ocurrio un error al guardar' }
            
        }catch(error){
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public crearCarrera = async(params: CarreraInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const resp = await this.carrerasRepo.crearCarrera(dbConnect, params)
            if(resp[0].affectedRows > 0) {
                return { ok: true, message: 'Guardado correctamente' }
            }
            return { ok: false, message: 'Ocurrio un error al guardar' }
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
}