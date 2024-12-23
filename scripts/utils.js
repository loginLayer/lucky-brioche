const crearHTML = (item) => {
  const html = `
        <article data-id="${item.id}">
          <div class="product-card">
            <div class="product-image-container">
                <button class="add-to-cart">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <img src="${item.image}" alt="${item.title}" class="product-image">
            </div>
            <div class="product-info">
              <h3 class="product-title">${item.title}</h3>
              <p class="product-description">${item.description}</p>
              <button type="button" class="agregar" >Comprar</button>
              <p class="product-price">$ ${item.price}</p>
            </div>
          </div>
        </article>
  `;
  return html;
};

const mostrarProductos = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const array = await response.json();

    const listaProductos = document.querySelector("#lista-productos");
    listaProductos.innerHTML = "";
    array.forEach((item) => {
      const elementos = crearHTML(item);
      listaProductos.innerHTML += elementos;
    });
  } catch (error) {
    console.error(error);
  }
};

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("agregar")) {
    const article = event.target.closest("article");
    const id = article.dataset.id;
    const nombre = article.querySelector("h3").textContent;
    const precio = parseFloat(article.querySelector("p:nth-of-type(2)").textContent.replace("$", ""));
    const producto = carrito.find((item) => item.id === id);

    if (producto) {
      producto.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});

mostrarProductos();


function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
}


function actualizarCarrito() {
  const cartBox = document.querySelector(".cart-box");
  const total = calcularTotal();
  cartBox.innerHTML = `<span class="material-symbols-outlined cart-icon">shopping_cart</span>$ ${total}`;
}


document.addEventListener("click", (event) => {
  if (event.target.classList.contains("agregar")) {
      const article = event.target.closest("article");
      const id = article.dataset.id;
      const nombre = article.querySelector("h3").textContent;
      const precio = parseFloat(article.querySelector("p:nth-of-type(2)").textContent.replace("$", ""));
      const producto = carrito.find((item) => item.id === id);

      if (producto) {
          producto.cantidad += 1;
      } else {
          carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito(); // Actualiza el total
  }
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
});
