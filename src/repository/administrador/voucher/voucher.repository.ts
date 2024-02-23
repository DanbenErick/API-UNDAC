
import { VoucherInterface } from '../../../interfaces/administrador/voucher.interface'
import { logger } from '../../../resources/manager-log.resource'
import { generarConsulta } from '../../../util/util'

class VoucherRepository {
    public obtenerVouchers = async(connection:any) => {
        try {
            const query = `
                SELECT 
                    pagos.*,
                    CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
                    procesos.NOMBRE AS NOMBRE_PROCESO
                FROM pagos
                LEFT JOIN registros ON pagos.dni = registros.dni
                LEFT JOIN procesos ON procesos.ID = pagos.ID_PROCESO
                ORDER BY ID DESC
                LIMIT 20
            `
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VoucherRepository.obtenerVouchers => ', error)
            throw error
        }
    }
    public buscarEstudianteParaVoucher = async(connection: any, params: VoucherInterface) => {
        try {
            const query = `SELECT CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) AS NOMBRE_COMPLETO FROM registros WHERE DNI LIKE '%${params.DNI}%'`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VoucherRepository.buscarEstudianteParaVoucher => ', error)
            throw error
        }
    }
    public buscarVoucher = async(connection: any, params: VoucherInterface) => {
      try {
        const query = `SELECT 
            pagos.*,  
            CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
            procesos.NOMBRE AS NOMBRE_PROCESO
            FROM pagos 
            LEFT JOIN registros ON pagos.dni = registros.dni
            LEFT JOIN procesos ON procesos.ID = pagos.ID_PROCESO
            WHERE pagos.ID_PROCESO LIKE '%${params.ID_PROCESO}%' 
            AND pagos.CODIGO LIKE '%${params.CODIGO}%' 
            AND pagos.DNI LIKE '%${params.DNI}%'`
        console.log("QUERY => ", query)
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('VoucherRepository.buscarVoucher => ', error)
        throw error
      }
    }
    public crearVoucher = async(connection: any, params: VoucherInterface) => {
        try {
            const query = await generarConsulta('pagos', params, null)
            const data = Object.values(params)
            console.log(query, data)
            const resp = await connection.promise().execute(query, data)
            return resp
        }catch(error: any) {
            logger.error('VoucherRepository.crearVoucher => ', error)
            throw error
        }
    }
    
}

export default VoucherRepository