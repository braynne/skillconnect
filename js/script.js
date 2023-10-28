/*function logIn() {
    const roleuser = document.getElementById("role-user");
    const rolework = document.getElementById("role-work");
    const roleadmin = document.getElementById("role-admin");

    if (roleuser.checked) {
        console.log("checked user");
        document.location.href = "home-user.html";
    } else if (rolework.checked) {
        console.log("checked worker");
        document.location.href = "home-worker.html";
    } else if (roleadmin.checked) {
        console.log("checked admin");
        document.location.href = "home-admin.html";
    }
}

function signIn() {

}
*/

async function guardarUsuario(rol) {
    console.log("guardando usuario...");
    var usernameAgregarInput = document.getElementById("usernameAgregar");
    var emailAgregarInput = document.getElementById("emailAgregar");
    var valorUsuarioAgregar = usernameAgregarInput.value;
    var valorCorreoAgregar = emailAgregarInput.value;

    console.log("Valor del campo de entrada: " + valorUsuarioAgregar);
    if (valorUsuarioAgregar === "" || valorCorreoAgregar === "") {
        Message("Error", "Entrada vacía: no se pudo agregar a este usuario");
    } else {

        try {
            const respuesta = await fetch('https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombre": usernameAgregarInput.value,
                    "correo": emailAgregarInput.value,
                    "rol": rol
                })
            });

            if (respuesta.ok) {
                const data = await respuesta.json(); // Suponiendo que la respuesta es JSON
                renderizarTabla(data);
                console.log("Respuesta exitosa:", data);
                Message("Operación completa", "Cuenta tipo " + rol + " agregado con éxito");
            } else {
                console.log("Error en la respuesta:", respuesta.status, respuesta.statusText);
                Message("Error", "Error de respuesta: No se pudo agregar a este usuario");
            }


        } catch (error) {
            console.error("Error en la solicitud:", error);
            Message("Error", "Error de conexión: No se pudo agregar a este usuario");
        }

    }

}


async function borrarUsuario() {
    var nombreEliminarInput = document.getElementById("borrarCuenta");
    var valorUsuarioEliminar = nombreEliminarInput.value;
    console.log("Valor del campo de entrada: " + valorUsuarioEliminar);

    if (valorUsuarioEliminar !== "") {
        try {
            const response = await fetch("https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12");
            const data = await response.json();

            const filaAEliminar = data.findIndex(
                    (fila) => fila.nombre === valorUsuarioEliminar
            );

            if (filaAEliminar !== -1) {
                await fetch(
                        `https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12/${filaAEliminar}`,
                        {
                            method: "DELETE"
                        }
                );

                console.log("Fila eliminada correctamente.");
                Message("Operación completa", "Usuario eliminado con éxito");

                // Llama a la función para renderizar la tabla después de eliminar la fila
                renderizarTabla(data);
            } else {
                console.log("No se encontró ninguna fila con ese nombre.");
                Message("Error", "No se encontró ninguna cuenta con ese nombre.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Message("Error", "Error de conexión: No se pudo eliminar a este usuario");
        }
    } else {
        console.error("Entrada vacía");
        Message("Error", "Entrada vacía: No se pudo eliminar a este usuario");
    }


}

async function actualizarUsuario() {
    var usernameModInput = document.getElementById("usernameMod");
    var emailModInput = document.getElementById("emailMod");
    var roleModInput = document.getElementById("roleMod");

    var valorUsuarioMod = usernameModInput.value;
    var valorCorreoMod = emailModInput.value;
    var valorRolMod = roleModInput.value;

    if (valorUsuarioMod !== "" && valorCorreoMod !== "") {
        try {
            const response = await fetch("https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12");
            const data = await response.json();

            const filaAActualizar = data.find(
                    (fila) => fila.nombre === valorUsuarioMod
            );

            if (filaAActualizar) {
                filaAActualizar.correo = valorCorreoMod;
                filaAActualizar.rol = valorRolMod;

                const index = data.indexOf(filaAActualizar);
                if (index !== -1) {
                    await fetch(
                            `https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12/${index}`,
                            {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(filaAActualizar)
                            }
                    );

                    console.log("Fila actualizada correctamente.");
                    Message("Operación completa", "Datos del usuario actualizados con éxito");

                    // Llama a la función para renderizar la tabla después de actualizar la fila
                    renderizarTabla(data);
                } else {
                    console.log("Error al encontrar la fila a actualizar.");
                    Message("Error", "No se pudo encontrar la cuenta a actualizar.");
                }
            } else {
                console.log("No se encontró ninguna fila con ese nombre.");
                Message("Error", "No se encontró ninguna cuenta con ese nombre.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Message("Error", "Error de conexión: No se pudo actualizar los datos del usuario");
        }
    } else {
        console.error("Entrada vacía");
        Message("Error", "Entrada vacía: No se pudieron actualizar los datos del usuario");
    }
}


// Esta función se llama cuando se carga la página para mostrar los datos iniciales
async function cargarTablaInicial() {
    try {
        const response = await fetch("https://sheet.best/api/sheets/293d274c-9f66-44f6-85f5-d98a0f67ca12");
        const data = await response.json();

        // Llama a la función para renderizar la tabla con los datos iniciales
        renderizarTabla(data);
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

// Esta función renderiza la tabla con los datos proporcionados
function renderizarTabla(data) {
    const tabla = document.getElementById("tablaUsuarios");
    const tbody = tabla.querySelector("tbody");

    // Borra todas las filas existentes
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Agrega las filas de datos a la tabla
    data.forEach((fila) => {
        const row = document.createElement("tr");
        const nombreCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const roleCell = document.createElement("td");
        nombreCell.textContent = fila.nombre;
        emailCell.textContent = fila.correo;
        roleCell.textContent = fila.rol;
        row.appendChild(nombreCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);
        tbody.appendChild(row);
    });
}

// Llama a la función para cargar la tabla inicial cuando se carga la página
cargarTablaInicial();


/*
 google.script.run.withSuccessHandler(showData).getData();
 
 function showData(dataArray) {
 $(document).ready(function () {
 $("#data-table").DataTable({
 data: dataArray,
 columns: [
 { "title": "Nombre de usuario" },
 { "title": "Nombre completo" },
 { "title": "Contraseña" },
 { "title": "Rol" }
 ]
 
 });
 });
 }
 
 function doGet() {
 return HtmlService.createTemplateFromFile("Index").evaluate();
 }
 
 function getData() {
 var spreadSheetId = ""; // ID
 var dataRange = "Sheet1!A2:F";
 var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
 var values = range.values;
 
 return values;
 }
 
 function include(filename) {
 return HtmlService.createHtmlOutputFromFile(filename).getContent();
 }
 */

