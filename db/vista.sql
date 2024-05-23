CREATE OR REPLACE VIEW vista_obtener_vacantes_proceso_ult_activo AS
SELECT 
	vacantes.ID AS ID,
	procesos.NOMBRE AS NOMBRE_PROCESO,
    carreras.ID AS ID_CARRERA,
    carreras.ESCUELA_COMPLETA AS NOMBRE_ESCUELA,
    pc.NOMBRE AS NOMBRE_MODALIDAD,
    vacantes.CANTIDAD AS CANTIDAD,
    carreras.AREA AS AREA,
    vacantes.ID_PROCESO as ID_PROCESO,
    procesos.ESTADO as ESTADO
from vacantes
    left join procesos on procesos.ID = vacantes.ID_PROCESO
    left join carreras on carreras.ID = vacantes.ID_CARRERA
	LEFT JOIN opc_modalidades pc ON pc.ID = vacantes.ID_MODALIDAD;

CREATE OR REPLACE VIEW vista_obtener_inscritos_admin AS 
SELECT
    CONCAT(re.AP_MATERNO, ' ', re.AP_MATERNO, ' ', re.NOMBRES) AS NOMBRE_COMPLETO,
    re.UUID,
	i.*,
    ,ca.ESCUELA_COMPLETA
    ,po.NOMBRE AS NOMBRE_PROCESO,
    po.ID AS ID_PROCESO
FROM 
    inscritos i
LEFT JOIN registros re ON re.DNI = i.DNI
LEFT JOIN carreras ca ON ca.CODIGO_ESCUELA = i.COD_CARRERA OR ca.OLD_COD_CARRERA = i.COD_CARRERA
LEFT JOIN procesos po ON po.ID = i.PROCESO;

SELECT * FROM vista_obtener_inscritos_admin ORDER BY ID DESC;


CREATE OR REPLACE VIEW vista_obtener_inscritos_admin AS 
SELECT 
	i.ID
    ,i.DNI
    ,i.COD_CARRERA
    ,i.PROCESO
    ,i.SEDE_EXAM
    ,i.PREPARATORIA
    ,i.YEAR_CONCLU
    ,i.FECHA_REGISTRO
    ,ca.ESCUELA_COMPLETA
    ,po.NOMBRE AS NOMBRE_PROCESO
    ,CONCAT(re.AP_PATERNO, ' ', re.AP_MATERNO, ' ', re.NOMBRES) AS NOMBRE_COMPLETO
FROM 
    inscritos i
LEFT JOIN carreras ca ON ca.CODIGO_ESCUELA = i.COD_CARRERA
LEFT JOIN procesos po ON po.ID = i.PROCESO
LEFT JOIN registros re ON re.DNI = i.DNI;

CREATE OR REPLACE view_padron_estudiantes
AS
SELECT i.DNI AS DNI,
       r.AP_PATERNO AS AP_PATERNO,
       r.AP_MATERNO AS AP_MATERNO,
       r.NOMBRES AS NOMBRES,
       c.ESCUELA_COMPLETA AS ESCUELA_COMPLETA,
       c.AREA AS AREA,
       om.NOMBRE AS NOMBRE_MODALIDAD,
       i.PROCESO AS ID_PROCESO,
       i.SEDE_EXAM AS SEDE_EXAM,
FROM inscritos i
    LEFT JOIN registros r on r.DNI = i.DNI
    LEFT JOIN carreras c on c.CODIGO_ESCUELA = i.COD_CARRERA
    LEFT JOIN opc_modalidades om on om.ID = i.ID_TIPO_MODALIDAD


CREATE OR REPLACE vista_datos_generales_estudiante_qr
AS
SELECT registros.dni AS DNI,
    registros.uuid AS UUID,
    CONCAT(registros.ap_paterno, ' ', registros.ap_materno, ' ', registros.nombres) AS NOMBRE_COMPLETO,
    registros.ap_paterno AS AP_PATERNO,
    registros.ap_materno AS AP_MATERNO,
    registros.nombres AS NOMBRES,
    carreras.escuela_completa AS ESCUELA_COMPLETA,
    carreras.area AS AREA,
        
    inscritos.sede_exam AS SEDE_EXAMEN,
    pagos.monto AS MONTO
FROM registros
    LEFT JOIN inscritos ON inscritos.dni = registros.dni
    LEFT JOIN carreras ON carreras.codigo_escuela = inscritos.cod_carrera
    
    LEFT JOIN pagos ON pagos.dni = inscritos.dni 