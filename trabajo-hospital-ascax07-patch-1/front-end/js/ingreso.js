
var url = "http://localhost:8080/api/v1/ingreso/";

// Función para cargar la lista de medicos al cargar la página
function cargarListaMedicos() {
    document.addEventListener("DOMContentLoaded", function () {
        var medicoSelect = document.getElementById("medicoSelect");

        if (medicoSelect) {
            // Realizar una solicitud al backend para obtener la lista de pacientes
            // y llenar el select con las opciones
            $.ajax({
                url: "http://localhost:8080/api/v1/medico/",
                type: "GET",
                success: function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var option = document.createElement("option");
                        option.value = result[i].id;
                        option.text = result[i].tipo_documento + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                    
                        medicoSelect.appendChild(option);
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

cargarListaMedicos();

// Función para cargar la lista de pacientes al cargar la página
function cargarListaPacientes() {
    // Asegúrate de que el DOM esté completamente cargado
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
                        var option = document.createElement("option");
                        option.value = result[i].id;
                        option.text = result[i].id + "-" + result[i].primer_name + " - " + result[i].segundo_name;
                    
                        pacienteSelect.appendChild(option);
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

            var cuerpoTabla = document.getElementById("cuerpoTabla");

            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");

                let celdaID = document.createElement("td");
                let celdaHabitacion = document.createElement("td");
                let celdaCama = document.createElement("td");
                let celdaMedico = document.createElement("td");
                let celdaPaciente = document.createElement("td");
                let celdaFechaIngreso = document.createElement("td");
                let celdaFechaSalida = document.createElement("td");
                let celdaEstado = document.createElement("td");

                celdaID.innerText = result[i]["id"];
                celdaHabitacion.innerText = result[i]["habitacion"];
                celdaCama.innerText = result[i]["cama"];
                var medico=result[i]["medico"]
                celdaMedico.innerText = medico["primer_name"]+" "+ paciente["segundo_name"] || "";
                var paciente=result[i]["paciente"]
                celdaPaciente.innerText = paciente["primer_name"]+" "+ paciente["segundo_name"] || "";
                //eta era la que yo tenia  y mentiras que es la de arriba xdd: celdaPaciente.innerText = result[i]["pacienteSelect"] || "";
                celdaFechaIngreso.innerText = result[i]["fechaIngreso"] || "";
                celdaFechaSalida.innerText = result[i]["fechaSalida"] || "";
                celdaEstado.innerText = result[i]["estado"] || "";

                trRegistro.appendChild(celdaID);
                trRegistro.appendChild(celdaHabitacion);
                trRegistro.appendChild(celdaCama);
                trRegistro.appendChild(celdaMedico);
                trRegistro.appendChild(celdaPaciente);
                trRegistro.appendChild(celdaFechaIngreso);
                trRegistro.appendChild(celdaFechaSalida);
                trRegistro.appendChild(celdaEstado);

                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            console.error("Error en la petición: " + error);
        }
    });
}

// Función para registrar un ingreso
function registrarIngreso() {
    let formData = {
        "habitacion": document.getElementById("habitacion").value,
        "cama": document.getElementById("cama").value,
        "medicoSelect": document.getElementById("medicoSelect").value,
        "pacienteSelect": document.getElementById("pacienteSelect").value,
        "fechaIngreso": document.getElementById("fechaIngreso").value,
        "fechaSalida": document.getElementById("fechaSalida").value,
        "estado": document.getElementById("estado").value
    };

    if (validarCampos) {
        // Se ejecuta la petición
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) {
                alert("Se guardó correctamente");
            },
        });
    } else {
        Swal.fire({
            title: "ERROR",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}


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

