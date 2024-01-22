import { query } from 'express'
import connectMysql from '../../config/connection.mysqldb'
import { InputsControlsRepository } from '../../repository/inputs-controls/inputs-controls.repository'

export class InputsControlsService {
    public inputsControlsRepo: InputsControlsRepository
    public constructor() {
        this.inputsControlsRepo = new InputsControlsRepository()
    }
    public obtenerProcesos = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerProcesos(dbConex, params)
            return result
        }
        catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerCarreras = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerCarreras(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerCarrerasPorCodigo = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerCarrerasPorCodigoCarrera(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerFacultades = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerFacultades(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerDicapacidades = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerDiscapadidades(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerRazasEtnicas = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerRazasEtnicas(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerProcesoActivo = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerProcesoActivo(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerTodosLosProcesosActivos = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerTodosLosProcesosActivos(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerUbicacionesAutocomplete = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerUbicacionAutocomplete(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerDepartamentos = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerDepartamentos(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerProvincias = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerProvincias(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerDistritos = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerDistritos(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public buscarAulaPorTurno = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.buscarAulaPorTurno(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public obtenerProcesosAbiertos = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerProcesosAbiertos(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    
    public obtenerModalidades = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerModalidades(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    public obtenerCarrerasPorModalidades = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerCarrerasPorModalidades(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    
}