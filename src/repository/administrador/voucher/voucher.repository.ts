
import { VoucherInterface } from '../../../interfaces/administrador/voucher.interface'
import { logger } from '../../../resources/manager-log.resource'
import { generarConsulta } from '../../../util/util'

class VoucherRepository {
    public obtenerVouchers = async(connection:any) => {
        try {
            const query = `
                SELECT 
                    pagos.*,
                    CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO
                FROM pagos
                LEFT JOIN registros ON pagos.dni = registros.dni
                ORDER BY ID DESC
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
        const query = `SELECT * FROM pagos WHERE ID_PROCESO LIKE '%${params.ID_PROCESO}%' AND CODIGO LIKE '%${params.CODIGO}%' AND DNI LIKE '%${params.DNI}%'`
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