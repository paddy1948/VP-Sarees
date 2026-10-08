import {
    getProductById
} from "../../js/products.js";


const VPProductDetails = {

    init(container) {

        if (!container) {

            console.error(
                "VP Product Details: container not found."
            );

            return;
        }


        // =====================================
        // GET PRODUCT ID
        // =====================================

        const params =
            new URLSearchParams(
                window.location.search
            );


        const productId =
            params.get("id");


        const product =
            getProductById(productId);


        if (!product) {

            console.error(
                "VP Sarees: Product not found:",
                productId
            );

            return;
        }


        // =====================================
        // PRODUCT ELEMENTS
        // =====================================

        const image =
            container.querySelector(
                ".vp-product-details__image"
            );


        const name =
            container.querySelector(
                ".vp-product-details__name"
            );


        const price =
            container.querySelector(
                ".vp-product-details__price"
            );


        const oldPrice =
            container.querySelector(
                ".vp-product-details__old-price"
            );


        const discount =
            container.querySelector(
                ".vp-product-details__discount"
            );


        const description =
            container.querySelector(
                ".vp-product-details__section > p"
            );


        const specs =
            container.querySelectorAll(
                ".vp-product-details__spec"
            );


        // =====================================
        // UPDATE MAIN PRODUCT
        // =====================================

        if (image) {

            image.src =
                product.gallery[0];

            image.alt =
                product.name;

        }


        if (name) {

            name.textContent =
                product.name;

        }


        if (price) {

            price.textContent =
                `₹${product.price.toLocaleString("en-IN")}`;

        }


        if (oldPrice) {

            oldPrice.textContent =
                `₹${product.oldPrice.toLocaleString("en-IN")}`;

        }


        if (discount) {

            discount.textContent =
                `${product.discount}% OFF`;

        }


        if (description) {

            description.textContent =
                product.description;

        }


        // =====================================
        // UPDATE PRODUCT SPECS
        // =====================================

        if (specs.length >= 3) {

            const fabricValue =
                specs[0].querySelector(
                    "strong"
                );


            const colorValue =
                specs[1].querySelector(
                    "strong"
                );


            const patternValue =
                specs[2].querySelector(
                    "strong"
                );


            if (fabricValue) {

                fabricValue.textContent =
                    product.fabric;

            }


            if (colorValue) {

                colorValue.textContent =
                    product.color;

            }


            if (patternValue) {

                patternValue.textContent =
                    product.pattern;

            }

        }


        // =====================================
        // BUILD PRODUCT GALLERY
        // =====================================

        const thumbnails =
            container.querySelectorAll(
                ".vp-product-details__thumbnail"
            );


        thumbnails.forEach(
            (thumbnail, index) => {

                const thumbnailImage =
                    thumbnail.querySelector(
                        "img"
                    );


                if (!thumbnailImage) {
                    return;
                }


                /*
                 * Current shared product data
                 * contains one prototype image
                 * per product.
                 *
                 * Until additional gallery images
                 * are added, reuse the first image
                 * for the remaining gallery slots.
                 */

                const galleryImage =
                    product.gallery[index] ||
                    product.gallery[0];


                if (!galleryImage) {
                    return;
                }


                thumbnailImage.src =
                    galleryImage.replace(
                        /w=\d+/,
                        "w=400"
                    );


                thumbnailImage.alt =
                    `${product.name} image ${index + 1}`;


                thumbnail.addEventListener(
                    "click",
                    () => {

                        // -------------------------
                        // Remove active state
                        // -------------------------

                        thumbnails.forEach(
                            (item) => {

                                item.classList.remove(
                                    "is-active"
                                );

                            }
                        );


                        // -------------------------
                        // Activate selected
                        // -------------------------

                        thumbnail.classList.add(
                            "is-active"
                        );


                        // -------------------------
                        // Change main image
                        // -------------------------

                        if (image) {

                            image.style.opacity =
                                "0";

                            image.style.transform =
                                "scale(0.985)";

                            image.style.transition =
                                "opacity 180ms ease, transform 180ms ease";


                            setTimeout(
                                () => {

                                    image.src =
                                        galleryImage;


                                    image.onload =
                                        () => {

                                            image.style.opacity =
                                                "1";

                                            image.style.transform =
                                                "scale(1)";

                                        };

                                },
                                120
                            );

                        }


                        // -------------------------
                        // Keep selected thumbnail
                        // visible
                        // -------------------------

                        thumbnail.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center"
                        });

                    }
                );

            }
        );


        // =====================================
        // FAVORITE BUTTON
        // =====================================

        const favoriteButton =
            container.querySelector(
                ".vp-product-details__favorite"
            );


        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                () => {

                    const isActive =
                        favoriteButton.classList.contains(
                            "is-active"
                        );


                    if (isActive) {

                        favoriteButton.classList.remove(
                            "is-active"
                        );


                        favoriteButton.setAttribute(
                            "aria-pressed",
                            "false"
                        );


                        favoriteButton.textContent =
                            "♡";

                    }
                    else {

                        favoriteButton.classList.add(
                            "is-active"
                        );


                        favoriteButton.setAttribute(
                            "aria-pressed",
                            "true"
                        );


                        favoriteButton.textContent =
                            "♥";

                    }

                }
            );

        }


        // =====================================
        // ADD TO CART
        // =====================================

        const cartButton =
            container.querySelector(
                ".vp-product-details__cart"
            );


        if (cartButton) {

            cartButton.addEventListener(
                "click",
                () => {

                    console.log(
                        "VP Sarees: Add to Cart",
                        product.id
                    );

                }
            );

        }


        // =====================================
        // BUY NOW
        // =====================================

        const buyButton =
            container.querySelector(
                ".vp-product-details__buy"
            );


        if (buyButton) {

            buyButton.addEventListener(
                "click",
                () => {

                    console.log(
                        "VP Sarees: Buy Now",
                        product.id
                    );

                }
            );

        }


        // =====================================
        // PAGE TITLE
        // =====================================

        document.title =
            `${product.name} — VP Sarees`;


        console.log(
            "VP Product Details connected to shared data:",
            product.id,
            product.name
        );

    }

};


export default VPProductDetails;