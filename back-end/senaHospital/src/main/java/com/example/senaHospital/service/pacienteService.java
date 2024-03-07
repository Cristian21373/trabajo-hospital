package com.example.senaHospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.senaHospital.interfaceService.IPacienteService;
import com.example.senaHospital.interfaces.IPaciente;
import com.example.senaHospital.models.paciente;

@Service
public class pacienteService implements IPacienteService {

	@Autowired
	private IPaciente data;
	
	@Override
	public String save(paciente paciente) {
		data.save(paciente);
		return paciente.getId();
	}

	@Override
	public List<paciente> findAll() {
		List<paciente> listaPaciente=(List<paciente>) data.findAll();
		return listaPaciente;
	}

	@Override
	public Optional<paciente> findOne(String id) {
		Optional<paciente> paciente=data.findById(id);
		return paciente;
	}

	@Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

    
    
}
