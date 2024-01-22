	
	DELIMITER //
	DROP PROCEDURE IF EXISTS InscribirEstudianteRolEstudiante;
	CREATE PROCEDURE InscribirEstudianteRolEstudiante (
	  IN DNI varchar(10),
	  IN COD_CARRERA varchar(50),
	  IN PROCESO varchar(50),
	  IN SEDE_EXAM varchar(50),
	  IN PAGO_1 varchar(50),
	  IN PAGO_2 varchar(50),
	  IN PREPARATORIA varchar(50),
	  IN ID_AULA varchar(50),
	  IN ID_TIPO_MODALIDAD varchar(50),
	  IN YEAR_CONCLU varchar(50),
	  IN SEXO varchar(50),
	  IN FECHA_NACIMIENTO varchar(50),
	  IN LUGAR_RESIDENCIA varchar(50),
	  IN DIRECCION varchar(50),
	  IN DISCAPACIDAD varchar(50),
	  IN TIPO_DISCAPACIDAD varchar(50),
	  IN ETNICA varchar(50),
	  IN CELULAR varchar(50),
	  IN TELEFONO varchar(50),
	  IN RUTA_FOTO varchar(50),
	  IN NOMBRE_COLEGIO varchar(50),
	  IN TIPO_COLEGIO varchar(50),
	  IN NOMBRE_COMPLETO_APO varchar(50),
	  IN CELULAR_APO varchar(50),
	  IN DNI_APO varchar(50),
	  IN IN_DEPARTAMENTO VARCHAR(50),
	  IN IN_PROVINCIA VARCHAR(50),
	  IN IN_DISTRITO VARCHAR(50)
	)
	BEGIN
	
	  DECLARE ubicacion_por_distrito VARCHAR(40);
	  
	
	   DECLARE datos_complementarios_existente INT;
	   DECLARE estudiante_inscrito INT;
	   SELECT UBIGEO INTO ubicacion_por_distrito FROM ubicaciones WHERE DEPARTAMENTO = IN_DEPARTAMENTO AND PROVINCIA = IN_PROVINCIA AND DISTRITO = IN_DISTRITO;	   
		SELECT COUNT(*) INTO datos_complementarios_existente FROM dat_complementarios WHERE dat_complementarios.DNI = DNI;
	  
	   -- Insertar datos en la tabla datos_complementarios
		IF datos_complementarios_existente = 0 THEN
			INSERT INTO dat_complementarios 
				(DNI, SEXO, FECHA_NACIMIENTO, LUGAR_RESIDENCIA, DIRECCION, DISCAPACIDAD, TIPO_DISCAPACIDAD, ETNICA, CELULAR, TELEFONO, RUTA_FOTO, NOMBRE_COLEGIO, TIPO_COLEGIO, NOMBRE_COMPLETO_APO, CELULAR_APO, DNI_APO)
			VALUES 
				(DNI, SEXO, FECHA_NACIMIENTO, ubicacion_por_distrito, DIRECCION, DISCAPACIDAD, TIPO_DISCAPACIDAD, ETNICA, CELULAR, TELEFONO, RUTA_FOTO, NOMBRE_COLEGIO, TIPO_COLEGIO, NOMBRE_COMPLETO_APO, CELULAR_APO, DNI_APO);
		ELSE
        SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Usuario con DNI existente en registro';
		END IF;

	

		
		SELECT COUNT(*) INTO estudiante_inscrito FROM inscritos WHERE inscritos.DNI = DNI AND inscritos.PROCESO = PROCESO;
		
		
		-- Insertar datos en la tabla de inscritos
		IF estudiante_inscrito = 0 THEN
			INSERT INTO inscritos 
				(DNI, COD_CARRERA, PROCESO, SEDE_EXAM, PAGO_1, PAGO_2, PREPARATORIA, ID_AULA, ID_TIPO_MODALIDAD, YEAR_CONCLU)
			VALUES 
				(DNI, COD_CARRERA, PROCESO, SEDE_EXAM, PAGO_1, PAGO_2, PREPARATORIA, ID_AULA, ID_TIPO_MODALIDAD, YEAR_CONCLU);
		ELSE
        SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Usuario con DNI existente en registro';
		END IF;
	END //
	
	DELIMITER ;
SELECT * FROM inscritos;inscritos