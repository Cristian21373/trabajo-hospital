package com.example.senaHospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.senaHospital.interfaceService.I_IngresoService;
import com.example.senaHospital.interfaces.I_Ingreso;
import com.example.senaHospital.models.ingreso;

@Service

public class ingresoService implements I_IngresoService{

	@Autowired
	private I_Ingreso data;

	@Override
	public String save(ingreso ingreso) {
		data.save(ingreso);
		return ingreso.getId();
	}

	@Override
	public List<ingreso> findAll() {
		List<ingreso> listaingreso=(List<ingreso>) data.findAll();
		//(List<client>) es un cast ya que
		//findAll() retorna un objeto distinto
		//retorna iterable<ingreso>
		//se convierte a list<ingreso>
		return listaingreso;
	}
	
	@Override
	public List<ingreso> filtroIngreso(String filtro) {
		List <ingreso> listaIngreso=data.filtroIngreso(filtro);
		return listaIngreso;
	}
	
	@Override
	public Optional<ingreso> findOne(String id) {
		Optional<ingreso> ingreso=data.findById(id);
		return ingreso;
	}

	@Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}
	
	
}
