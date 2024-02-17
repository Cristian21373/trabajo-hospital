package com.example.senaHospital.interfaceService;

import java.util.List;
import java.util.Optional;
import com.example.senaHospital.models.medico;


public interface IMedicoService {
	
	/*
	 * Vamos a definir los metodos del CRUD
	 * Create
	 * Read
	 * Update
	 * Delete
	 */
	
public String save(medico medico);	
public List<medico> findAll();
public Optional<medico> findOne(String id);
public int delete(String id);

}
