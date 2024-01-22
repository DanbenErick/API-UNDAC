import { AulasInterface } from '../../../interfaces/administrador/aulas.interface';
import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class AulasRepository {
    public obtenerAulas = async(connection: any) => {
        try {
            const query = `
            SELECT 
                aulas.*, 
                procesos.NOMBRE AS NOMBRE_PROCESO,
                CONCAT(COUNT(inscritos.ID_AULA), ' / ', aulas.CAPACIDAD) AS INSCRITOS_CAPACIDAD
            FROM aulas 
            LEFT JOIN procesos ON aulas.ID_PROCESO = procesos.ID 
            LEFT JOIN inscritos ON aulas.ID = inscritos.ID_AULA
            GROUP BY aulas.ID
            ORDER BY aulas.ID DESC;
            `;
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("AulasRepository.obtenerAulas =>", (error))
            throw error
        }
    }
    public buscarAulas = async(connection: any, params: AulasInterface) => {
      try {
        const query = `
        SELECT 
            aulas.*, 
            aulas.ID AS AULA_ID, 
            procesos.NOMBRE AS NOMBRE_PROCESO, 
            CONCAT(COUNT(inscritos.ID_AULA), ' / ', aulas.CAPACIDAD) AS INSCRITOS_CAPACIDAD
        FROM 
            aulas
        LEFT JOIN 
            procesos ON aulas.ID_PROCESO = procesos.ID
        LEFT JOIN 
            inscritos ON aulas.ID = inscritos.ID_AULA
        WHERE 
            aulas.ID_PROCESO LIKE '%${params.ID_PROCESO}%'
            AND aulas.NOMBRE_AULA LIKE '%${params.NOMBRE_AULA}%' 
            AND aulas.CAPACIDAD LIKE '%${params.CAPACIDAD}%'
            AND aulas.TURNO LIKE '%${params.TURNO}%'
        GROUP BY 
            aulas.ID
        ORDER BY 
            aulas.ID DESC;
    
        `;
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error("AulasRepository.buscarAulas =>", (error))
        throw error
      }
    }
    public registarNuevaAula = async(connection: any, params: AulasInterface) => {
      try {
        const query = await generarConsulta('aulas', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('AulasRepository.registrarNuevaAula =>', error)
        throw error
      }
    }
    public cerrarAula = async(connection: any, params:AulasInterface) => {
      try {
        const query = `UPDATE aulas SET OCUPADO = 1 WHERE ID = ${params.ID}`
        const resp = await connection.promise().query(query)
        return resp
      }catch(error) {
        logger.error('AulasRepository.cerrarAula =>', error)
        throw error
      }
    }
    public abrirAula = async(connection: any, params:AulasInterface) => {
      try {
        const query = `UPDATE aulas SET OCUPADO = 0 WHERE ID = ${params.ID}`
        const resp = await connection.promise().query(query)
        return resp
      }catch(error) {
        logger.error('AulasRepository.abrirAula =>', error)
        throw error
      }
    }
    public modificarAula = async(connection: any, params: AulasInterface) => {
      try {
        const ID = params.ID
        delete params.ID
        const query = await generarConsulta('aulas', params, `ID = ${ID}`)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('AulasRepository.modificarAula => ', error)
        throw error
      }
    }
    public verificarSiHayAulaDisponible = async(connection: any, params: AulasInterface) => {
      try {
        const query = `SELECT aulas.id
        FROM aulas
        JOIN procesos ON aulas.ID_PROCESO = procesos.ID
        WHERE aulas.ocupado = false AND
          aulas.ID_PROCESO = '${params.ID_PROCESO}' AND
          procesos.estado = true
        ORDER BY aulas.id ASC
        LIMIT 1`
        const [rows]: any = connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('AulasRepository.verificarSiHayAulaDisponible => ', error)
        throw error
      }
    }
    public obtenerEstudiantesPorAula = async(connection: any, params:any) => {
      try {
        const query = `
                SELECT
                  reg.DNI,
                  CONCAT(reg.AP_PATERNO ,' ' , reg.AP_MATERNO, ' ', reg.NOMBRES) AS NOMBRE_COMPLETO,
                  reg.CELULAR,
                  dat_c.CELULAR_APO AS CELULAR_APODERADO
                FROM inscritos ins
                LEFT JOIN registros reg ON reg.DNI = ins.DNI
                LEFT JOIN dat_complementarios dat_c ON dat_c.DNI = ins.DNI
                LEFT JOIN aulas au ON au.ID = ins.ID_AULA
                WHERE au.ID = ${params.ID_AULA}`
                console.log('Query ejecutado:', connection.format(query, params));
                console.log('Query ejecutado 2:', query);
        const [rows] = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('AulasRepository.obtenerEstudiantesPorAula => ', error)
        throw error
      }
    }
}
