import { query } from 'express'
import connectMysql from '../../config/connection.mysqldb'
import { InputsControlsRepository } from '../../repository/inputs-controls/inputs-controls.repository'

export class InputsControlsService {
    public inputsControlsRepo: InputsControlsRepository
    public constructor() {
        this.inputsControlsRepo = new InputsControlsRepository()
    }
    public obtenerLugarAutocomplete = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerLugarAutocomplete(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerPadronEstudiantes = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerPadronEstudiantes(dbConexion, params)
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public obtenerSedes = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerSedes(dbConexion, params)
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public obtenerDeclaracioneJuradas = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerDeclaracioneJuradas(dbConexion, params)
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public validarCordinador = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            params = {
                USUARIO: params.CODIGO ||  params.DNI || '',
            }
            console.log(params, "patams")
            const resp = await this.inputsControlsRepo.validarCordinador(dbConexion, params)
            if(resp.length > 0) {
                return {
                    ok: true,
                    message: 'Bienvenido ' + resp[0].NOMBRES,
                    result : {...resp[0]}
                }
            }else {
                return {
                    ok: false,
                    message: 'Cordinador desconocido'
                }
            }
            
            
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public obtenerResultadosModalidades = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerResultadosModalidades(dbConexion, params)
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public obtenerResultadosOrdinario = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerResultadosOrdinario(dbConexion, params)
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public obtenerIngresantesParaConstancia = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            let result
            if(params.proceso != null && params.dni != null) {
                // result = await 
            }else {
                result = await this.inputsControlsRepo.obtenerIngresantesParaConstancia(dbConexion, params)
            }
            return result
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
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
    public obtenerMencion = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerMencion(dbConex, params)
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

    public obtenerInscritosPorCordinador = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerInscritosPorCordinador(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    
}