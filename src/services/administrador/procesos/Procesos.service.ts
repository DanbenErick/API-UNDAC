
import connectMysql from '../../../config/connection.mysqldb'
import { ProcesosInterface } from '../../../interfaces/administrador/procesos.interface'
import { ProcesosRepository } from '../../../repository/administrador/procesos/procesos.repository'
// import { EstadosHttp } from '../../../constantes/mensajes/mensajes.constant';

export class ProcesosService {
    // public asignarOpcionesRolRepository: MantenimientoOpcionesRolRepository;
    public procesosRepo: ProcesosRepository
    public constructor() {
        this.procesosRepo = new ProcesosRepository()
        // this.asignarOpcionesRolRepository = new MantenimientoOpcionesRolRepository();
    }
    public obtenerProcesos = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerProcesos(dbConnect, params)
            
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public crearProceso = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            //TODO: Se desabilito la verificacion si hay un proceso abierto
            // const consultaProcesoAbierto: any[] = await this.procesosRepo.verificarSiHayProcesoAbierto(dbConnect, "")
            // if(consultaProcesoAbierto.length > 0) {
            //     return {ok: true, procesoAbiertoExistente: true, message: 'Ya hay un proceso abierto ahora'}
            // }
            const result = await this.procesosRepo.crearProceso(dbConnect ,params)
            if(result[0].affectedRows > 0) {
                return { ok: true, procesoAbiertoExistente: false, message: 'Proceso llevado exitosamente' }
            }else {
                return { ok: false, procesoAbiertoExistente: false, message: 'Proceso no llevado correctamente' }
            }
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public cerrarProceso = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            params.ESTADO = 0
            const resp = await this.procesosRepo.cerrarProceso(dbConnect, params)
            if(resp[0].affectedRows > 0) {
                return { ok: true, message: 'Proceso llevado exitosamente' }
            }else {
                return { ok: false, message: 'Proceso no llevado correctamente' }
            }
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerInscritosPorSede = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerInscritosPorSede(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerInscritosPorCarrera = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerInscritosPorCarrera(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerInscritosPorArea = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerInscritosPorArea(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerInscritosEstudianteDatos = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerInscritosEstudianteDatos(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerInscritosPorModalidad = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerInscritosPorModalidad(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public abrirProceso = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const resp = await this.procesosRepo.abrirProceso(dbConnect, params)
            if(resp[0].affectedRows > 0) {
                return { ok: true, message: 'Proceso abierto exitosamente' }
            }else {
                return { ok: false, message: 'Proceso no abierto correctamente' }
            }
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public actualizarProceso = async(params: ProcesosInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const resp = await this.procesosRepo.actualizarProceso(dbConnect,  params)
            if(resp[0].affectedRows > 0) {
                return { ok: true, message: 'Proceso abierto exitosamente' }
            }else {
                return { ok: false, message: 'Proceso no abierto correctamente' }
            }
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public generarReporte = async({ID_PROCESO, COD_CARRERA}: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const params: any = {
                ID_PROCESO: ID_PROCESO || '',
                COD_CARRERA: COD_CARRERA || ''
            }
            const resp = await this.procesosRepo.generarReporte(dbConnect, params)
            return resp
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerReporteIngresantesPorProceso = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.procesosRepo.obtenerReporteIngresantesPorProceso(dbConex, params)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
}