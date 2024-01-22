
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
}