
import connectMysql from '../../../config/connection.mysqldb'
import bcrypt from 'bcrypt'
import { EstudianteCompleto } from '../../../interfaces/administrador/EstudianteCompleto.interface'
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface'
import { EstudianteRepository } from '../../../repository/administrador/estudiantes/estudiantes.repository'



export class EstudiantesService {
    
    public estudianteRepo: EstudianteRepository
    public constructor() {
        this.estudianteRepo = new EstudianteRepository()
        
    }

    public obtenerEstudiantes = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.estudianteRepo.obtenerEstudiantes(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public buscarCarreraPorFacultad = async(params: EstudianteInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.estudianteRepo.buscarEstudiante(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public modificarEstudiante = async(params: EstudianteInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const [result] = await this.estudianteRepo.modificarEstudiante(dbConex, params)
            if(result.affectedRows > 0) return { ok: true, message: 'Se modifico correctamente' }
            return { ok: false, message: 'No se pudo modificar' }
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public registrarEInscribirEstudiante = async(params: EstudianteCompleto) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const salt = await bcrypt.genSalt(10);
            
            const password_encript: any = await bcrypt.hash(params.DNI || '', salt);
            console.log("Contrrasela", password_encript)
            params.PASSWORD = password_encript
            const data: any = [
                params.DNI || '',
                params.AP_PATERNO || '',
                params.AP_MATERNO || '',
                params.NOMBRES || '',
                params.CELULAR_EST || '',
                params.CORREO || '',
                params.PASSWORD || '',
                params.SEXO || '',
                params.FECHA_NACIMIENTO || '',
                params.LUGAR_RESIDENCIA || '',
                params.DIRECCION || '',
                params.DISCAPACIDAD || '',
                params.TIPO_DISCAPACIDAD || '',
                params.ETNICA || '',
                params.TELEFONO || '',
                params.RUTA_FOTO || '',
                params.NOMBRE_COLEGIO || '',
                params.TIPO_COLEGIO || '',
                params.NOMBRE_COMPLETO_APO || '',
                params.CELULAR_APO || '',
                params.DNI_APO || '',
                params.COD_CARRERA || '',
                params.PROCESO || '',
                params.SEDE_EXAM || '',
                params.PAGO_1 || '0',
                params.PAGO_2 || '0',
                params.PREPARATORIA || '',
                params.ID_AULA || null,
                params.YEAR_CONCLU || '',
            ]
            console.log("DATA => ", data)
            const [result] = await this.estudianteRepo.registrarEInscribirEstudiante(dbConex, data)
            console.log(result)
            if(result.affectedRows > 0) return { ok: true, message: 'Se registró correctamente' }
            return { ok: false, message: 'No se pudo registrar' }
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    
    
}