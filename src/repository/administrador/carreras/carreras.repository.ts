import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class CarrerasRepository {
    public obtenerCarreras = async(connection: any) => {
        try {
            const query = `SELECT * FROM carreras`;
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("CarrerasRepository.obtenerCarreras =>", (error))
            throw error
        }
    }
    public buscarCarreraPorFacultad = async(connection: any, params: CarreraInterface) => {
        try {
            const query = `SELECT * FROM carreras WHERE FACULTAD = '${params.FACULTAD}'`
            //Editar carrera
            // const query = await generarConsulta('carreras', params, `ID = ${params.ID}`)
            // const result = await connection.promise().execute(query, params)
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('CarrerasRepository.CarrerasRepository => ', error)
        }
    }
    public modificarCarrera = async(connection: any, params: CarreraInterface) => {
        try {
            const {ID} = params
            delete params.ID
            const query = await generarConsulta('carreras', params, `ID = ${ID}`)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error('CarreraRepository.modificarCarrera => ', error)
        }
    }
    public crearCarrera = async(connection: any, params: CarreraInterface) => {
        try {
            const query =  await generarConsulta('carreras', params, null)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error('CarrerasRepository.crearCarrera => ', error)
            throw error
        }
    }
}
