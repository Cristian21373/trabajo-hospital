package com.example.senaHospital.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class paciente {
	 
	@Id
	@GeneratedValue(strategy =GenerationType.UUID)
	@Column(name="id", nullable=false, length = 36)
	private String id;
    
	@Column(name="tipo_documento", nullable=false, length = 2)
	private String tipo_documento;
	
	@Column(name="numero_documento", nullable=false, length = 11)
	private String numero_documento;
	
	@Column(name="primer_name", nullable=false, length = 20)
	private String primer_name;
	
	
	@Column(name="segundo_name", nullable=true, length = 20)
	private String segundo_name;
	
	@Column(name="primer_apellido", nullable=false, length = 20)
	private String primer_apellido;
	
	
	@Column(name="segundo_apellido", nullable=true, length = 20)
	private String segundo_apellido;
	
	
	@Column(name="telefono", nullable=false, length = 15)
	private String telefono;
	
	
	@Column(name="correo", nullable=false, length = 200)
	private String correo;
	
	
	@Column(name="nombre_contacto", nullable=false, length = 20)
	private String nombre_contacto;
	
	@Column(name="telefono_contacto", nullable=false, length = 15)
	private String telefono_contacto;
	

	@Column(name = "estado", nullable = false, length = 13)
	private String estado;


	public paciente() {
		super();
	}


	public paciente(String id, String tipo_documento, String numero_documento, String primer_name, String segundo_name,
			String primer_apellido, String segundo_apellido, String telefono, String correo, String nombre_contacto,
			String telefono_contacto, String estado) {
		super();
		this.id = id;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.primer_name = primer_name;
		this.segundo_name = segundo_name;
		this.primer_apellido = primer_apellido;
		this.segundo_apellido = segundo_apellido;
		this.telefono = telefono;
		this.correo = correo;
		this.nombre_contacto = nombre_contacto;
		this.telefono_contacto = telefono_contacto;
		this.estado = estado;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getTipo_documento() {
		return tipo_documento;
	}


	public void setTipo_documento(String tipo_documento) {
		this.tipo_documento = tipo_documento;
	}


	public String getNumero_documento() {
		return numero_documento;
	}


	public void setNumero_documento(String numero_documento) {
		this.numero_documento = numero_documento;
	}


	public String getPrimer_name() {
		return primer_name;
	}


	public void setPrimer_name(String primer_name) {
		this.primer_name = primer_name;
	}


	public String getSegundo_name() {
		return segundo_name;
	}


	public void setSegundo_name(String segundo_name) {
		this.segundo_name = segundo_name;
	}


	public String getPrimer_apellido() {
		return primer_apellido;
	}


	public void setPrimer_apellido(String primer_apellido) {
		this.primer_apellido = primer_apellido;
	}


	public String getSegundo_apellido() {
		return segundo_apellido;
	}


	public void setSegundo_apellido(String segundo_apellido) {
		this.segundo_apellido = segundo_apellido;
	}


	public String getTelefono() {
		return telefono;
	}


	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}


	public String getCorreo() {
		return correo;
	}


	public void setCorreo(String correo) {
		this.correo = correo;
	}


	public String getNombre_contacto() {
		return nombre_contacto;
	}


	public void setNombre_contacto(String nombre_contacto) {
		this.nombre_contacto = nombre_contacto;
	}


	public String getTelefono_contacto() {
		return telefono_contacto;
	}


	public void setTelefono_contacto(String telefono_contacto) {
		this.telefono_contacto = telefono_contacto;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
}
