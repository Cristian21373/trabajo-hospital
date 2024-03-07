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

import com.example.senaHospital.interfaceService.IMedicoService;
import com.example.senaHospital.models.medico;

@RequestMapping("/api/v1/medico")
@RestController
@CrossOrigin
public class medicoController {
	
	@Autowired
	private IMedicoService medicoService;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(
			
			@ModelAttribute("medico")medico medico
			){
		
		medicoService.save(medico);
		return new ResponseEntity<>(medico,HttpStatus.OK);
		
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var listaMedicos=medicoService.findAll();
		return new ResponseEntity<>(listaMedicos,HttpStatus.OK);
	}
	
	//@PathVariable recibe una variable por el enlace
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var medico=medicoService.findOne(id);
		return new ResponseEntity<>(medico,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
	medicoService.delete(id);
	return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	//@DeleteMapping("/api/v1/medico/{id}")
	//public ResponseEntity<String> eliminarMedico(@PathVariable String id) {
	//medicoService.delete(id);
	//return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	    
	//}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable("id") String id, @ModelAttribute("medico") medico medicoUpdate){
		var medico= medicoService.findOne(id).get();
		if (medico != null) {
			medico.setTipo_documento(medicoUpdate.getTipo_documento());
			medico.setNumero_documento(medicoUpdate.getNumero_documento());
			medico.setPrimer_name(medicoUpdate.getPrimer_name());
			medico.setSegundo_name(medicoUpdate.getSegundo_name());
			medico.setPrimer_apellido(medicoUpdate.getPrimer_apellido());
			medico.setSegundo_apellido(medicoUpdate.getSegundo_apellido());
			medico.setTelefono(medicoUpdate.getTelefono());
			medico.setCorreo(medicoUpdate.getCorreo());
			medico.setEstado(medicoUpdate.getEstado());
			
			medicoService.save(medico);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error medico no encontrado",HttpStatus.BAD_REQUEST);
		}
		
		
	}

}
