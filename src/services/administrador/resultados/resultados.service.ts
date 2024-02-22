
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
    
}