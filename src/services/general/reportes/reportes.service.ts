import connectMysql from "../../../config/connection.mysqldb";
import { ReportesGeneralRepository } from "../../../repository/general/reportes/reportesGeneral.repo";

export class ReporteService {
  public reporteRepo: ReportesGeneralRepository;
  public constructor() {
    this.reporteRepo = new ReportesGeneralRepository();
  }
  public obtenerPrimerosPuestos = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      params = {
        PROCESO: params.PROCESO || '',
        COD_CARRERA: params.COD_CARRERA || '',
      }
      const result: [] = await this.reporteRepo.obtenerPrimerosPuestos(dbConex, params)
      return result 
      // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
      // return { ok: false, message: 'No se encontro los datos complementarios' }
      
    }catch(error) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerPagos = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      const result: [] = await this.reporteRepo.obtenerPagos(dbConex, params)
      return result 
      // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
      // return { ok: false, message: 'No se encontro los datos complementarios' }
      
    }catch(error) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerEstudiatesPorAula = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      const result: [] = await this.reporteRepo.obtenerEstudiatesPorAula(dbConex, params)
      return result 
      // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
      // return { ok: false, message: 'No se encontro los datos complementarios' }
      
    }catch(error) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerInscritosPorProceso = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      params = {
        PROCESO: params.PROCESO || '',
        COD_CARRERA: params.COD_CARRERA || '',
      }
      const result = await this.reporteRepo.obtenerInscritosPorProceso(dbConex, params)
      return result
    }catch(err) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerReporteInscritosPorCarreras = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      params = {
        PROCESO: params.PROCESO || '',
        COD_CARRERA: params.COD_CARRERA || '',
      }
      const result = await this.reporteRepo.obtenerReporteInscritosPorCarreras(dbConex, params)
      return result
    }catch(err) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public obtenerReporteInscritosPorSede = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      params = {
        PROCESO: params.PROCESO || '',
        COD_CARRERA: params.COD_CARRERA || '',
      }
      const result = await this.reporteRepo.obtenerReporteInscritosPorSede(dbConex, params)
      return result
    }catch(err) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
  public registrarLog = async(params: any) => {
    const dbConex: any = await connectMysql.connectMysql()
    try {
      const result = await this.reporteRepo.registrarLog(dbConex, params)
      return result
    }catch(err) {
      await dbConex.rollback()
    }finally {
      await dbConex.close()
    }
  }
}