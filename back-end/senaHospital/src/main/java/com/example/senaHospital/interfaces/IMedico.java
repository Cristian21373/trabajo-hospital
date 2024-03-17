package com.example.senaHospital.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.senaHospital.models.medico;

@Repository

public interface IMedico extends CrudRepository<medico,String>{
	
	
	@Query("SELECT m FROM medico m WHERE "
			+ "m.tipo_documento LIKE %?1% OR "
			+ "m.numero_documento LIKE %?1% OR "
			+ "m.primer_name LIKE %?1% OR "
			+ "m.segundo_name LIKE %?1% OR "
			+ "m.primer_apellido LIKE %?1% OR "
			+ "m.segundo_apellido LIKE %?1% OR "
			+ "m.telefono LIKE %?1% OR "
			+ "m.correo LIKE %?1% OR "
			+ "m.estado LIKE %?1%")
	
	List<medico>filtroMedico (String filtro);
   
    /*
     * Incluye las funciones básicas del CRUD
    */
    
}
