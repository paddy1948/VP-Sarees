/* ============================================
   VP SAREES
   CUSTOMER CART COMPONENT
   ============================================ */

import {
    VPProducts,
    getProductById
} from "../../js/products.js";


/* ============================================
   CART STORAGE
   ============================================ */

const CART_STORAGE_KEY =
    "vp_sarees_cart";


/* ============================================
   CART STATE
   ============================================ */

let cartItems = [];

let cartRoot = null;


/* ============================================
   LOAD CART
   ============================================ */

function loadCart() {

    try {

        const savedCart =
            sessionStorage.getItem(
                CART_STORAGE_KEY
            );


        if (!savedCart) {

            cartItems = [];

            return;
        }


        const parsedCart =
            JSON.parse(savedCart);


        if (!Array.isArray(parsedCart)) {

            cartItems = [];

            return;
        }


        cartItems =
            parsedCart.filter(
                item =>
                    item &&
                    item.id !== undefined &&
                    Number(item.quantity) > 0
            );

    }

    catch (error) {

        console.error(
            "VP Cart: Could not load cart.",
            error
        );

        cartItems = [];

    }

}


/* ============================================
   SAVE CART
   ============================================ */

function saveCart() {

    try {

        sessionStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems)
        );

    }

    catch (error) {

        console.error(
            "VP Cart: Could not save cart.",
            error
        );

    }

}


/* ============================================
   FIND CART ITEM
   ============================================ */

function findCartItem(
    productId
) {

    return cartItems.find(
        item =>
            String(item.id) ===
            String(productId)
    );

}


/* ============================================
   ADD TO CART
   ============================================ */

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        getProductById(productId);


    if (!product) {

        console.error(
            `VP Cart: Product ${productId} not found.`
        );

        return false;
    }


    const existingItem =
        findCartItem(productId);


    if (existingItem) {

        existingItem.quantity +=
            Math.max(
                1,
                Number(quantity)
            );

    }

    else {

        cartItems.push({

            id: product.id,

            quantity:
                Math.max(
                    1,
                    Number(quantity)
                )

        });

    }


    saveCart();

    renderCart();

    updateHeaderCartCount();

    return true;

}


/* ============================================
   REMOVE FROM CART
   ============================================ */

function removeFromCart(
    productId
) {

    cartItems =
        cartItems.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    saveCart();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   UPDATE QUANTITY
   ============================================ */

function updateQuantity(
    productId,
    quantity
) {

    const item =
        findCartItem(productId);


    if (!item) {

        return;
    }


    const newQuantity =
        Number(quantity);


    if (
        !Number.isFinite(newQuantity) ||
        newQuantity <= 0
    ) {

        removeFromCart(
            productId
        );

        return;
    }


    item.quantity =
        Math.floor(newQuantity);


    saveCart();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   INCREASE QUANTITY
   ============================================ */

function increaseQuantity(
    productId
) {

    const item =
        findCartItem(productId);


    if (!item) {

        return;
    }


    item.quantity += 1;


    saveCart();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   DECREASE QUANTITY
   ============================================ */

function decreaseQuantity(
    productId
) {

    const item =
        findCartItem(productId);


    if (!item) {

        return;
    }


    if (item.quantity <= 1) {

        removeFromCart(
            productId
        );

        return;
    }


    item.quantity -= 1;


    saveCart();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   CLEAR CART
   ============================================ */

function clearCart() {

    cartItems = [];

    saveCart();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   GET CART COUNT
   ============================================ */

function getCartCount() {

    return cartItems.reduce(
        (
            total,
            item
        ) =>
            total +
            Number(
                item.quantity || 0
            ),
        0
    );

}


/* ============================================
   GET CART SUBTOTAL
   ============================================ */

function getCartSubtotal() {

    return cartItems.reduce(
        (
            total,
            item
        ) => {

            const product =
                getProductById(
                    item.id
                );


            if (!product) {

                return total;
            }


            return (
                total +
                (
                    Number(
                        product.price
                    ) *
                    Number(
                        item.quantity
                    )
                )
            );

        },
        0
    );

}


/* ============================================
   FORMAT PRICE
   ============================================ */

function formatPrice(
    value
) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* ============================================
   UPDATE CART COUNT
   ============================================ */

function updateCartCount() {

    if (!cartRoot) {

        return;
    }


    const countElement =
        cartRoot.querySelector(
            "[data-cart-count]"
        );


    if (countElement) {

        countElement.textContent =
            getCartCount();

    }


    updateHeaderCartCount();

}


/* ============================================
   UPDATE HEADER CART COUNT
   ============================================ */

function updateHeaderCartCount() {

    const count =
        getCartCount();


    const headerCountElements =
        document.querySelectorAll(
            "[data-header-cart-count]"
        );


    headerCountElements.forEach(
        element => {

            element.textContent =
                count;


            element.setAttribute(
                "data-count",
                String(count)
            );


            element.setAttribute(
                "aria-label",
                `${count} item${
                    count === 1
                        ? ""
                        : "s"
                } in cart`
            );

        }
    );

}


/* ============================================
   UPDATE SUMMARY
   ============================================ */

function updateSummary() {

    if (!cartRoot) {

        return;
    }


    const subtotal =
        getCartSubtotal();


    const subtotalElement =
        cartRoot.querySelector(
            "[data-cart-subtotal]"
        );


    const totalElement =
        cartRoot.querySelector(
            "[data-cart-total]"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(
                subtotal
            );

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                subtotal
            );

    }

}


/* ============================================
   CREATE CART ITEM
   ============================================ */

function createCartItem(
    item
) {

    const product =
        getProductById(
            item.id
        );


    if (!product) {

        return null;
    }


    const itemElement =
        document.createElement(
            "article"
        );


    itemElement.className =
        "vp-cart__item";


    const itemTotal =
        Number(
            product.price
        ) *
        Number(
            item.quantity
        );


    const productImage =
        product.gallery?.[0] ||
        product.image ||
        "";


    itemElement.innerHTML = `

        <div class="vp-cart__item-image">

            <img
                src="${escapeHtml(
                    productImage
                )}"
                alt="${escapeHtml(
                    product.name
                )}"
                loading="lazy"
            >

        </div>


        <div class="vp-cart__item-info">

            <h3 class="vp-cart__item-name">
                ${escapeHtml(
                    product.name
                )}
            </h3>


            <span class="vp-cart__item-meta">
                ${escapeHtml(
                    product.material || ""
                )}
            </span>


            <span class="vp-cart__item-price">
                ${formatPrice(
                    itemTotal
                )}
            </span>

        </div>


        <div class="vp-cart__item-controls">

            <div
                class="vp-cart__quantity"
                aria-label="Quantity"
            >

                <button
                    type="button"
                    data-cart-action="decrease"
                    data-product-id="${product.id}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>


                <span
                    class="vp-cart__quantity-value"
                >
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    data-cart-action="increase"
                    data-product-id="${product.id}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>


            <button
                type="button"
                class="vp-cart__remove"
                data-cart-action="remove"
                data-product-id="${product.id}"
            >
                Remove
            </button>

        </div>

    `;


    return itemElement;

}


/* ============================================
   ESCAPE HTML
   ============================================ */

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ============================================
   RENDER CART ITEMS
   ============================================ */

function renderItems() {

    if (!cartRoot) {

        return;
    }


    const itemsContainer =
        cartRoot.querySelector(
            "[data-cart-items]"
        );


    const emptyState =
        cartRoot.querySelector(
            "[data-cart-empty]"
        );


    const summary =
        cartRoot.querySelector(
            "[data-cart-summary]"
        );


    if (!itemsContainer) {

        return;
    }


    itemsContainer.innerHTML =
        "";


    if (
        cartItems.length === 0
    ) {

        if (emptyState) {

            emptyState.hidden =
                false;

        }


        if (summary) {

            summary.hidden =
                true;

        }


        return;
    }


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    if (summary) {

        summary.hidden =
            false;

    }


    cartItems.forEach(
        item => {

            const itemElement =
                createCartItem(
                    item
                );


            if (itemElement) {

                itemsContainer.appendChild(
                    itemElement
                );

            }

        }
    );

}


/* ============================================
   RENDER CART
   ============================================ */

function renderCart() {

    if (!cartRoot) {

        return;
    }


    renderItems();

    updateCartCount();

    updateSummary();

}


/* ============================================
   OPEN CART
   ============================================ */

function openCart() {

    if (!cartRoot) {

        console.error(
            "VP Cart: Cannot open cart because cart root is missing."
        );

        return;
    }


    /*
       Always render the latest cart
       before opening.
    */

    renderCart();


    cartRoot.classList.add(
        "is-open"
    );


    cartRoot.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "vp-cart-open"
    );


    document.dispatchEvent(
        new CustomEvent(
            "vp:cart:opened"
        )
    );


    console.log(
        "VP Cart: Opened"
    );

}


/* ============================================
   CLOSE CART
   ============================================ */

function closeCart() {

    if (!cartRoot) {

        return;
    }


    cartRoot.classList.remove(
        "is-open"
    );


    cartRoot.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "vp-cart-open"
    );


    document.dispatchEvent(
        new CustomEvent(
            "vp:cart:closed"
        )
    );


    console.log(
        "VP Cart: Closed"
    );

}


/* ============================================
   HANDLE CART ACTIONS
   ============================================ */

function handleCartAction(
    event
) {

    const actionButton =
        event.target.closest(
            "[data-cart-action]"
        );


    if (!actionButton) {

        return;
    }


    const action =
        actionButton.dataset.cartAction;


    const productId =
        actionButton.dataset.productId;


    if (!productId) {

        return;
    }


    if (
        action ===
        "increase"
    ) {

        increaseQuantity(
            productId
        );

    }

    else if (
        action ===
        "decrease"
    ) {

        decreaseQuantity(
            productId
        );

    }

    else if (
        action ===
        "remove"
    ) {

        removeFromCart(
            productId
        );

    }

}


/* ============================================
   HANDLE CART BUTTONS
   ============================================ */

function handleCartButtons(
    event
) {

    const closeButton =
        event.target.closest(
            "[data-cart-close]"
        );


    if (closeButton) {

        closeCart();

        return;
    }


    const backdrop =
        event.target.closest(
            "[data-cart-backdrop]"
        );


    if (backdrop) {

        closeCart();

        return;
    }


    const collectionButton =
        event.target.closest(
            "[data-cart-collection]"
        );


    if (collectionButton) {

        closeCart();

        return;
    }


    const checkoutButton =
        event.target.closest(
            "[data-cart-checkout]"
        );


    if (checkoutButton) {

        document.dispatchEvent(
            new CustomEvent(
                "vp:cart:checkout"
            )
        );

    }

}


/* ============================================
   KEYBOARD
   ============================================ */

function handleKeyboard(
    event
) {

    if (
        event.key ===
        "Escape"
    ) {

        if (
            cartRoot &&
            cartRoot.classList.contains(
                "is-open"
            )
        ) {

            closeCart();

        }

    }

}


/* ============================================
   PRODUCT CARD ADD EVENT
   ============================================ */

function handleProductCardAdd(
    event
) {

    const product =
        event.detail?.product;


    if (
        !product ||
        product.id === undefined
    ) {

        console.error(
            "VP Cart: Invalid product received."
        );

        return;
    }


    addToCart(
        product.id,
        1
    );


    console.log(
        "VP Cart: Product added from product card:",
        product.id
    );

}


/* ============================================
   BIND EVENTS
   ============================================ */

function bindEvents() {

    if (!cartRoot) {

        return;
    }


    /*
       Cart item controls.
    */

    cartRoot.addEventListener(
        "click",
        handleCartAction
    );


    /*
       Close / backdrop /
       checkout controls.
    */

    cartRoot.addEventListener(
        "click",
        handleCartButtons
    );


    /*
       Header bag opens cart.
    */

    document.addEventListener(
        "vp:cart:open",
        openCart
    );


    /*
       External close request.
    */

    document.addEventListener(
        "vp:cart:close",
        closeCart
    );


    /*
       Escape key.
    */

    document.addEventListener(
        "keydown",
        handleKeyboard
    );


    /*
       Product card Add to Cart.
    */

    window.addEventListener(
        "vp:cart:add",
        handleProductCardAdd
    );

}


/* ============================================
   INIT
   ============================================ */

function init(
    root
) {

    if (!root) {

        console.error(
            "VP Cart: Root element not found."
        );

        return;
    }


    cartRoot =
        root;


    loadCart();

    bindEvents();

    renderCart();

    updateHeaderCartCount();

}


/* ============================================
   PUBLIC API
   ============================================ */

const VPCart = {

    init,

    addToCart,

    removeFromCart,

    updateQuantity,

    increaseQuantity,

    decreaseQuantity,

    clearCart,

    getCartCount,

    getCartSubtotal,

    renderCart,

    openCart,

    closeCart

};


export default VPCart;