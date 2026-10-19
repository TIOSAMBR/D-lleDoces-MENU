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
        id: 11,

        name: "Cento de docinhos",

        description:
            "100 unidades - Pode escolher no mínimo 20 de cada sabor. Consultar sabores disponiveis no Whatssap...",

        price: 150,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "festa",

        categoryName: "festa",

        image: "docinhos.jpg",

        emoji: "🍰"
    },
    
    {
        id: 10,

        name: "Bolo no pote OREO ",

        description:
            "Sabor: OREO.",

        price: 15,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "oreo.jpeg",

        emoji: "🍰"
    },

    {
        id: 9,

        name: "Bolo fatia SNICKERS ",

        description:
            "Sabor: SNICKERS.",

        price: 15,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "snickers2.jpg",

        emoji: "🍰"
    },

    {
        id: 7,

        name: "Bom bom de morango cravejado ",

        description:
            "Sabor: Morango cravejado.",

        price: 10,

        available: false, // Alterar para false quando o produto estiver indisponível.

        category: "doces",

        categoryName: "doces",

        image: "morangocravejado.jpg",

        emoji: "🍫"
    },

    {
        id: 6,

        name: "Matilda",

        description:
            "Sabor: Muito gostoso rsrs.",

        price: 20,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "matilda.jpg",

        emoji: "🍰"
    },

    {
        id: 1,

        name: "Bolo pedaço",

        description:
            "Sabor: Cacau black.",

        price: 10,

        available: true, // Alterar para false quando o produto estiver indisponível.

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

        available: true, // Alterar para false quando o produto estiver indisponível.

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

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "Bolos",

        image: "musse de limao.jpg",

        emoji: "🍰"
    },

    {
        id: 4,

        name: "Bolo no pote",

        description:
            "Sabor: Prestígio.",

        price: 14,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "prestigio.jpg",

        emoji: "🍰"
    },

    {
        id: 5,

        name: "Bolo gelado",

        description:
            "Sabor: Creme de ninho com geleia de morango caseira.",

        price: 14,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "morango.jpg",

        emoji: "🍰"
    },

    {
        id: 8,

        name: "Bolo gelado",

        description:
            "Sabor: Cocada cremosa com ameixa.",

        price: 14,

        available: true, // Alterar para false quando o produto estiver indisponível.

        category: "bolos",

        categoryName: "bolos",

        image: "cocada cremosa.jpg",

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

        available: true, // Alterar para false quando o produto estiver indisponível.

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

            const available = product.available !== false;

            return `

                <article
                    class="product-card ${available ? '' : 'product-unavailable'}"
                    data-id="${product.id}">

                    <div class="product-image" style="--foto-url: url('${encodeURI(product.image)}');">

                        <div class="product-image-meta">
                            <span class="product-category">
                                ${product.categoryName}
                            </span>

                            <span class="product-availability ${available ? 'is-available' : 'is-unavailable'}">
                                ${available ? '● Disponível' : '● Indisponível'}
                            </span>
                        </div>

                        <button
                            type="button"
                            class="product-photo-trigger"
                            onclick="openProductPhoto(${product.id})"
                            aria-label="Ver foto completa de ${product.name}">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                                decoding="async"
                                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">

                            <div class="image-placeholder" style="display:none;">
                                <span>${product.emoji}</span>
                                <small>Délle Doces</small>
                            </div>

                            <span class="photo-zoom-hint">🔍 Ver foto</span>
                        </button>
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
                                class="add-product ${available ? '' : 'add-product-disabled'}"
                                onclick="addToCart(${product.id})"
                                aria-label="${available ? `Adicionar ${product.name}` : `${product.name} indisponível`}"
                                ${available ? '' : 'disabled'}>

                                ${available ? '+' : 'Indisponível'}

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

    // Proteção adicional: produtos indisponíveis não podem ser pedidos.
    if (product.available === false) {
        showToast("Este produto está indisponível no momento.");
        return;
    }


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

    const product = products.find(product => product.id === productId);
    if (amount > 0 && (!product || product.available === false)) {
        showToast("Este produto está indisponível no momento.");
        return;
    }

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

    // Confere novamente a disponibilidade antes de finalizar.
    const unavailableIds = cart
        .filter(item => {
            const product = products.find(product => product.id === item.id);
            return !product || product.available === false;
        })
        .map(item => item.id);

    if (unavailableIds.length) {
        cart = cart.filter(item => !unavailableIds.includes(item.id));
        updateCart();
        showToast("Um produto ficou indisponível e foi removido do pedido.");
        return;
    }

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
        `Olá! Gostaria de fazer um pedido na Délle Doces. 🍰\n\n`;


    message +=
        `*Nome:* ${name}\n\n`;


    message +=
        `*Pedido:*\n`;


    cart.forEach(item => {

        const total =
            item.price * item.quantity;


        let sabor = "";


        if (item.description) {

            sabor = item.description
                .replace(/^Sabor:\s*/i, "")
                .trim()
                .replace(/\.$/, "");

        }


        const nomeProduto =
            sabor
                ? `${item.name.trim()} — ${sabor}`
                : item.name.trim();


        message +=
            `• ${item.quantity}x ${nomeProduto} — ${money(total)}\n`;

    });


    message +=
        `\n*Total: ${money(getCartTotal())}*`;


    if (observation) {

        message +=
            `\n\n*Observação:* ${observation}`;

    }


    message +=
        `\n\nObrigado! 💕`;


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;


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
   VISUALIZADOR DE FOTOS
========================================= */

const photoOverlay = document.getElementById("photoOverlay");
const expandedProductPhoto = document.getElementById("expandedProductPhoto");
const photoTitle = document.getElementById("photoTitle");
const closePhotoButton = document.getElementById("closePhoto");
let photoPreviousFocus = null;

function openProductPhoto(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    photoPreviousFocus = document.activeElement;
    photoTitle.textContent = product.name;
    expandedProductPhoto.src = product.image;
    expandedProductPhoto.alt = `Foto completa de ${product.name}`;
    photoOverlay.classList.add("open");
    photoOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-open");
    closePhotoButton.focus();
}

function closeProductPhoto() {
    if (!photoOverlay.classList.contains("open")) return;
    photoOverlay.classList.remove("open");
    photoOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-open");
    expandedProductPhoto.removeAttribute("src");

    if (photoPreviousFocus?.isConnected) photoPreviousFocus.focus();
}

closePhotoButton.addEventListener("click", closeProductPhoto);
photoOverlay.addEventListener("click", event => {
    if (event.target === photoOverlay) closeProductPhoto();
});

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

            closeProductPhoto();
            closeCartModal();

        }

        if (event.key === "Tab" && photoOverlay.classList.contains("open")) {
            // O visualizador possui um único botão: mantenha o foco nele.
            event.preventDefault();
            closePhotoButton.focus();
        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderProducts();

updateCart();
