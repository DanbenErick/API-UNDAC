CREATE OR REPLACE VIEW vista_obtener_vacantes_proceso_ult_activo AS
SELECT 
	vacantes.ID AS ID,
	procesos.NOMBRE AS NOMBRE_PROCESO,
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
	i.ID
    ,i.DNI
    ,i.COD_CARRERA
    ,i.PROCESO
    ,i.SEDE_EXAM
    ,i.PAGO_1
    ,i.PAGO_2
    ,i.PREPARATORIA
    ,i.YEAR_CONCLU
    ,i.FECHA_REGISTRO
    ,ca.ESCUELA_COMPLETA
    ,po.NOMBRE AS NOMBRE_PROCESO
    ,pg_1.MONTO AS MONTO_1
    ,pg_2.MONTO AS MONTO_2
FROM 
    inscritos i
LEFT JOIN  carreras ca ON ca.CODIGO_ESCUELA = i.COD_CARRERA
LEFT JOIN procesos po ON po.ID = i.PROCESO
LEFT JOIN pagos pg_1 ON pg_1.ID = i.PAGO_1
LEFT JOIN pagos pg_2 ON pg_2.ID = i.PAGO_2;

SELECT * FROM vista_obtener_inscritos_admin ORDER BY ID DESC;