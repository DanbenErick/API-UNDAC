
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

            const [siHayResultadoRegistrado] = await this.resultadosRepo.verificarSiHayResultadosDelProceso(dbConnect, params)
            if(siHayResultadoRegistrado.CANTIDAD > 0) {
                await this.resultadosRepo.eliminarRegistroDeUnProcesoResultados(dbConnect, params)
                
            }
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
            if(total_params === i) {
                return {ok: true, message: 'Se registro las notas de los estudiantes'}
            }
            return {ok: true, message: 'Se registro las notas de los estudiantes'}
            // return {ok: false, message: 'No se registro completamente las notas de los estudiantes'}
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public establecerNotasPorDaraCodePE = async(params: any, params_2: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            const total_params = params.length
            let i = 0
            for(const element of params) {
                const result = await this.resultadosRepo.establecerNotasPorDaraCodePE(dbConexion, element)
                if(result && result[0].affectedRows === 1) {
                    i++
                }
            }
            if(total_params === i) {
                return {ok: true, message: 'Se registro las notas de los estudiantes'}
            }
            return {ok: true, message: 'Se registro las notas de los estudiantes'}
            // return {ok: false, message: 'No se registro completamente las notas de los estudiantes'}
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public establecerNotasPorDaraCodeEF = async(params: any, params_2: any) => {
        const dbConexion: any = await connectMysql.connectMysql()
        try {
            // console.log(params)
            const total_params = params.length
            let i = 0
            let j = 0
            for(const element of params) {
                const result = await this.resultadosRepo.establecerNotasPorDaraCodeEF(dbConexion, element)
                if(result && result[0].affectedRows === 1) {
                    i++
                }
            }
            const obtenerPrimerYUltimaNotas = await this.resultadosRepo.obtenerNotasParaSacarPromedio(dbConexion, params, params_2)
            for(const element of obtenerPrimerYUltimaNotas) {
                const result = await this.resultadosRepo.establecerNotaFinalCepre(dbConexion, {...element, PUNT_T: (parseFloat(element.PUNT_1) + parseFloat(element.PUNT_2)) / 2}, params_2)
                if(result && result[0].affectedRows === 1) {
                    j++
                }
            }
            if(total_params === i) {
                console.log('Sacado promedio de estos estuaintes', j)
                return {ok: true, message: 'Se registro las notas de los estudiantes'}
            }
            return {ok: true, message: 'Se registro las notas de los estudiantes'}
            // return {ok: false, message: 'No se registro completamente las notas de los estudiantes'}
        }catch(error) {
            await dbConexion.rollback()
        }finally {
            await dbConexion.close()
        }
    }
    public establecerPromedioCepre = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {

        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }

    public actualizarDaraCodePorDNI = async(params: [], proceso: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const total_params = params.length
            let i = 0
            for(const element of params) {
                const result = await this.resultadosRepo.actualizarDaraCodePorDNI(dbConnect, element, proceso)
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
    public actualizarDaraCodePorDNISE = async(params: [], proceso: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const resp_establecer_nsp_se = await this.resultadosRepo.establecerNoPresentoSegundoExamen(dbConnect, params, proceso)
            const total_params = params.length
            let i = 0
            for(const element of params) {
                const result = await this.resultadosRepo.actualizarDaraCodePorDNISE(dbConnect, element, proceso)
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
            const resp_vacantes_por_carrera = await this.resultadosRepo.obtenerVacantesPorCarreraOrdinario(dbConnect ,params)
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

            for(const vacante of resp_vacantes_por_carrera) {
                const params_ingresantes = {
                    ID_PROCESO: vacante.ID_PROCESO,
                    COD_CARRERA: vacante.CODIGO_ESCUELA,
                    PROCESO: vacante.ID_PROCESO,
                    LIMIT: vacante.CANTIDAD
                } 
                console.log("Actualizando orden de merito")
                const resp_orden_merito_ingresantes_ordinario = await this.resultadosRepo.establecerOrdenMeritoIngresantesOrdinario(dbConnect, params_ingresantes)
                const resp_orden_merito_no_ingresantes_ordinario = await this.resultadosRepo.establecerOrdenMeritoDiferentesAIngresantes(dbConnect, params_ingresantes)
                console.log(resp_orden_merito_ingresantes_ordinario, resp_orden_merito_no_ingresantes_ordinario)
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