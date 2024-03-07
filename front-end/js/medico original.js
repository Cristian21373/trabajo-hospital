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
                let celdaCorreo = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");  // Nueva celda para el botón "Eliminar"
                let celdaEliminar = document.createElement("td");  // Nueva celda para el botón "Eliminar"

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


               // Agregar el botón "Editar"
            let botonEditar = document.createElement("a");
            botonEditar.className = "btn btn-primary";
            botonEditar.textContent = "Editar";
            botonEditar.id = "btnEditar";
            botonEditar.setAttribute("data-id", result[i]["id"]);
      

                let botonEliminar = document.createElement("button");
                botonEliminar.className = "btn btn-danger";
                botonEliminar.textContent = "Eliminar";

        
                    

    // Agregar el evento onclick al botón
    botonEditar.onclick = function() {
        editarMedico(result[i]["id"]);
        // Aquí puedes colocar el código que se ejecutará cuando se haga clic en el botón
        console.log("Botón editar clickeado");

        // Obtener el modal existente o crear uno si no existe
        let modal = document.getElementById("staticBackdrop");
        if (!modal) {
            let modalCode = `
            <!-- Modal -->
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
                        <div class="col col-xl-6 col-12">
                            <label for="Tipo_documento">Tipo documento</label>
                            <select id="tipo_documento" class="form-select">
                                <option value="" selected disabled>Seleccione una opción</option>
                                <option value="CC">Cedula de Ciudadanía</option>
                                <option value="CE">Cedula de Extranjería</option>
                            </select>
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="numero_documento">Número de documento</label>
                            <input type="number" id="numero_documento" step="1" class="form-control" onfocusout="validarNumeroDocumento(this);">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="primer_name">Primer Nombre</label>
                            <input type="text" id="primer_name" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="segundo_name">Segundo Nombre</label>
                            <input type="text" id="segundo_name" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="primer_apellido">Primer Apellido</label>
                            <input type="text" id="primer_apellido" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="segundo_apellido">Segundo Apellido</label>
                            <input type="text" id="segundo_apellido" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="telefono">Teléfono</label>
                            <input type="text" id="telefono" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="correo">Correo</label>
                            <input type="text" id="correo" class="form-control">
                        </div>
                        <div class="col col-xl-6 col-12">
                            <label for="estado">Estado</label>
                            <select id="estado" class="form-select">
                                <option value="" selected disabled>Seleccione una opción</option>
                                <option value="Habilitado">Habilitado</option>
                                <option value="Deshabilitado">Deshabilitado</option>
                            </select>
                        </div>
            
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

        // Crear un contenedor para el modal
        let modalContainer = document.createElement("div");
        modalContainer.innerHTML = modalCode;

        // Agregar el modal al DOM
        document.body.appendChild(modalContainer);
        
        // Actualizar la referencia al modal
        modal = document.getElementById("staticBackdrop");
    }

    // Activar el modal
    let modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

            celdaEditar.appendChild(botonEditar);  // Agregar el botón a la celda "Editar"
            celdaEliminar.appendChild(botonEliminar);

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
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);  // Agregar la celda "Eliminar" a la fila

                

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


