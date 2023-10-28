// Function to add a user to the JSON file

function cargarUsuarios() {
    return fetch("../json/usuarios.json")
    .then(respuesta => respuesta.json())
    .catch(error => {
        console.error("Error loading usuarios JSON");
    });
}

cargarUsuarios().then(data => {
    usuarios = data;
});

let newuser = {
    username: null,
    password: null,
    email: null,
    phone: null,
    fullname: null,
    role: "user",
    city: null,
    company: null,
    occupation: null,
    verified: false
};

function user() {

    newuser = {
        username: document.getElementById("form-username"),
        password: document.getElementById("form-password"),
        email: document.getElementById("form-email"),
        phone: document.getElementById("form-phone"),
        fullname: document.getElementById("form-fullname"),
        role: "user",
        city: document.getElementById("form-city"),
        company: null,
        occupation: null,
        verified: false
    };

    return newuser;
}

function agregarUsuario(usuario) {
    // Check if the username already exists in the usuarios array
    const usernameExists = usuarios.some(existingUser => existingUser.username === usuario.username);

    if (!usernameExists && usuario.username !== null) {
        
        // If the username doesn't exist, add the user to the usuarios array
        usuarios.push(usuario);
        guardarUsuariosEnJson(); // Call a function to save the updated usuarios array to JSON
        cargarUsuarios(); // Reload the user cards
        return true; // Return true to indicate success
    } else {
        // If the username already exists, return false to indicate failure
        
        return false;
    }
}

// Function to remove a user by username from the JSON file
function eliminarUsuario(username) {
    // Find the index of the user with the given username
    const userIndex = usuarios.findIndex(usuario => usuario.username === username);

    if (userIndex !== -1) {
        // If the user exists, remove it from the usuarios array
        usuarios.splice(userIndex, 1);
        guardarUsuariosEnJson(); // Call a function to save the updated usuarios array to JSON
        cargarUsuarios(); // Reload the user cards
        return true; // Return true to indicate success
    } else {
        // If the user doesn't exist, return false to indicate failure
        return false;
    }
}

// Function to save the updated usuarios array to the JSON file
function guardarUsuariosEnJson() {
    // Assuming usuarios is the updated array of users
    const updatedData = JSON.stringify(usuarios);
    
    // Use fetch to update the JSON file (replace 'your_json_file.json' with your actual file path)
    fetch('../json/usuarios.json', {
        method: 'PUT', // You can use POST or PUT based on your server's API
        headers: {
            'Content-Type': 'application/json'
        },
        body: updatedData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Call cargarUsuarios to load user data initially
cargarUsuarios();