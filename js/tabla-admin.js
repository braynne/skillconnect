const tabla = document.querySelector("#lista-usuarios");
const tbody = tabla.querySelector("tbody");
/*
function cargarUsuarios() {
    try {
        fetch("../json/usuarios.json")
    .then(respuesta => respuesta.json())
    .then(usuarios => {
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            
            const username = document.createElement("td");
            username.textContent = usuario.username;

            const fullname = document.createElement("td");
            fullname.textContent = usuario.fullname;

            const role = document.createElement("td");
            role.textContent = usuario.role;

            const occupation = document.createElement("td");
            occupation.textContent = usuario.occupation;
            
            row.appendChild(username);
            row.appendChild(fullname);
            row.appendChild(role);
            row.appendChild(occupation);

            tbody.appendChild(row);
        });
    });
    } catch(error) {
        Message("Error", "JSON Fetch: No se ha podido cargar la tabla.");
    }
}
*/

function cargarUsuarios() {
    try {
        fetch("../json/usuarios.json")
    .then(respuesta => respuesta.json())
    .then(usuarios => {
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            
            const username = document.createElement("td");
            username.textContent = usuario.username;

            const fullname = document.createElement("td");
            fullname.textContent = usuario.fullname;

            const role = document.createElement("td");
            role.textContent = usuario.role;

            const occupation = document.createElement("td");
            occupation.textContent = usuario.occupation;
            
            row.appendChild(username);
            row.appendChild(fullname);
            row.appendChild(role);
            row.appendChild(occupation);

            tbody.appendChild(row);
        });
    });
    } catch(error) {
        Message("Error", "JSON Fetch: No se ha podido cargar la tabla.");
    }
}

cargarUsuarios();