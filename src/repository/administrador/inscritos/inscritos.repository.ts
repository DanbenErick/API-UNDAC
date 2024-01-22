import { InscritosInterface } from "../../../interfaces/administrador/inscritos.interface";
import { logger } from "../../../resources/manager-log.resource";
import { generarConsulta } from "../../../util/util";

export class InscritosRepository {
  public obtenerInscritos = async (connection: any) => {
    try {
      const query = `SELECT * FROM vista_obtener_inscritos_admin ORDER BY ID DESC`;
      const [rows]: any = await connection.promise().query(query);
      return rows;
    } catch (error) {
      logger.error("InscritosRepository.obtenerInscritos =>", error);
      throw error;
    }
  };
  public buscarInscritos = async (
    connection: any,
    params: InscritosInterface
  ) => {
    try {
      const query = `SELECT * FROM vista_obtener_inscritos_admin WHERE PROCESO LIKE '%${params.PROCESO}%' AND DNI LIKE '%${params.DNI}%' AND COD_CARRERA LIKE '%${params.COD_CARRERA}%' AND SEDE_EXAM LIKE '%${params.SEDE_EXAM}%' ORDER BY ID DESC`;
      const [rows]: any = await connection.promise().query(query);
      return rows;
    } catch (error) {
      logger.error("InscritosRepository.buscarInscritos =>", error);
      throw error;
    }
  };
  public modificarInscritos = async (
    connection: any,
    params: InscritosInterface
  ) => {
    try {
      const { ID } = params;
      delete params.ID;
      const query = await generarConsulta("inscritos",params,` ID = ${ID}`);
      const data = Object.values(params);
      const resp = await connection.promise().execute(query, data);
      return resp;
    } catch (error) {
      logger.error("InscritosRepository.modificarInscritos =>", error);
      throw error;
    }
  };
  public inscribirEstudiante = async (connection: any,params: InscritosInterface) => {
    try {
      const query = await generarConsulta("inscritos",params, null);
      const data = Object.values(params);
      const resp = await connection.promise().execute(query, data);
      return resp;
    } catch (error) {
      logger.error("InscritosRepository.inscribirEstudiante =>", error);
      throw error;
    }
  }
}
