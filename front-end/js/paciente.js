var url = "http://localhost:8080/api/v1/paciente/";

function listaPaciente() {

    //Se crea el filtro
    var capturarFiltro = document.getElementById("Search").value;
    var urlPaciente=url;
    if (capturarFiltro!=""){
        urlPaciente+="busquedafiltro/"+capturarFiltro;
  }
    $.ajax({
        url: urlPaciente,
        type: "GET",
        success: function (result) {
            console.log(result);

            var listaPaciente = document.getElementById("listaPaciente");

            listaPaciente.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");
                trRegistro.classList.add(i % 2 === 0 ? "form-fielddd" : "form-fieldd");
                let celdaID = document.createElement("td");
                let celdaTipo_Documento = document.createElement("td");
                let celdaNumero_Documento = document.createElement("td");
                let celdaPrimer_name = document.createElement("td");
                let celdaSegundo_name = document.createElement("td");
                let celdaPrimer_apellido = document.createElement("td");
                let celdaSegundo_apellido = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaNombre_contacto = document.createElement("td");
                let celdaTelefono_contacto = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");
                let celdaEliminar = document.createElement("td");

                celdaID.innerText = result[i]["id"];
                celdaTipo_Documento.innerText = result[i]["tipo_documento"];
                celdaNumero_Documento.innerText = result[i]["numero_documento"];
                celdaPrimer_name.innerText = result[i]["primer_name"] || "";
                celdaSegundo_name.innerText = result[i]["segundo_name"] || "";
                celdaPrimer_apellido.innerText = result[i]["primer_apellido"] || "";
                celdaSegundo_apellido.innerText = result[i]["segundo_apellido"] || "";
                celdaCorreo.innerText = result[i]["correo"];
                celdaTelefono.innerText = result[i]["telefono"];
                celdaNombre_contacto.innerText = result[i]["nombre_contacto"];
                celdaTelefono_contacto.innerText = result[i]["telefono_contacto"];
                celdaEstado.innerText = result[i]["estado"];

                // Agregar el botón "Editar"
                let botonEditar = document.createElement("a");
                botonEditar.className = "boton-editar";
                botonEditar.textContent = "Editar";
                botonEditar.id = "btnEditar";

                // Agregar el botón "Eliminar"
                let botonEliminar = document.createElement("button");
                botonEliminar.className = "boton-eliminar";
                botonEliminar.textContent = "Eliminar";


                // Agregar evento al botón Eliminar
                botonEliminar.onclick = (function (id) {
                    return function () {
                        eliminarPaciente(id);
                    };
                })(result[i]["id"]);

                botonEditar.onclick = (function (index) {
                    return function () {
                        let idPaciente = result[index]["id"]; // Obtener el ID del médico usando el índice capturado
                        let modal = document.getElementById("staticBackdrop");
                        if (!modal) {
                            let modalCode = `
                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Paciente</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container">
                                        <div class="row">
                                        <div class="col col-xl-6 col-12 Dark__containerSelect">
                                            <label class="Dark__label" for="Tipo_documento">Tipo documento</label>
                                            <select id="tipo_documento" class="form-select">
                                                <option value="" selected disabled>Seleccione una opción</option>
                                                <option value="RC">Registro Civil</option>
                                                <option value="TI">Tarjeta de Identidad</option>
                                                <option value="CC">Cedula de Ciudadanía</option>
                                                <option value="CE">Cedula de Extranjería</option>
                                            </select>
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="numero_documento">Número de documento</label>
                                            <input type="number" id="numero_documento" step="1" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="primer_name">Primer Nombre</label>
                                            <input type="text" id="primer_name" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="segundo_name">Segundo Nombre</label>
                                            <input type="text" id="segundo_name" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="primer_apellido">Primer Apellido</label>
                                            <input type="text" id="primer_apellido" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="segundo_apellido">Segundo Apellido</label>
                                            <input type="text" id="segundo_apellido" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="telefono">Teléfono</label>
                                            <input type="text" id="telefono" class="form-control Dark__input">
                                        </div>
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="correo">Correo</label>
                                            <input type="text" id="correo" class="form-control Dark__input">
                                        </div>
                            
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="nombre_contacto">Nombre de contacto</label>
                                            <input type="text" id="nombre_contacto" class="form-control Dark__input">
                                        </div>
                            
                                        <div class="col col-xl-6 col-12 Dark__container">
                                            <label class="Dark__label" for="telefono_contacto">Teléfono de contacto</label>
                                            <input type="text" id="telefono_contacto" class="form-control Dark__input">
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

                        botonGuardar.addEventListener("click", function () {
                            guardarCambiosPaciente(idPaciente); // Guardar cambios con el ID del médico
                        });

                        cargarDatosPacienteEnFormulario(idPaciente); // Cargar datos del médico en el formulario
                    };
                })(i); // Pasar el valor de i al ámbito de cierre



                celdaEditar.appendChild(botonEditar);
                celdaEliminar.appendChild(botonEliminar);

                trRegistro.appendChild(celdaID);
                trRegistro.appendChild(celdaTipo_Documento);
                trRegistro.appendChild(celdaNumero_Documento);
                trRegistro.appendChild(celdaPrimer_name);
                trRegistro.appendChild(celdaSegundo_name);
                trRegistro.appendChild(celdaPrimer_apellido);
                trRegistro.appendChild(celdaSegundo_apellido);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaNombre_contacto);
                trRegistro.appendChild(celdaTelefono_contacto);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);

                listaPaciente.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

function cargarDatosPacienteEnFormulario(idPaciente) {
    $.ajax({
        url: url + idPaciente,
        type: "GET",
        success: function (paciente) {
            document.getElementById("tipo_documento").value = paciente.tipo_documento;
            document.getElementById("numero_documento").value = paciente.numero_documento;
            document.getElementById("primer_name").value = paciente.primer_name;
            document.getElementById("segundo_name").value = paciente.segundo_name;
            document.getElementById("primer_apellido").value = paciente.primer_apellido;
            document.getElementById("segundo_apellido").value = paciente.segundo_apellido;
            document.getElementById("correo").value = paciente.correo;
            document.getElementById("telefono").value = paciente.telefono;
            document.getElementById("nombre_contacto").value = paciente.nombre_contacto;
            document.getElementById("telefono_contacto").value = paciente.telefono_contacto;
            document.getElementById("estado").value = paciente.estado;
        },
        error: function (error) {
            console.error("Error al obtener datos del paciente:", error);
        }
    });
}

function guardarCambiosPaciente(idPaciente) {
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "correo": document.getElementById("correo").value,
        "telefono": document.getElementById("telefono").value,
        "nombre_contacto": document.getElementById("nombre_contacto").value,
        "telefono_contacto": document.getElementById("telefono_contacto").value,
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
                url: url + idPaciente,
                type: "PUT",
                data: formData,
                success: function (result) {
                    console.log("Datos del paciente actualizados:", result);
                    let modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();

                    // Recargar la página después de guardar los cambios
                    swalWithBootstrapButtons.fire({
                        title: "Cambios guardados",
                        text: "Los cambios se guardaron correctamente.",
                        icon: "success"
                    }).then(() => {
                        // Llamar a listaPaciente() después de cerrar el mensaje
                        listaPaciente(); // Actualizar la lista después de guardar
                    });
                },
                error: function (error) {
                    console.error("Error al actualizar datos del paciente:", error);
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

// Función para eliminar un paciente
function eliminarPaciente(idPaciente) {
    // Mostrar un cuadro de confirmación utilizando SweetAlert
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        // Si el usuario confirma la acción
        if (result.isConfirmed) {
            // Realizar una solicitud AJAX para eliminar el paciente
            $.ajax({
                url: url + idPaciente, // La URL puede depender de la configuración en el código
                type: "DELETE",
                success: function (result) {
                    // En caso de éxito, actualizar la lista de pacientes
                    listaPaciente();
                    // Mostrar un mensaje de éxito utilizando SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente eliminado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (error) {
                    // En caso de error, mostrar un mensaje de error personalizado
                    if (error.status === 400) {
                        // El código 400 puede indicar que el paciente está siendo utilizado
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se puede eliminar porque ya está siendo utilizado en un ingreso',
                            footer: '<a href="#">¿Por qué tengo este problema?</a>'
                        });
                    } else {
                        // En caso de otros errores, mostrar el mensaje de error genérico
                        console.error("Error al eliminar Paciente:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se puede eliminar porque ya está siendo utilizado en un ingreso',
                            footer: '<a href="./listaIngreso.html">ir a listado de ingresos</a>'
                        });
                    }
                }
            });
        }
    });
}

function registrarPaciente() {
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
        "nombre_contacto": document.getElementById("nombre_contacto").value,
        "telefono_contacto": document.getElementById("telefono_contacto").value,
        "estado": document.getElementById("estado").value
    };
    if (validarCampos()) {
        let tipoDocumento = formData["tipo_documento"];
        let numeroDocumento = formData["numero_documento"];
        validarDocumentoRepetido(tipoDocumento, numeroDocumento, function(result) {
            if (result) {
                alert("El tipo y número de documento ya están en uso.");
            } else {
                // El tipo y número de documento no están repetidos, proceder con el registro
                $.ajax({
                    url: url,
                    type: "POST",
                    data: formData,
                    success: function (result) {
                        alert("Se registró correctamente");
                    },
                    error: function (error) {
                        alert("No se registró");
                    }
                });
            }
        });
    } else {
        swal.fire({
            title: "ERROR",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}

// Función para verificar si el tipo y número de documento ya están en uso
function validarDocumentoRepetido(tipoDocumento, numeroDocumento, callback) {
    $.ajax({
        url: url, // Reemplaza "URL de tu API" con la URL real de tu servidor
        type: "GET",
        data: {
            tipo_documento: tipoDocumento,
            numero_documento: numeroDocumento
        },
        success: function (result) {
            // Verificar si el tipo y número de documento están repetidos
            var documentoRepetido = result.some(item => item.tipo_documento === tipoDocumento && item.numero_documento === numeroDocumento);
            // Llama al callback con el resultado de la verificación
            callback(documentoRepetido); // true si el tipo y número de documento están repetidos, false si no
        },
        error: function (error) {
            console.error("Error al verificar el tipo y número de documento:", error);
            // En caso de error, asumimos que el tipo y número de documento no están repetidos
            callback(false);
        }
    });
}



function validarTipoDocumento(campoTipoDocumento) {
    var valor = campoTipoDocumento.value;
    var valido = valor !== ""; // Verificar si se ha seleccionado una opción
    actualizarClaseValidacion(campoTipoDocumento, valido);
    return valido;
}

function validarNumeroDocumento(campoNumeroDocumento) {
    var valor = campoNumeroDocumento.value;
    var valido = valor.length >= 5 && valor.length <= 11; // Verificar longitud del número de documento
    actualizarClaseValidacion(campoNumeroDocumento, valido);
    return valido;
}

function validarNombre(campoNombre) {
    var valor = campoNombre.value;
    var valido = valor.trim().length > 0 && valor.trim().length <= 20; // Verificar longitud del nombre
    actualizarClaseValidacion(campoNombre, valido);
    return valido;
}

function validarTelefono(campoTelefono) {
    var valor = campoTelefono.value;
    var valido = valor.trim().length > 0 && valor.trim().length <= 15; // Verificar longitud del número de teléfono
    actualizarClaseValidacion(campoTelefono, valido);
    return valido;
}

function validarCorreo(campoCorreo) {
    var valor = campoCorreo.value;
    // Expresión regular para validar un correo electrónico básico
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var valido = regexCorreo.test(valor);
    actualizarClaseValidacion(campoCorreo, valido);
    return valido;
}

function validarNombreContacto(campoNombreContacto) {
    var valor = campoNombreContacto.value;
    var valido = valor.trim().length > 0 && valor.trim().length <= 20; // Verificar longitud del nombre
    actualizarClaseValidacion(campoNombreContacto, valido);
    return valido;
}

function validarTelefonoContacto(campoTelefonoContacto) {
    var valor = campoTelefonoContacto.value;
    var valido = valor.trim().length > 0 && valor.trim().length <= 15; // Verificar longitud del nombre
    actualizarClaseValidacion(campoTelefonoContacto, valido);
    return valido;
}


function validarEstado(campoEstado) {
    var valor = campoEstado.value;
    var valido = valor !== ""; // Verificar si se ha seleccionado una opción
    actualizarClaseValidacion(campoEstado, valido);
    return valido;
}

function actualizarClaseValidacion(campo, esValido) {
    // Agregar o quitar clases según si el campo es válido o no
    if (esValido) {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
    } else {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
    }
}

// Función para validar todos los campos antes de enviar el formulario
function validarCampos() {
    var tipoDocumento = document.getElementById("tipo_documento");
    var numeroDocumento = document.getElementById("numero_documento");
    var primerNombre = document.getElementById("primer_name");
    var primerApellido = document.getElementById("primer_apellido");
    var telefono = document.getElementById("telefono");
    var correo = document.getElementById("correo");
    var nombre_contacto = document.getElementById("nombre_contacto");
    var telefono_contacto = document.getElementById("telefono_contacto");
    var estado = document.getElementById("estado");


    var camposValidos =
        validarTipoDocumento(tipoDocumento) &&
        validarNumeroDocumento(numeroDocumento) &&
        validarNombre(primerNombre) &&
        validarNombre(primerApellido) &&
        validarTelefono(telefono) &&
        validarCorreo(correo) &&
        validarNombreContacto(nombre_contacto) &&
        validarTelefonoContacto(telefono_contacto) &&
        validarEstado(estado);

    return camposValidos;
}

// Esta función la utilizas para validar los campos antes de enviar el formulario
// Por ejemplo, en el evento onclick de un botón "Enviar"
function enviarFormulario() {
    if (validarCampos()) {
        // Los campos son válidos, puedes enviar el formulario
        // Por ejemplo:
        document.getElementById("formulario").submit();
    } else {
        // Mostrar un mensaje de error o realizar alguna acción adicional si los campos no son válidos
        alert("Por favor, completa todos los campos correctamente.");
    }
}

$(document).ready(function () {
    listaMedico();
});
