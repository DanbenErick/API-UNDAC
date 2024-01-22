import connectMysql from "../../../config/connection.mysqldb";
import { VacantesInterface } from "../../../interfaces/administrador/vacantes.interface";
import VacantesRepository from "../../../repository/administrador/vacantes/vacantes.repository";

export class VacantesService {
    public vacantesRepo: VacantesRepository
    public constructor () {
        this.vacantesRepo = new VacantesRepository()
    }
    public obtenerVacantes = async(params: VacantesInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        
        try {
            const result = await this.vacantesRepo.obtenerVacantes(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerVacantesPorProceso = async(params: VacantesInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.vacantesRepo.obtenerVacantesPorProceso(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerCarrerasPorProcesoInput = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.vacantesRepo.obtenerCarrerasPorProcesoInput(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public verificarDisponibilidadProceso = async(params: VacantesInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result: [] = await this.vacantesRepo.verificarDisponibilidadProceso(dbConnect, params)
            if(result.length > 0) {
                return {ok: true, message: 'El proceso esta abierto'}
            }
            return {ok: false, message: 'El proceso esta cerrado'}
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close() 
        }
    }
    public crearVacante = async(params: VacantesInterface ) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.vacantesRepo.crearVacante(dbConnect, params)
            if(result[0].affectedRows > 0) {
                return { ok: true, procesoAbiertoExistente: false, message: 'Se creo correctamente la vacante' }
            }else {
                return { ok: false, procesoAbiertoExistente: false, message: 'No se llego a regsitrar la vacante' }
            }
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
}