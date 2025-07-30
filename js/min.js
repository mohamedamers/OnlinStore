    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

let category_nav_list = document.querySelector(".category_nav_list");

function Open_Categ_list() {
  category_nav_list.classList.toggle("active");
}
let nav_links = document.querySelector(".nav_links");
function open_Menu() {
  nav_links.classList.toggle("active");
}

var cart = document.querySelector(".cart");

function open_close_cart() {
  cart.classList.toggle("active");
}

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);

    const addToCartButtins = document.querySelectorAll(".btn_add_cart");

    addToCartButtins.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-id");
        const selectedProduct = data.find((product) => product.id == productId);

        addToCart(selectedProduct);

        const allMatchingButtons = document.querySelectorAll(
          `.btn_add_cart[data-id="${productId}"]`
        );

        allMatchingButtons.forEach((btn) => {
          btn.classList.add("active");
          btn.innerHTML = `
              <i class="fa-solid fa-cart-shopping"></i>Item in Cart
          `;
        });
      });
    });
  });

function addToCart(product) {
  // console.log(product);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart_items");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  var total_price = 0;
  var total_count = 0;

  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    let total_Price_item = item.price * item.quantity;

    total_price += total_Price_item;
    total_count += item.quantity;

    cartItemsContainer.innerHTML += `
                <div class="item_cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">$${total_Price_item}</p>
                    <div class="quantity_conrtol">
                        <button class="decrase_quantity" data-index=${index}>-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="incrase_quantity" data-index=${index}>+</button>
                    </div> 
                </div> 
                <button class="delete_item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div> 
    `;
  });

  const price_cart_total = document.querySelector(".price_cart_toral");

  const count_item_cart = document.querySelector(".Count_item_cart");

  const count_item_header = document.querySelector(".count_item_header");

  price_cart_total.innerHTML = `$ ${total_price}`;

  count_item_cart.innerHTML = total_count;

  count_item_header.innerHTML = total_count;

  const increaseButtons = document.querySelectorAll(".incrase_quantity");
  const decraseButtons = document.querySelectorAll(".decrase_quantity");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      increaseQuantity(itemIndex);
    });
  });

  decraseButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target.getAttribute("data-index");
      decraseQuantity(itemIndex);
    });
  });

  function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
  }

  function decraseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
  }

  const deleteButtons = document.querySelectorAll(".delete_item");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemIndex = event.target
        .closest("button")
        .getAttribute("data-index");

      removeFromCart(itemIndex);
    });
  });

  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const removeProduct = cart.splice(index, 1)[0];
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
    updateButtinsState(removeProduct.id);
  }

  function updateButtinsState(productId) {
    const allMatchingButtons = document.querySelectorAll(
      `.btn_add_cart[data-id="${productId}"]`
    );
    allMatchingButtons.forEach((button) => {
      button.classList.remove("active");
      button.innerHTML = `
              <i class="fa-solid fa-cart-shopping"></i> add to cart
          `;
    });
  }
}

updateCart();
