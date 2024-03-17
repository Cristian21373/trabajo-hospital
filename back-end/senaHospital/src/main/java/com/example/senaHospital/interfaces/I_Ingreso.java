package com.example.senaHospital.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.senaHospital.models.ingreso;

public interface I_Ingreso extends CrudRepository<ingreso,String>{
	
	
	@Query("SELECT i FROM ingreso i JOIN "
			+"i.medico m "
			+"JOIN i.paciente p "
			+"WHERE p.primer_name like %?1% "
			+"OR p.segundo_name LIKE %?1% "
			+"OR p.primer_apellido LIKE %?1% "
			+"OR p.segundo_apellido LIKE %?1% "
			+"OR m.primer_name LIKE %?1% "
			+"OR m.segundo_name LIKE %?1% "
			+"OR m.primer_apellido LIKE %?1% "
			+"OR m.segundo_apellido LIKE %?1% "
			+"OR i.fecha_ingreso=  ?1 "
			+"OR i.fecha_salida= ?1 "
			+"OR i.estado LIKE %?1%")
	List<ingreso>filtroIngreso (String filtro);
	/*
	 * Imcluye las funciones basicas del CRUD
	*/
	
}
