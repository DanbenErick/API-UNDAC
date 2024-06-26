import connectMysql from "../../../config/connection.mysqldb";
import { ResultadoGeneralRepository } from "../../../repository/general/resultado/resultado.repo";

export class ResultadosGeneralService {
  public resultadosRepo: ResultadoGeneralRepository;
  public constructor() {
    this.resultadosRepo = new ResultadoGeneralRepository();
  }
  public obtenerResultadosPorCarreraYProceso = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      const result = await this.resultadosRepo.obtenerResultadosPorCarreraYProceso(dbConex, params)
      return result
      // if(result.length > 0) return { ok: true, message: 'Se encontro la inscripcion del estudiante' }
      // return { ok: false, message: 'No se encontro la inscripcion del estudiante' }
    }catch(error) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerResultadoEstudiante = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      const result = await this.resultadosRepo.obtenerResultadoEstudiante(dbConex, params)
      return result 
    }catch(error) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
}
