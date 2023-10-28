const container = document.querySelector("#home-grids");

function cargarUsuarios() {
    try {
        fetch("../json/usuarios.json")
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            const row = document.createElement("div");
            row.classList.add("row");

            usuarios.forEach(usuario => {

                if (usuario.role === "worker") {
                    const col = document.createElement("div");
                    col.classList.add("col-xxl-2", "col-xl-4", "col-lg-4", "col-md-6", "col-sm-12", "mt-3", "container-fluid");

                    col.innerHTML += `
                    <div class="card">
                        <img src="../img/${usuario.username}.avif" alt="${usuario.fullname}">
                        <div class="card-body">
                            <h5 class="card-title">${usuario.fullname}</h5>
                            <p class="card-text">${usuario.occupation}</p>
                            <a href="profiles/${usuario.username}.html" class="btn btn-primary form-control">Ir a perfil</a>
                        </div>
                    </div>
                    `;

                    row.appendChild(col);
                }

                container.appendChild(row);
            });

        });
    } catch (error) {
        Message("Error", "JSON Fetch: No se ha podido cargar las targetas de trabajadores.");
    }
    
}

cargarUsuarios();