
import connectMysql from '../../../config/connection.mysqldb'
import { ResultadosAdministradorRepository } from '../../../repository/administrador/resultados/resultados.repo'
// import { AulasInterface } from '../../../interfaces/administrador/aulas.interface'
// import { AulasRepository } from '../../../repository/administrador/aulas/aulas.repository'

export class ResultadosAdministradorService {
    
    public resultadosRepo: ResultadosAdministradorRepository
    
    public constructor() {
        this.resultadosRepo = new ResultadosAdministradorRepository()
        
    }

    public procesarCSVSolapas = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            // const result = await this.aulasRepo.obtenerAulas(dbConnect)
            // return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }

    public duplicarDNIInscritosAResultados = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.resultadosRepo.duplicarDNIInscritosAResultados(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public establecerNotasPorDaraCode = async(params: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const total_params = params.length
            let i = 0
            for(const element of params) {
                const result = await this.resultadosRepo.establecerNotasPorDaraCode(dbConexion, element)
                if(result && result[0].affectedRows === 1) {
                    i++
                }
            }
            console.log("contenido de indices", total_params, i)
            if(total_params === i) {
                return {ok: true, message: 'Se registro las notas de los estudiantes'}
            }
            return {ok: false, message: 'No se registro completamente las notas de los estudiantes'}
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }

    public actualizarDaraCodePorDNI = async(params: []) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const total_params = params.length
            let i = 0
            for(const element of params) {
                const result = await this.resultadosRepo.actualizarDaraCodePorDNI(dbConnect, element)
                if(result && result[0].affectedRows === 1) {
                    i++
                }
            }
            if(total_params === i) {
                return {ok: true, message: 'Se registro correctamente todos los daracodes'}
            }
            return {ok: false, message: 'Ocurrio un error al registrar los daracodes'}
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public asignarIngresantesPorCarreraOrdinario = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const resp_vacantes_por_carrera = await this.resultadosRepo.obtenerVacantesPorCarreraOrdinario(dbConnect ,{ID_PROCESO: 26})
            let i = 0
            for(const vacante of resp_vacantes_por_carrera) {
                const params_ingresantes = { 
                    COD_CARRERA: vacante.CODIGO_ESCUELA,
                    PROCESO: vacante.ID_PROCESO,
                    LIMIT: vacante.CANTIDAD
                } 
                const resp_asignar_ingresante_por_carrera = await this.resultadosRepo.establecerIngresantesPorCarreraOrdinario(dbConnect, params_ingresantes)
                if(resp_asignar_ingresante_por_carrera[0].affectedRows) {
                    i++
                }
            }

            if(resp_vacantes_por_carrera.length === i) {
                return { ok: true, data: 'Se registraron los ingresantes'}
            }
            return { ok: false, data: 'No se registraron los ingresantes'}
            
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
}