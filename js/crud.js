let users = [];

// Función para agregar un usuario
function addUser(username, password, role, occupation) {
    users.push({username, password, role, occupation});
    saveUsersToLocalStorage();
    displayUsers();
}

// Función para eliminar un usuario
function deleteUser(index) {
    users.splice(index, 1);
    saveUsersToLocalStorage();
    displayUsers();
}

// Función para mostrar la lista de usuarios
function displayUsers() {
    const tbody = document.getElementById("user-list");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        
        const username = document.createElement("td");
        username.textContent = user.username;

        const password = document.createElement("td");
        password.textContent = user.password;

        const role = document.createElement("td");
        role.textContent = user.role;

        const occupation = document.createElement("td");
        occupation.textContent = user.occupation;

        const actions = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            deleteUser(index);
        });

        actions.appendChild(deleteButton);

        row.appendChild(username);
        row.appendChild(password);
        row.appendChild(role);
        row.appendChild(occupation);
        row.appendChild(actions);

        tbody.appendChild(row);
    });
}


// Función para guardar los usuarios en localStorage
function saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Cargar usuarios almacenados en localStorage (si los hay)
const storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers);
}

// Mostrar usuarios existentes al cargar la página
displayUsers();

// Evento para agregar usuarios
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const occupation = document.getElementById("occupation").value;
    addUser(username, password, role, occupation);
    userForm.reset();
});

/*function cargarUsuarios() {
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

cargarUsuarios();*/