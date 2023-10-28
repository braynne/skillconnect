function mostrarMensajes() {
    // Obtiene la lista de mensajes del Local Storage
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Accede al elemento <ul> con el id "lista-mensajes" donde deseas mostrar los mensajes
    const listaMensajes = document.getElementById("lista-mensajes");

    // Limpia cualquier contenido previo de la lista
    listaMensajes.innerHTML = "";

    // Itera sobre la lista de mensajes y crea elementos <li> para mostrarlos
    mensajes.forEach(mensajeObj => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>De:</strong> ${mensajeObj.correo}<br>
            <strong>Asunto:</strong> ${mensajeObj.asunto}<br>
            <strong>Mensaje:</strong> ${mensajeObj.mensaje}
        `;
        listaMensajes.appendChild(listItem);
    });
}

// Llama a esta función para mostrar los mensajes en la lista en la carga inicial de la página
mostrarMensajes();
