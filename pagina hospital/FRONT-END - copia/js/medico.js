var url = "http://localhost:8080/api/v1/medico/";

function listaMedico() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);

            var cuerpoTabla = document.getElementById("cuerpoTabla");

            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");

                let celdaId = document.createElement("td");
                let celdaTipo_Documento = document.createElement("td");
                let celdaNumero_Documento = document.createElement("td");
                let celdaPrimer_name = document.createElement("td");
                let celdaSegundo_name = document.createElement("td");
                let celdaPrimer_apellido = document.createElement("td");
                let celdaSegundo_apellido = document.createElement("td");
                let celdaCorreo = document.createElement("td");  // Cambiado el orden de correo
                let celdaTelefono = document.createElement("td");
                let celdaEstado = document.createElement("td");

                celdaId.innerText = result[i]["id"];
                celdaTipo_Documento.innerText = result[i]["tipo_documento"];
                celdaNumero_Documento.innerText = result[i]["numero_documento"];
                celdaPrimer_name.innerText = result[i]["primer_name"] || "";
                celdaSegundo_name.innerText = result[i]["segundo_name"] || "";
                celdaPrimer_apellido.innerText = result[i]["primer_apellido"] || "";
                celdaSegundo_apellido.innerText = result[i]["segundo_apellido"] || "";
                celdaCorreo.innerText = result[i]["correo"];  // Movido al final
                celdaTelefono.innerText = result[i]["telefono"];
                celdaEstado.innerText = result[i]["estado"];

                // Agregar todas las celdas a la fila
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

                // Agregar la fila a la tabla
                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

function registrarMedico() {
    let formData = {
        "tipo_documento": document.getElementById("Tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "primer_name": document.getElementById("primer_name").value,
        "segundo_name": document.getElementById("segundo_name").value,
        "primer_apellido": document.getElementById("primer_apellido").value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
        "estado": document.getElementById("estado").value
    };
        if (validarCampos) {
            //se ejecuta la peticion
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: function (result) {
                    alert("Se guardo correctamente");
                    // You can add additional logic after successful registration
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

function validarCampos(){
    var numero_documento = document.getElementById("numero_documento");
    return validarNumeroDocumento(numero_documento);
}

function validarNumeroDocumento(cuadroNumero){

    var valor=cuadroNumero.value;
    var valido=true;
    if (valor.length< 5 || valor.length > 11) {
        valido=false
    }

    if (valido) {
        //cuadro texto cumple
        cuadroNumero.className="form-control is-valid"
    }else{
        //cuadro texto no cumple
        cuadroNumero.className="form-control is-invalid"
    }
    return valido;
}