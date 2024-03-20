var url = "http://localhost:8080/api/v1/medico/";

function listaMedico() {
    //Se crea el filtro
    var capturarFiltro = document.getElementById("Search").value;
    var urlMedico=url;
    if (capturarFiltro!=""){
        urlMedico+="busquedafiltro/"+capturarFiltro;
  }
    $.ajax({
        url: urlMedico,
        type: "GET",
        success: function (result) {
            console.log(result);

            var cuerpoTabla = document.getElementById("cuerpoTabla");

            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");
                trRegistro.classList.add(i % 2 === 0 ? "form-fielddd" : "form-fieldd");
                let celdaId = document.createElement("td");
                let celdaTipo_Documento = document.createElement("td");
                let celdaNumero_Documento = document.createElement("td");
                let celdaPrimer_name = document.createElement("td");
                let celdaSegundo_name = document.createElement("td");
                let celdaPrimer_apellido = document.createElement("td");
                let celdaSegundo_apellido = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");
                let celdaEliminar = document.createElement("td");

                celdaId.innerText = result[i]["id"];
                celdaTipo_Documento.innerText = result[i]["tipo_documento"];
                celdaNumero_Documento.innerText = result[i]["numero_documento"];
                celdaPrimer_name.innerText = result[i]["primer_name"] || "";
                celdaSegundo_name.innerText = result[i]["segundo_name"] || "";
                celdaPrimer_apellido.innerText = result[i]["primer_apellido"] || "";
                celdaSegundo_apellido.innerText = result[i]["segundo_apellido"] || "";
                celdaCorreo.innerText = result[i]["correo"];
                celdaTelefono.innerText = result[i]["telefono"];
                celdaEstado.innerText = result[i]["estado"];

                let botonEditar = document.createElement("a");
                botonEditar.className = "boton-editar";
                botonEditar.textContent = "Editar";
                botonEditar.id = "btnEditar";

                let botonEliminar = document.createElement("button");
                botonEliminar.className = "boton-eliminar";
                botonEliminar.textContent = "Eliminar";

                // Agregar evento al botón Eliminar
                botonEliminar.onclick = (function (id) {
                    return function () {
                        eliminarMedico(id);
                    };
                })(result[i]["id"]);

                botonEditar.onclick = (function (index) {
                    return function () {
                        let idMedico = result[index]["id"]; // Obtener el ID del médico usando el índice capturado
                        let modal = document.getElementById("staticBackdrop");
                        if (!modal) {
                            let modalCode = `
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Medico</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="container">
                                        <div class="row">
                                        <div class="col col-xl-6 col-12 Dark__containerSelect">
                                            <label class="Dark__label" for="Tipo_documento">Tipo documento</label>
                                            <select id="tipo_documento" class="form-select Dark__select" >
                                                <option value="" selected disabled>Seleccione una opción</option>
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
                                    <div class="col col-xl-6 col-12  Dark__container">
                                    <label class="Dark__label" for="segundo_apellido">Segundo Apellido</label>
                                    <input type="text" id="segundo_apellido" class="form-control Dark__input">
                                </div>
                                <div class="col col-xl-6 col-12  Dark__container">
                                    <label class="Dark__label" for="telefono">Teléfono</label>
                                    <input type="text" id="telefono" class="form-control Dark__input">
                            </div>
                            <div class="col col-xl-6 col-12  Dark__container">
                                <label class="Dark__label"  for="correo">Correo</label>
                                <input type="text" id="correo" class="form-control Dark__input">
                            </div>
                            <div class="col col-xl-6 col-12  Dark__containerSelect">
                                <label class="Dark__label"  for="estado">Estado</label>
                                <select id="estado" class="form-select Dark__select">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option value="Habilitado">Habilitado</option>
                                    <option value="Deshabilitado">Deshabilitado</option>
                                </select>
                        </div>
                                            <p style="color: #fff;">Actualiza la pagina una vez guardado los cambios</p>
                                
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                <button  class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
                                <button  class="btn btn-primary">Guardar</button>
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
                            guardarCambiosMedico(idMedico); // Guardar cambios con el ID del médico
                        });

                        cargarDatosMedicoEnFormulario(idMedico); // Cargar datos del médico en el formulario
                    };
                })(i); // Pasar el valor de i al ámbito de cierre

                celdaEditar.appendChild(botonEditar);
                celdaEliminar.appendChild(botonEliminar);

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipo_Documento);
                trRegistro.appendChild(celdaNumero_Documento);
                trRegistro.appendChild(celdaPrimer_name);
                trRegistro.appendChild(celdaSegundo_name);
                trRegistro.appendChild(celdaPrimer_apellido);
                trRegistro.appendChild(celdaSegundo_apellido);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);

                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

function cargarDatosMedicoEnFormulario(idMedico) {
    $.ajax({
        url: url + idMedico,
        type: "GET",
        success: function (medico) {
            document.getElementById("tipo_documento").value = medico.tipo_documento;
            document.getElementById("numero_documento").value = medico.numero_documento;
            document.getElementById("primer_name").value = medico.primer_name;
            document.getElementById("segundo_name").value = medico.segundo_name;
            document.getElementById("primer_apellido").value = medico.primer_apellido;
            document.getElementById("segundo_apellido").value = medico.segundo_apellido;
            document.getElementById("telefono").value = medico.telefono;
            document.getElementById("correo").value = medico.correo;
            document.getElementById("estado").value = medico.estado;
        },
        error: function (error) {
            console.error("Error al obtener datos del médico:", error);
        }
    });
}

function guardarCambiosMedico(idMedico) {
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
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
                url: url + idMedico,
                type: "PUT",
                data: formData,
                success: function (result) {
                    console.log("Datos del médico actualizados:", result);
                    let modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();

                    // Recargar la página después de guardar los cambios
                    swalWithBootstrapButtons.fire({
                        title: "Cambios guardados",
                        text: "Los cambios se guardaron correctamente.",
                        icon: "success"
                    }).then(() => {
                        // Llamar a listaMedico() después de cerrar el mensaje
                        listaMedico(); // Actualizar la lista después de guardar
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
// Agregar función para eliminar un médico

// Función para eliminar un médico
function eliminarMedico(idMedico) {
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
            // Realizar una solicitud AJAX para eliminar el médico
            $.ajax({
                url: url + idMedico, // La URL puede depender de la configuración en el código
                type: "DELETE",
                success: function (result) {
                    // En caso de éxito, actualizar la lista de médicos
                    listaMedico();
                    // Mostrar un mensaje de éxito utilizando SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Médico eliminado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (error) {
                    // En caso de error, mostrar un mensaje de error personalizado
                    if (error.status === 400) {
                        // El código 400 puede indicar que el médico está siendo utilizado
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se puede eliminar porque ya está siendo utilizado en un ingreso',
                            footer: '<a href="#">¿Por qué tengo este problema?</a>'
                        });
                    } else {
                        // En caso de otros errores, mostrar el mensaje de error genérico
                        console.error("Error al eliminar Médico:", error);
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


function registrarMedico() {
    // Obtener los valores de los campos del formulario
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
        "estado": document.getElementById("estado").value
    };

    let tipoDocumento = formData["tipo_documento"];
    let numeroDocumento = formData["numero_documento"];

    // Verificar duplicación de tipo y número de documento
    validarDocumentoRepetido(tipoDocumento, numeroDocumento, function(documentoRepetido) {
        if (documentoRepetido) {
            alert("El tipo y número de documento ya están en uso.");
        } else {
            // Verificar duplicación de teléfono y correo
            validarTelefonoCorreo(formData["telefono"], formData["correo"], function(telefonoRepetido, correoRepetido) {
                if (telefonoRepetido && correoRepetido) {
                    alert("El teléfono y el correo ya están en uso.");
                } else if (telefonoRepetido) {
                    alert("El teléfono ya está en uso.");
                } else if (correoRepetido) {
                    alert("El correo ya está en uso.");
                } else {
                    // Si no hay duplicados, proceder con el registro
                    // Validar campos obligatorios al final
                    if (!validarCampos()) {
                        Swal.fire({
                            title: "ERROR",
                            text: "Llene todos los campos correctamente",
                            icon: "error"
                        });
                        return;
                    }

                    // Los campos son válidos, proceder con el registro
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: formData,
                        success: function (result) {
                            alert("Se guardó correctamente");
                        },
                        error: function (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "No se guardó correctamente",
                                width: 600,
                                padding: "3em",
                                color: "#716add",
                                background: "#fff url(cat.gif)",
                                backdrop: `
                                    rgba(0,0,123,0.4)
                                    url(https://i.gifer.com/2iiJ.gif)
                                    left top
                                    no-repeat
                                `
                            });
                        }
                    });
                }
            });
        }
    });
}

function validarTelefonoCorreo(telefono, correo, callback) {
    // Validar teléfono
    $.ajax({
        url: url, 
        type: "GET",
        data: {
            telefono: telefono
        },
        success: function (resultTelefono) {
            var telefonoRepetido = resultTelefono.some(item => item.telefono === telefono);
            
            // Validar correo después de validar el teléfono
            $.ajax({
                url: url, 
                type: "GET",
                data: {
                    correo: correo
                },
                success: function (resultCorreo) {
                    var correoRepetido = resultCorreo.some(item => item.correo === correo);
                    callback(telefonoRepetido, correoRepetido);
                },
                error: function (errorCorreo) {
                    console.error("Error al verificar el correo:", errorCorreo);
                    callback(false, false);
                }
            });
        },
        error: function (errorTelefono) {
            console.error("Error al verificar el teléfono:", errorTelefono);
            callback(false, false);
        }
    });
}

function validarCorreo(correo, callback) {
    $.ajax({
        url: url, // Reemplaza "URL de tu API" con la URL real de tu servidor
        type: "GET",
        data: {
            correo: correo
        },
        success: function (result) {
            var correoRepetido = result.some(item => item.correo === correo);
            // Llama al callback con el resultado de la verificación del correo
            callback(correoRepetido);
        },
        error: function (error) {
            console.error("Error al verificar el correo:", error);
            // En caso de error, asumimos que el correo no está repetido
            callback(false);
        }
    });
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
    var estado = document.getElementById("estado");

    var camposValidos =
        validarTipoDocumento(tipoDocumento) &&
        validarNumeroDocumento(numeroDocumento) &&
        validarNombre(primerNombre) &&
        validarNombre(primerApellido) &&
        validarTelefono(telefono) &&
        validarCorreo(correo) &&
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
