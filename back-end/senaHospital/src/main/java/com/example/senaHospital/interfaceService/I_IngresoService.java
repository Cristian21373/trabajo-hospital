package com.example.senaHospital.interfaceService;

import java.util.List;
import java.util.Optional;
import com.example.senaHospital.models.ingreso;


public interface I_IngresoService {
	
	/*
	 * Vamos a definir los metodos del CRUD
	 * Create
	 * Read
	 * Update
	 * Delete
	 */
	
public String save(ingreso medico);	
public List<ingreso> findAll();
public Optional<ingreso> findOne(String id);
public int delete(String id);

}
