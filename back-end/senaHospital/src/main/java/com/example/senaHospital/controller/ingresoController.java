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

import com.example.senaHospital.interfaceService.I_IngresoService;
import com.example.senaHospital.models.ingreso;



@RequestMapping("/api/v1/ingreso")
@RestController
@CrossOrigin
public class ingresoController {
	
	@Autowired
	private I_IngresoService ingresoService;
	
	 @PostMapping("/")
	    public ResponseEntity<Object> save(@ModelAttribute("ingreso") ingreso ingreso) {

	        try {
	            ingresoService.save(ingreso);
	            return new ResponseEntity<>(ingreso, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Error en el formato de fecha", HttpStatus.BAD_REQUEST);
	        }
	    }

	    
	
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var listaingreso=ingresoService.findAll();
		return new ResponseEntity<>(listaingreso,HttpStatus.OK);
	}
	
	//@PathVariable recibe una variable por el enlace
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var ingreso=ingresoService.findOne(id);
		return new ResponseEntity<>(ingreso,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		ingresoService.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable("id") String id, @ModelAttribute("ingreso") ingreso ingresoUpdate){
		var ingreso= ingresoService.findOne(id).get();
		if (ingreso != null) {
			ingreso.setPaciente(ingresoUpdate.getPaciente());
			ingreso.setMedico(ingresoUpdate.getMedico());
			ingreso.setHabitacion(ingresoUpdate.getHabitacion());
			ingreso.setCama(ingresoUpdate.getCama());
			ingreso.setFechaIngreso(ingresoUpdate.getFechaIngreso());
			ingreso.setFechaSalida(ingresoUpdate.getFechaSalida());
			ingreso.setEstado(ingresoUpdate.getEstado());
			
		
			ingresoService.save(ingreso);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error ingreso no valido",HttpStatus.BAD_REQUEST);
		}
		
		
	}

}
