package com.example.senaHospital.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.example.senaHospital.models.ingreso;

public interface I_Ingreso extends CrudRepository<ingreso,String>{

	/*
	 * Imcluye las funciones basicas del CRUD
	*/
	
}
