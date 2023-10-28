document.addEventListener("DOMContentLoaded", function() {
    function cargarNombre() {
        console.log("cargando el nombre...");
        let usernameAlmacenado = obtenerUsernameDesdeLocalStorage();
        if (usernameAlmacenado) {
            console.log("Username almacenado en localStorage: " + usernameAlmacenado);
        } else {
            console.log("No se encontró un usuario en localStorage.");
        }

        document.getElementById("nombre-usuario").innerHTML = usernameAlmacenado



    }
    cargarNombre();
    cargarDatosPerfil();

    function cargarDatosPerfil() {
        
    // Obtén los valores del Local Storage
    var userData = JSON.parse(localStorage.getItem("user"));

    // Verifica si los datos existen en el Local Storage
    if (userData) {
    var username = userData.username;
    var role = userData.role;
    var occupation = userData.occupation;
    var fullName = userData.fullname;

    // Obtén el elemento de la tabla por su ID
    var tabla = document.getElementById("datos_perfil");

    // Crea una nueva fila y celdas
    var fila = tabla.insertRow();
    var cellUsername = fila.insertCell(0);
    var cellRole = fila.insertCell(1);
    var cellOccupation = fila.insertCell(2);
    var cellFullName = fila.insertCell(3);

    // Llena las celdas con los valores obtenidos del Local Storage
    cellUsername.innerHTML = username;
    cellRole.innerHTML = role;
    cellOccupation.innerHTML = occupation;
    cellFullName.innerHTML = fullName;
    } else {
    console.log("No se encontraron datos en el Local Storage.");
    }

        
    }




});

function obtenerUsernameDesdeLocalStorage() {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        let username = storedUser.username;
        
        return username;
    } else {
        return null; 
    }
}


