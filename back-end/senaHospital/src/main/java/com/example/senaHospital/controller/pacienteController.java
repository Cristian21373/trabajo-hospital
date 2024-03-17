package com.example.senaHospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.senaHospital.interfaceService.IPacienteService;
import com.example.senaHospital.models.paciente;


@RequestMapping("/api/v1/paciente/")
@RestController
@CrossOrigin

public class pacienteController {
	
	@Autowired
	private IPacienteService pacienteService;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(
			@ModelAttribute("paciente")paciente paciente
			){
		pacienteService.save(paciente);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
		
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var ListaPacientes=pacienteService.findAll();
		return new ResponseEntity<>(ListaPacientes,HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaPaciente = pacienteService.filtroPaciente(filtro);
		return new ResponseEntity<>(ListaPaciente, HttpStatus.OK);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var paciente=pacienteService.findOne(id);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
	}
	
	@GetMapping("/editarPaciente/{id}")
	public String mostrarFormularioDeEditarPaciente(@PathVariable("id") String id, @ModelAttribute("paciente") paciente pacienteUpdate) {
	    // Lógica para obtener el paciente por ID y agregarlo al modelo
	    return "formularioEditarPaciente";  // El nombre de la página Thymeleaf para el formulario de edición
	}

	@PostMapping("/editarPaciente/{id}")
	public String actualizarPaciente(@PathVariable("id") String id, @ModelAttribute("paciente") paciente pacienteUpdate) {
	    // Lógica para actualizar el paciente en la base de datos
	    return "redirect:/listaPacientes";  // Redirigir a la lista de pacientes después de la edición
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		pacienteService.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable("id") String id, @ModelAttribute("paciente") paciente pacienteUpdate){
		var paciente= pacienteService.findOne(id).get();
		if (paciente != null) {
			paciente.setTipo_documento(pacienteUpdate.getTipo_documento());
			paciente.setNumero_documento(pacienteUpdate.getNumero_documento());
			paciente.setPrimer_name(pacienteUpdate.getPrimer_name());
			paciente.setSegundo_name(pacienteUpdate.getSegundo_name());
			paciente.setPrimer_apellido(pacienteUpdate.getPrimer_apellido());
			paciente.setSegundo_apellido(pacienteUpdate.getSegundo_apellido());
			paciente.setTelefono(pacienteUpdate.getTelefono());
			paciente.setCorreo(pacienteUpdate.getCorreo());
			paciente.setNombre_contacto(pacienteUpdate.getNombre_contacto());
			paciente.setTelefono_contacto(pacienteUpdate.getTelefono_contacto());
			paciente.setEstado(pacienteUpdate.getEstado());
			
			pacienteService.save(paciente);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error paciente no encontrado",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	

}
