/*function enviarMensaje() {
    let correo = document.getElementById("input-correo");
    let asunto = document.getElementById("input-asunto");
    let texto = document.getElementById("input-text");

    if(correo.value !== "" && texto.value !== "") {
        Message(correo.value, "Asunto: "+asunto.value+"\nMensaje: "+texto.value);
    } else {
        Message("Error", "Entrada vacía: No se pudo enviar el mensaje");
    }
}*/

function enviarMensaje() {
    const correo = document.getElementById("input-correo").value;
    const asunto = document.getElementById("input-asunto").value;
    const mensaje = document.getElementById("input-text").value;

    // Obtén la lista actual de mensajes del Local Storage o crea una lista vacía si no existe
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Crea un objeto para representar el mensaje
    const nuevoMensaje = {
        correo: correo,
        asunto: asunto,
        mensaje: mensaje
    };

    // Agrega el nuevo mensaje a la lista
    mensajes.push(nuevoMensaje);

    // Guarda la lista actualizada en el Local Storage
    localStorage.setItem("mensajes", JSON.stringify(mensajes));

    // Limpia los campos del formulario después de enviar el mensaje
    document.getElementById("input-correo").value = "";
    document.getElementById("input-asunto").value = "";
    document.getElementById("input-text").value = "";

    // Llama a la función para mostrar los mensajes
    //mostrarMensajes();
}


function Message(type, bodytext) {
    const messageTrigger = document.getElementById("button-signin");
    const message = document.getElementById("message");

    const messageType = document.getElementById("message-type");
    messageType.textContent = type;

    const messageText = document.getElementById("message-text");
    messageText.textContent = bodytext;

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(message);
    toastBootstrap.show();
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}