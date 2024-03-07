package com.example.senaHospital.interfaces;


import org.springframework.data.repository.CrudRepository;
import com.example.senaHospital.models.paciente;

public interface IPaciente extends CrudRepository<paciente, String> {
}
