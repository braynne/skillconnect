function cargarUsuarios() {
    return fetch("../json/usuarios.json")
            .then(respuesta => respuesta.json())
            .catch(error => {
                console.error("Error loading usuarios JSON");
            });
}

function login() {
    let usuario = document.getElementById("usernameAgregar").value;
    let contraseña = document.getElementById("passwdAgregar").value;

    // ...
    cargarUsuarios()
            .then(usuarios => {
                // You can perform the login check here
                const userToCheck = usuarios.find(user => user.username === usuario && user.password === contraseña);

                if (userToCheck) {
                    // Successful login
                    sesion(userToCheck.username, userToCheck.password, userToCheck.role, userToCheck.fullname, userToCheck.occupation);

                    if (userToCheck.role === "admin") {
                        window.location.href = "home-admin.html";
                    } else if (userToCheck.role === "user") {
                        window.location.href = "home-user.html";
                    } else if (userToCheck.role === "worker") {
                        window.location.href = "home-worker.html";
                    }

                    console.log("Login successful");
                    console.log();
                } else {
                    // Invalid login
                    Message("Error", "Invalid username or password");
                }
            })
            .catch(error => {
                console.error("Error during login:", error);
            });
// ...

}

function sesion(username, password, role, fullname, occupation) {
    let usuario = {
        username: username,
        password: password,
        role: role,
        fullname: fullname,
        occupation: occupation
    };

    // Guarda el usuario en localStorage como una cadena JSON
    localStorage.setItem("user", JSON.stringify(usuario));

    // Recupera y parsea el usuario almacenado en localStorage
    let storedUser = JSON.parse(localStorage.getItem("user"));

    return storedUser;
}
