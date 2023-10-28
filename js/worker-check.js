const storedUser = JSON.parse(localStorage.getItem("user"));
if (!storedUser) {
    // Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    window.location.href = "login.html";
} else {
    // Comprueba el rol del usuario antes de permitir el acceso a la página
    const allowedRoles = "worker"; // Lista de roles permitidos para esta página
    if (allowedRoles !== storedUser.role) {
        // Si el rol del usuario no está permitido, redirige a la página de inicio de sesión
        window.location.href = "login.html";
    }
}