var url = "http://localhost:8080/api/v1/paciente/";


function listaPaciente() {
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
                let celdaTipo_Documento = document.createElement("td");
                let celdaNumero_Documento = document.createElement("td");
                let celdaPrimer_name = document.createElement("td");
                let celdaSegundo_name = document.createElement("td");
                let celdaPrimer_apellido = document.createElement("td");
                let celdaSegundo_apellido = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaNombre_contacto = document.createElement("td");
                let celdaTelefono_contacto = document.createElement("td");
                let celdaEditar = document.createElement("td");  // Nueva celda para el botón "Eliminar"
                let celdaEliminar = document.createElement("td");  // Nueva celda para el botón "Eliminar"

                celdaID.innerText = result[i]["id"];
                celdaTipo_Documento.innerText = result[i]["tipo_documento"];
                celdaNumero_Documento.innerText = result[i]["numero_documento"];
                celdaPrimer_name.innerText = result[i]["primer_name"] || "";
                celdaSegundo_name.innerText = result[i]["segundo_name"] || "";
                celdaPrimer_apellido.innerText = result[i]["primer_apellido"] || "";
                celdaSegundo_apellido.innerText = result[i]["segundo_apellido"] || "";
                celdaTelefono.innerText = result[i]["telefono"];
                celdaCorreo.innerText = result[i]["correo"];
                celdaNombre_contacto.innerText = result[i]["nombre_contacto"];
                celdaTelefono_contacto.innerText = result[i]["telefono_contacto"];

                trRegistro.appendChild(celdaID);
                trRegistro.appendChild(celdaTipo_Documento);
                trRegistro.appendChild(celdaNumero_Documento);
                trRegistro.appendChild(celdaPrimer_name);
                trRegistro.appendChild(celdaSegundo_name);
                trRegistro.appendChild(celdaPrimer_apellido);
                trRegistro.appendChild(celdaSegundo_apellido);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaNombre_contacto);
                trRegistro.appendChild(celdaTelefono_contacto);
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);  // Agregar la celda "Eliminar" a la fila

                
                 // Agregar el botón "Editar"
            let botonEditar = document.createElement("a");
            botonEditar.className = "btn btn-primary";
            botonEditar.textContent = "Editar";
            botonEditar.id = "btnEditar";
        
                  // Agregar el botón "Eliminar"
                let botonEliminar = document.createElement("button");
                botonEliminar.className = "btn btn-danger";
                botonEliminar.textContent = "Eliminar";
            
            

            celdaEditar.appendChild(botonEditar);  // Agregar el botón a la celda "Editar"
            celdaEliminar.appendChild(botonEliminar);

                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

function registrarPaciente() {
    let formData = {
        "tipo_documento": document.getElementById("Tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
        "nombre_contacto": document.getElementById("nombre_contacto").value,
        "telefono_contacto": document.getElementById("telefono_contacto").value
    };
    if (validarCampos()) {
        
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) { 
                alert("Se registro correctamente");
            },
            error: function (error) {
                alert("no se registro")
            }
        });
    }else{
        swal.fire({
            title: "ERROR",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}

function validarCampos() {
    var numero_documento = document.getElementById("numero_documento");
    return validarNumeroDocumento(numero_documento);
}

function validarNumeroDocumento(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        //cuadro texto cumple
        cuadroNumero.className = "form-control is-valid";
    } else {
        //cuadro texto no cumple
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
}