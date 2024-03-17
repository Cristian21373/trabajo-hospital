package com.example.senaHospital.interfaces;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.senaHospital.models.paciente;


public interface IPaciente extends CrudRepository<paciente, String> {

	@Query("SELECT p FROM paciente p WHERE "
			+ "p.tipo_documento LIKE %?1% OR "
			+ "p.numero_documento LIKE %?1% OR "
			+ "p.primer_name LIKE %?1% OR "
			+ "p.segundo_name LIKE %?1% OR "
			+ "p.primer_apellido LIKE %?1% OR "
			+ "p.segundo_apellido LIKE %?1% OR " 
			+ "p.telefono LIKE %?1% OR "
			+ "p.correo LIKE %?1% OR "
			+ "p.nombre_contacto LIKE %?1% OR "
			+ "p.telefono_contacto LIKE %?1% OR "
			+ "p.estado LIKE %?1%")
	List<paciente>filtroPaciente(String filtro);
}
