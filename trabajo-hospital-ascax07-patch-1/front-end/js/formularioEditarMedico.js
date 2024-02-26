var url = "http://localhost:8080/api/v1/medico/";


// Función para cargar los datos del medicos al cargar la página
function cargarListaMedicos() {
    document.addEventListener("DOMContentLoaded", function () {
        var tipo_documento = document.getElementById("tipo_documento");

        if (tipo_documento) {
            // Realizar una solicitud al backend para para cargar los datos del medico
            // y llenar el los inputs con la informacion a editar
            $.ajax({
                url: "http://localhost:8080/api/v1/medico/",
                type: "GET",
                success: function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var option = document.createElement("option");
                        option.value = result[i].id;
                        option.text =  result[i].tipo_documento;
                    
                        tipo_documento.appendChild(option);
                    }
                },
                error: function (error) {
                    console.error("Error al obtener la lista de tipo de documentos: " + error);
                }
            });
        } else {
            console.error("Elemento con ID 'tipo_documento' no encontrado.");
        }
    });
}

// Llamada a la función al cargar la página
cargarListaMedicos();


function registrarMedico() {
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

        if (validarCampos()) {
            //se ejecuta la peticion
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: function (result) {
                    alert("Se guardo correctamente");
                    
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "error",
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
        }else{
            Swal.fire({
                title: "ERROR",
                text: "Llene todos los campos correctamente",
                icon: "error"
            });
        }
}


function registrarIngreso() {
    let formData = {
        "habitacion": document.getElementById("habitacion").value,
        "cama": document.getElementById("cama").value,
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
