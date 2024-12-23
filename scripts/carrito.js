let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const items = document.querySelector(".items");
    const totalCompra = document.getElementById("total-compra");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const btnVaciar = document.getElementById("btn-vaciar");
    const cartBox = document.querySelector(".cart-box");

    function renderCarrito() {
        items.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const html = `
                <tr data-id="${item.id}">
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>$ ${item.precio}</td>
                    <td>
                        <button class="btn-eliminar btn" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;
            items.innerHTML += html;
            total += item.precio * item.cantidad;
        });

        totalCompra.textContent = total.toFixed(2);
        updateCartTotal(total);

        document.querySelectorAll(".btn-eliminar").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                eliminarProducto(index);
            });
        });
    }

    function updateCartTotal(total) {
        // Actualiza el total en la cabecera
        cartBox.innerHTML = `
            <span class="material-symbols-outlined cart-icon">shopping_cart</span>
            $ ${total.toFixed(2)}
        `;
    }

    function eliminarProducto(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    btnVaciar.addEventListener("click", () => {
        carrito = []; // Vaciar el array
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    });

    btnConfirmar.addEventListener("click", () => {
        alert("Gracias por su Compra");
        window.location.href = "index.html";
    });

    renderCarrito();