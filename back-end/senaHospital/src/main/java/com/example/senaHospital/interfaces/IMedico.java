package com.example.senaHospital.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.example.senaHospital.models.medico;

public interface IMedico extends CrudRepository<medico,String>{

	/*
	 * Imcluye las funciones basicas del CRUD
	*/
	
}
