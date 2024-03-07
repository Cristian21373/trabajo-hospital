
var url = "http://localhost:8080/api/v1/ingreso/";

// Función para cargar la lista de medicos al cargar la página
function cargarListaMedicos() {
    document.addEventListener("DOMContentLoaded", function () {
        var medicoSelect = document.getElementById("medicoSelect");

        if (medicoSelect) {
            // Realizar una solicitud al backend para obtener la lista de Medicos
            // y llenar el select con las opciones
            $.ajax({
                url: "http://localhost:8080/api/v1/medico/",
                type: "GET",
                success: function (result) {
                    
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].estado === "Habilitado") {
                            var option = document.createElement("option");
                            option.value = result[i].id;
                            option.text = result[i].tipo_documento + "-" + result[i].numero_documento + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                        
                            medicoSelect.appendChild(option);
                        }
                    }
                },
                error: function (error) {
                    console.error("Error al obtener la lista de Medicos: " + error);
                }
            });
        } else {
            console.error("Elemento con ID 'medicoSelect' no encontrado.");
        }
    });
}

cargarListaMedicos();

// Función para cargar la lista de pacientes al cargar la página
function cargarListaPacientes() {
    document.addEventListener("DOMContentLoaded", function () {
        var pacienteSelect = document.getElementById("pacienteSelect");

        if (pacienteSelect) {
            // Realizar una solicitud al backend para obtener la lista de pacientes
            // y llenar el select con las opciones
            $.ajax({
                url: "http://localhost:8080/api/v1/paciente/",
                type: "GET",
                success: function (result) {
                    for (var i = 0; i < result.length; i++) {
                        
                        if (result[i].estado === "Habilitado") {
                            var option = document.createElement("option");
                            option.value = result[i].id;
                            option.text = result[i].tipo_documento + "-" + result[i].numero_documento + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                        
                            pacienteSelect.appendChild(option);
                        }
                    }
                },
                error: function (error) {
                    console.error("Error al obtener la lista de pacientes: " + error);
                }
            });
        } else {
            console.error("Elemento con ID 'pacienteSelect' no encontrado.");
        }
    });
}


// Llamada a la función al cargar la página
cargarListaPacientes();

// Función para listar los ingresos
function listaIngreso() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);

            var listaIngreso = document.getElementById("listaIngreso");

            listaIngreso.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");
                trRegistro.classList.add(i % 2 === 0 ? "form-fielddd" : "form-fieldd");
                let celdaID = document.createElement("td");
                let celdaHabitacion = document.createElement("td");
                let celdaCama = document.createElement("td");
                let celdaMedico = document.createElement("td");
                let celdaPaciente = document.createElement("td");
                let celdaFechaIngreso = document.createElement("td");
                let celdaFechaSalida = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");
                let celdaEliminar = document.createElement("td");

                celdaID.innerText = result[i]["id"];
                celdaHabitacion.innerText = result[i]["habitacion"];
                celdaCama.innerText = result[i]["cama"];
                var medico=result[i]["medico"]
                celdaMedico.innerText = medico["primer_name"]+ " " + medico["segundo_name"] || "";
                var paciente=result[i]["paciente"]
                celdaPaciente.innerText = paciente["primer_name"]+" "+ paciente["segundo_name"] || "";
                //eta era la que yo tenia  y mentiras que es la de arriba xdd: celdaPaciente.innerText = result[i]["pacienteSelect"] || "";
                celdaFechaIngreso.innerText = result[i]["fechaIngreso"] || "";
                celdaFechaSalida.innerText = result[i]["fechaSalida"] || "";
                celdaEstado.innerText = result[i]["estado"] || "";

                let botonEditar = document.createElement("a");
                botonEditar.className = "boton-editar";
                botonEditar.textContent = "Editar";
                botonEditar.id = "btnEditar";

                let botonEliminar = document.createElement("button");
                botonEliminar.className = "boton-eliminar";
                botonEliminar.textContent = "Eliminar";

                     // Agregar evento al botón Eliminar
                    botonEliminar.onclick = (function(id) {
                        return function() {
                            eliminarIngreso(id);
                        };
                    })(result[i]["id"]);

                    botonEditar.onclick = (function(index) {
                        return function() {
                            let idIngreso = result[index]["id"]; // Obtener el ID del Ingreso usando el índice capturado
                            let modal = document.getElementById("staticBackdrop");
                            if (!modal) {
                                let modalCode = `
                                <!-- Modal -->
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Ingreso</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col col-xl-6 col-12 Dark__container">
                                                        <label  class="Dark__label" for="habitacion">Habitación</label>
                                                        <input type="number" id="habitacion" class="form-control Dark__input" onfocusout="validarNumeroCama(this);">
                                                    </div>
                                                    <div class="col col-xl-6 col-12 Dark__container">
                                                        <label  class="Dark__label" for="cama">Cama</label>
                                                        <input type="number" id="cama" class="form-control Dark__input">
                                                    </div>
                                                    <div class="col col-xl-6 col-12  Dark__containerSelect">
                                                    <label  class="Dark__label" for="medicoSelect">medico</label>
                                                    <select id="medicoSelectModal" class="form-select">
                                                    </select>
                                                </div>
                                                    <div class="col col-xl-6 col-12  Dark__containerSelect">
                                                        <label  class="Dark__label" for="pacienteSelect">Paciente</label>
                                                        <select id="pacienteSelectModal" class="form-select">
                                                        </select>
                                                    </div>
                                                    <div class="col col-xl-6 col-12 Dark__container">
                                                    <label  class="Dark__label" for="fechaIngreso">Escribe una fecha de ingreso:</label>
                                                    <input type="datetime-local" id="fechaIngreso" step="1" class="form-control  Dark__input" pattern="yyyy-MM-ddTHH:mm:ss">
                                                </div>

                                                <div class="col col-xl-6 col-12 Dark__container">
                                                <label  class="Dark__label" for="fechaSalida">Escribe una fecha de salida:</label>
                                                <input type="datetime-local" id="fechaSalida" step="1" class="form-control  Dark__input" pattern="yyyy-MM-ddTHH:mm:ss">
                                            </div>
                                            <div class="col col-xl-6 col-12  Dark__containerSelect">
                                            <label class="Dark__label"  for="estado">Estado</label>
                                                <select id="estado" class="form-select Dark__select">
                                                <option value="" selected disabled>Seleccione una opción</option>
                                                <option value="Habilitado">Habilitado</option>
                                                <option value="Deshabilitado">Deshabilitado</option>
                                                </select>
                                            </div>
                                                    <p style="color: red">Actualiza la pagina una vez guardado los cambios</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
                                        <button type="button" class="btn btn-primary">Guardar</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                `;
    
                                let modalContainer = document.createElement("div");
                                modalContainer.innerHTML = modalCode;
                                document.body.appendChild(modalContainer);
                                modal = document.getElementById("staticBackdrop");
                            }
    
                            let modalInstance = new bootstrap.Modal(modal);
                            modalInstance.show();
    
                            let botonGuardar = modal.querySelector(".btn-primary");
    
                            botonGuardar.addEventListener("click", function() {
                                guardarCambiosIngreso(idIngreso); // Guardar cambios con el ID del médico
                            });
                            
                            
                            cargarDatosIngresoEnFormulario(idIngreso); // Cargar datos del médico en el formulario
                        };
                    })(i); // Pasar el valor de i al ámbito de cierre
    
                    celdaEditar.appendChild(botonEditar);
                    celdaEliminar.appendChild(botonEliminar);


                trRegistro.appendChild(celdaID);
                trRegistro.appendChild(celdaHabitacion);
                trRegistro.appendChild(celdaCama);
                trRegistro.appendChild(celdaMedico);
                trRegistro.appendChild(celdaPaciente);
                trRegistro.appendChild(celdaFechaIngreso);
                trRegistro.appendChild(celdaFechaSalida);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);

                listaIngreso.appendChild(trRegistro);
            }
        },
        error: function (error) {
            console.error("Error en la petición: " + error);
        }
    });
}


function cargarDatosIngresoEnFormulario(idIngreso) {
    $.ajax({
        url: url + idIngreso,
        type: "GET",
        success: function (ingreso) {
            document.getElementById("habitacion").value = ingreso.habitacion;
            document.getElementById("cama").value = ingreso.cama;
            document.getElementById("fechaIngreso").value = ingreso.fechaIngreso;
            document.getElementById("fechaSalida").value = ingreso.fechaSalida;
            document.getElementById("estado").value = ingreso.estado;

            // Cargar la lista de médicos y pacientes en el modal
            cargarListaMedicosEnModal(ingreso.medico.id);
            cargarListaPacientesEnModal(ingreso.paciente.id);
        },
        error: function (error) {
            console.error("Error al obtener datos del Ingreso:", error);
        }
    });
}

function cargarListaMedicosEnModal(selectedMedicoId) {
    var medicoSelectModal = document.getElementById("medicoSelectModal");

    if (medicoSelectModal) {
        // Realizar una solicitud al backend para obtener la lista de Médicos
        // y llenar el select con las opciones
        $.ajax({
            url: "http://localhost:8080/api/v1/medico/",
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].id;
                    option.text = result[i].tipo_documento + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                    medicoSelectModal.appendChild(option);
                }

                // Seleccionar el médico correspondiente al ingreso
                medicoSelectModal.value = selectedMedicoId;
            },
            error: function (error) {
                console.error("Error al obtener la lista de Medicos: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'medicoSelectModal' no encontrado.");
    }
}

function cargarListaPacientesEnModal(selectedPacienteId) {
    var pacienteSelectModal = document.getElementById("pacienteSelectModal");

    if (pacienteSelectModal) {
        // Realizar una solicitud al backend para obtener la lista de pacientes
        // y llenar el select con las opciones
        $.ajax({
            url: "http://localhost:8080/api/v1/paciente/",
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].id;
                    option.text = result[i].id + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                    pacienteSelectModal.appendChild(option);
                }

                // Seleccionar el paciente correspondiente al ingreso
                pacienteSelectModal.value = selectedPacienteId;
            },
            error: function (error) {
                console.error("Error al obtener la lista de pacientes: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'pacienteSelectModal' no encontrado.");
    }
}


function guardarCambiosIngreso(idIngreso) {
    let formData = {
        "habitacion": document.getElementById("habitacion").value,
        "cama": document.getElementById("cama").value,
        "medico": document.getElementById("medicoSelectModal").value,
        "paciente": document.getElementById("pacienteSelectModal").value,
        "fechaIngreso": document.getElementById("fechaIngreso").value,
        "fechaSalida": document.getElementById("fechaSalida").value,
        "estado": document.getElementById("estado").value
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + idIngreso,
                type: "PUT",
                data: formData,
                success: function (result) {
                    console.log("Datos del Ingreso actualizados:", result);
                    let modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();

                    // Recargar la página después de guardar los cambios
                    swalWithBootstrapButtons.fire({
                        title: "Cambios guardados",
                        text: "Los cambios se guardaron correctamente.",
                        icon: "success"
                    }).then(() => {
                        // Llamar a listaIngreso() después de cerrar el mensaje
                        listaIngreso(); // Actualizar la lista después de guardar
                    });
                },
                error: function (error) {
                    console.error("Error al actualizar datos del médico:", error);
                }
            });
        } else if (
            /* Manejar el caso de cancelación */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "No se realizaron cambios.",
                icon: "error"
            });
        }
    });
}

// Función para eliminar un ingreso
function eliminarIngreso(idIngreso) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + idIngreso,
                type: "DELETE",
                success: function (result) {
                    // Actualizar la lista después de eliminar
                    listaIngreso();
                    Swal.fire({
                        icon: 'success',
                        title: 'Ingreso eliminado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (error) {
                    console.error("Error al eliminar ingreso:", error);
                }
            });
        }
    });
}






// Función para registrar un ingreso
function registrarIngreso() {
    let formData = {
        "habitacion": document.getElementById("habitacion").value,
        "cama": document.getElementById("cama").value,
        "medico": document.getElementById("medicoSelect").value,
        "paciente": document.getElementById("pacienteSelect").value,
        "fechaIngreso": document.getElementById("fechaIngreso").value,
        "fechaSalida": document.getElementById("fechaSalida").value,
        "estado": document.getElementById("estado").value
    };

    // Verificar si el paciente ya está en un ingreso
    let pacienteEnIngreso = verificarPacienteEnIngreso(formData.paciente);
    
    // Verificar si hay otro paciente en la misma cama
    let otroPacienteEnCama = verificarOtroPacienteEnCama(formData.cama);

    if (pacienteEnIngreso) {
        // Mostrar SweetAlert indicando que el paciente ya está registrado en un ingreso
        Swal.fire({
            title: "Error",
            text: "El paciente ya está registrado en un ingreso.",
            icon: "error"
        });
    } else if (otroPacienteEnCama) {
        // Mostrar SweetAlert indicando que ya hay otro paciente en la misma cama
        Swal.fire({
            title: "Error",
            text: "Ya hay otro paciente registrado en la misma cama.",
            icon: "error"
        });
    } else {
        // Se ejecuta la petición
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) {
                alert("Se guardó correctamente");
                // Puedes agregar lógica adicional después de un registro exitoso
            },
            error: function (error) {
                console.error("Error en la petición: " + error);
            }
        });
    }
}


// Función para verificar si el paciente ya está en un ingreso
function verificarPacienteEnIngreso(idPaciente) {
    let pacienteEnIngreso = false;

    // Realizar una solicitud al backend para obtener la lista de ingresos
    $.ajax({
        url: url,
        type: "GET",
        async: false, // Hacer la solicitud de forma síncrona para esperar la respuesta
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].paciente.id === idPaciente) {
                    pacienteEnIngreso = true;
                    break;
                }
            }
        },
        error: function (error) {
            console.error("Error al obtener la lista de ingresos: " + error);
        }
    });

    return pacienteEnIngreso;
}


// Función para verificar si hay otro paciente en la misma cama
function verificarOtroPacienteEnCama(cama) {
    let otroPacienteEnCama = false;

    // Realizar una solicitud al backend para obtener la lista de ingresos
    $.ajax({
        url: url,
        type: "GET",
        async: false, // Hacer la solicitud de forma síncrona para esperar la respuesta
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].cama === cama) {
                    otroPacienteEnCama = true;
                    break;
                }
            }
        },
        error: function (error) {
            console.error("Error al obtener la lista de ingresos: " + error);
        }
    });

    return otroPacienteEnCama;
}





// Función para validar campos (puedes agregar más validaciones según tus requisitos)
function validarCampos() {
    var habitacion = document.getElementById("habitacion");
    return validarNumeroCama(habitacion);
}

// Función para validar el número de cama
function validarNumeroCama(cuadroCama) {
    var valor = cuadroCama.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        cuadroCama.className = "form-control is-valid";
    } else {
        cuadroCama.className = "form-control is-invalid";
    }
    return valido;
}

// });
