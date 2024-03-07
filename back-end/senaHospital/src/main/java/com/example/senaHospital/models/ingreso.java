package com.example.senaHospital.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "Ingresos")
public class ingreso {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "paciente", nullable = false)
    private paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico", nullable = false)
    private medico medico;


    @Column(name = "habitacion", nullable = false)
    private String habitacion;

    @Column(name = "cama", nullable = false)
    private String cama;

  
    @Column(name = "fecha_ingreso", nullable = false)
    private String fechaIngreso;

  
    @Column(name = "fecha_salida", nullable = false)
    private String fechaSalida;

	@Column(name="estado", nullable=false, length = 13)
	private String estado;
	
	public ingreso() {
		super();
	}

	public ingreso(String id, paciente paciente, medico medico, String habitacion, String cama, String fechaIngreso,
			String fechaSalida, String estado) {
		super();
		this.id = id;
		this.paciente = paciente;
		this.medico = medico;
		this.habitacion = habitacion;
		this.cama = cama;
		this.fechaIngreso = fechaIngreso;
		this.fechaSalida = fechaSalida;
		this.estado = estado;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(paciente paciente) {
		this.paciente = paciente;
	}

	public medico getMedico() {
		return medico;
	}

	public void setMedico(medico medico) {
		this.medico = medico;
	}

	public String getHabitacion() {
		return habitacion;
	}

	public void setHabitacion(String habitacion) {
		this.habitacion = habitacion;
	}

	public String getCama() {
		return cama;
	}

	public void setCama(String cama) {
		this.cama = cama;
	}

	public String getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(String fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	public String getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(String fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
    
}
