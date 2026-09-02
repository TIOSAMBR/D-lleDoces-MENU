/* =========================================
   DÉLLE DOCES
   CARDÁPIO ONLINE
========================================= */


/* =========================================
   CONFIGURAÇÕES
========================================= */

const WHATSAPP = "5564993344362";


/* =========================================
   PRODUTOS
========================================= */

const products = [

    {
        id: 1,

        name: "Bolo pedaço",

        description:
            "Sabor: Cacau black.",

        price: 10,

        category: "bolos",

        categoryName: "Bolos",

        image: "cacau black.jpg",

        emoji: "🍰"
    },


    {
        id: 2,

        name: "Bolo no pote",

        description:
            "Sabor: ninho, côco e abacaxi.",

        price: 14,

        category: "bolos",

        categoryName: "Bolos",

        image: "abacaxi.jpg",

        emoji: "🧁"
    },


    {
        id: 3,

        name: "Bolo gelado",

        description:
            "Sabor: mousse de limão suave com geleia de frutas vermelhas caseira.",

        price: 14,

        category: "bolos",

        categoryName: "Bolos",

        image: "musse de limão.jpg",

        emoji: "🍰"
    },

    {
        id: 4,

        name: "Bolo no pote",

        description:
            "Sabor: Prestígio.",

        price: 14,

        category: "bolos",

        categoryName: "bolos",

        image: "prestigio.png",

        emoji: "🍰"
    },

    {
        id: 5,

        name: "Bolo gelado",

        description:
            "Sabor: Creme de ninho com geleia de morango caseira.",

        price: 14,

        category: "bolos",

        categoryName: "bolos",

        image: "morango.jpg",

        emoji: "🍰"
    },

    {
        id: 6,

        name: "Matilda",

        description:
            "Sabor: Muito gostoso rsrs.",

        price: 20,

        category: "bolos",

        categoryName: "bolos",

        image: "matilda.jpg",

        emoji: "🍰"
    },

    {
        id: 7,

        name: "Bom bom de morango cravejado ",

        description:
            "Sabor: Morango cravejado.",

        price: 10,

        category: "doces",

        categoryName: "doces",

        image: "morangocravejado.jpg",

        emoji: "🍫"
    },

    {
        id: 8,

        name: "Bolo gelado",

        description:
            "Sabor: Cocada cremosa com ameixa.",

        price: 14,

        category: "bolos",

        categoryName: "bolos",

        image: "cocada cremosa.jpg",

        emoji: "🍰"
    },

    {
        id: 9,

        name: "Bolo fatia SNICKERS ",

        description:
            "Sabor: SNICKERS.",

        price: 15,

        category: "bolos",

        categoryName: "bolos",

        image: "snickers.jpg",

        emoji: "🍰"
    },



    /*
    =========================================
    EXEMPLO DE NOVO PRODUTO
    =========================================

    {
        id: 4,

        name: "Brigadeiro",

        description:
            "Brigadeiro artesanal, cremoso e delicioso.",

        price: 5,

        category: "doces",

        categoryName: "Doces",

        image: "img/brigadeiro.jpg",

        emoji: "🍫"
    }

    */

];


/* =========================================
   ESTADO
========================================= */

let cart = [];


/* =========================================
   ELEMENTOS
========================================= */

const productsGrid =
    document.getElementById("productsGrid");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartCheckout =
    document.getElementById("cartCheckout");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const customerName =
    document.getElementById("customerName");

const orderObservation =
    document.getElementById("orderObservation");

const whatsappButton =
    document.getElementById("whatsappButton");

const continueShopping =
    document.getElementById("continueShopping");

const toast =
    document.getElementById("toast");


/* =========================================
   FORMATAÇÃO DE MOEDA
========================================= */

function money(value) {

    return value.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


/* =========================================
   RENDERIZAR PRODUTOS
========================================= */

function renderProducts(category = "todos") {

    const filteredProducts =
        category === "todos"

            ? products

            : products.filter(
                product =>
                    product.category === category
            );


    if (!filteredProducts.length) {

        productsGrid.innerHTML = `

            <div class="empty-products">

                <p>
                    Nenhum produto encontrado.
                </p>

            </div>

        `;

        return;

    }


    productsGrid.innerHTML =
        filteredProducts.map(product => {

            return `

                <article
                    class="product-card"
                    data-id="${product.id}">

                    <div class="product-image">

                        <span class="product-category">
                            ${product.categoryName}
                        </span>


                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">


                        <div
                            class="image-placeholder"
                            style="display:none;">

                            <span>
                                ${product.emoji}
                            </span>

                            <small>
                                Délle Doces
                            </small>

                        </div>

                    </div>


                    <div class="product-content">

                        <h2 class="product-name">
                            ${product.name}
                        </h2>


                        <p class="product-description">
                            ${product.description}
                        </p>


                        <div class="product-footer">

                            <strong class="product-price">
                                ${money(product.price)}
                            </strong>


                            <button
                                class="add-product"
                                onclick="addToCart(${product.id})"
                                aria-label="Adicionar ${product.name}">

                                +

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} adicionado ao pedido!`
    );

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );

    }


    updateCart();

}


/* =========================================
   TOTAL DO CARRINHO
========================================= */

function getCartTotal() {

    return cart.reduce(

        (total, item) => {

            return total +
                (item.price * item.quantity);

        },

        0

    );

}


/* =========================================
   QUANTIDADE TOTAL
========================================= */

function getCartQuantity() {

    return cart.reduce(

        (total, item) => {

            return total + item.quantity;

        },

        0

    );

}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function updateCart() {

    const quantity =
        getCartQuantity();

    const total =
        getCartTotal();


    cartCount.textContent =
        quantity === 1

            ? "1 item"

            : `${quantity} itens`;


    cartTotal.textContent =
        money(total);


    checkoutTotal.textContent =
        money(total);


    renderCartItems();


    if (quantity > 0) {

        cartButton.classList.add("visible");

    } else {

        cartButton.classList.remove("visible");

    }

}


/* =========================================
   RENDERIZAR ITENS DO CARRINHO
========================================= */

function renderCartItems() {

    if (!cart.length) {

        cartItems.innerHTML = "";

        emptyCart.style.display = "block";

        cartCheckout.style.display = "none";

        return;

    }


    emptyCart.style.display = "none";

    cartCheckout.style.display = "block";


    cartItems.innerHTML =

        cart.map(item => {

            const itemTotal =
                item.price * item.quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <div class="cart-item-name">
                            ${item.name}
                        </div>

                        <div class="cart-item-price">
                            ${money(item.price)} cada
                        </div>

                    </div>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                            aria-label="Diminuir quantidade">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                            aria-label="Aumentar quantidade">

                            +

                        </button>

                    </div>


                    <div class="cart-item-total">
                        ${money(itemTotal)}
                    </div>

                </div>

            `;

        }).join("");

}


/* =========================================
   ABRIR CARRINHO
========================================= */

function openCart() {

    cartOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

}


/* =========================================
   FECHAR CARRINHO
========================================= */

function closeCartModal() {

    cartOverlay.classList.remove("open");

    document.body.style.overflow = "";

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   FINALIZAR PELO WHATSAPP
========================================= */

function sendToWhatsApp() {

    if (!cart.length) {

        showToast(
            "Adicione algum produto ao pedido."
        );

        return;

    }


    const name =
        customerName.value.trim();


    const observation =
        orderObservation.value.trim();


    if (!name) {

        customerName.focus();

        showToast(
            "Digite seu nome para continuar."
        );

        return;

    }


    let message =

        `Olá! Gostaria de fazer um pedido na Délle Doces. 🍰%0A%0A`;


    message +=
        `*Nome:* ${name}%0A%0A`;


    message +=
        `*Pedido:*%0A`;


    cart.forEach(item => {

        const total =
            item.price * item.quantity;


        message +=

            `• ${item.quantity}x ${item.name} — ${money(total)}%0A`;

    });


    message +=
        `%0A*Total: ${money(getCartTotal())}*`;


    if (observation) {

        message +=

            `%0A%0A*Observação:* ${observation}`;

    }


    message +=

        `%0A%0AObrigado! 💕`;


    const url =
        `https://wa.me/${WHATSAPP}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   EVENTOS
========================================= */


/* Abrir carrinho */

cartButton.addEventListener(
    "click",
    openCart
);


/* Fechar */

closeCart.addEventListener(
    "click",
    closeCartModal
);


/* Continuar comprando */

continueShopping.addEventListener(
    "click",
    closeCartModal
);


/* Clicar fora do modal */

cartOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === cartOverlay
        ) {

            closeCartModal();

        }

    }
);


/* WhatsApp */

whatsappButton.addEventListener(
    "click",
    sendToWhatsApp
);


/* =========================================
   CATEGORIAS
========================================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                renderProducts(
                    button.dataset.category
                );

            }
        );

    });


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCartModal();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderProducts();

updateCart();