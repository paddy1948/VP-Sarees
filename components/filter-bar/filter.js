/* ============================================
   VP SAREES — FILTER BAR
   ============================================ */

import {
    VPProducts
} from "../../js/products.js";


const VPFilterBar = {

    init(container) {

        if (!container) {
            console.error(
                "VP Filter Bar: container not found."
            );
            return;
        }


        const openButton =
            container.querySelector(
                ".vp-filter-bar__open"
            );

        const modal =
            container.querySelector(
                ".vp-filter-modal"
            );

        const closeButton =
            container.querySelector(
                ".vp-filter-panel__close"
            );

        const backdrop =
            container.querySelector(
                ".vp-filter-modal__backdrop"
            );

        const categoryButtons =
            container.querySelectorAll(
                ".vp-filter-category"
            );

        const filterSections =
            container.querySelectorAll(
                ".vp-filter-section"
            );

        const resetButton =
            container.querySelector(
                ".vp-filter-panel__reset"
            );

        const searchButton =
            container.querySelector(
                ".vp-filter-panel__search"
            );


        if (!openButton || !modal) {

            console.error(
                "VP Filter Bar: filter modal elements not found."
            );

            return;
        }


        /* =========================================
           OPEN
           ========================================= */

        function openFilter() {

            modal.classList.add(
                "is-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            openButton.setAttribute(
                "aria-expanded",
                "true"
            );

            document.body.style.overflow =
                "hidden";
        }


        /* =========================================
           CLOSE
           ========================================= */

        function closeFilter() {

            modal.classList.remove(
                "is-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            openButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow =
                "";
        }


        /* =========================================
           OPEN BUTTON
           
           Native click works for:
           - Desktop mouse
           - Android touch
           - iPhone touch
           ========================================= */

        openButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openFilter();
            }
        );


        /* =========================================
           CLOSE BUTTON
           ========================================= */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    closeFilter();
                }
            );
        }


        /* =========================================
           BACKDROP
           ========================================= */

        if (backdrop) {

            backdrop.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    closeFilter();
                }
            );
        }


        /* =========================================
           ESCAPE
           ========================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "is-open"
                    )
                ) {

                    closeFilter();
                }
            }
        );


        /* =========================================
           CATEGORY SWITCHING
           ========================================= */

        categoryButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const sectionName =
                            button.dataset
                                .filterSection;


                        categoryButtons.forEach(
                            (item) => {

                                item.classList.remove(
                                    "is-active"
                                );
                            }
                        );


                        button.classList.add(
                            "is-active"
                        );


                        filterSections.forEach(
                            (section) => {

                                section.classList.remove(
                                    "is-active"
                                );


                                if (
                                    section.dataset
                                        .filterContent ===
                                    sectionName
                                ) {

                                    section.classList.add(
                                        "is-active"
                                    );
                                }
                            }
                        );
                    }
                );
            }
        );


        /* =========================================
           RESET
           ========================================= */

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                () => {

                    const inputs =
                        container.querySelectorAll(
                            "input"
                        );


                    inputs.forEach(
                        (input) => {

                            if (
                                input.type ===
                                "checkbox"
                            ) {

                                input.checked =
                                    false;
                            }


                            if (
                                input.type ===
                                "number"
                            ) {

                                input.value =
                                    "";
                            }
                        }
                    );
                }
            );
        }


        /* =========================================
           SEARCH
           ========================================= */

        if (searchButton) {

            searchButton.addEventListener(
                "click",
                () => {

                    applyFilters();

                    closeFilter();
                }
            );
        }


        /* =========================================
           APPLY FILTERS
           ========================================= */

        function applyFilters() {

            const minPriceInput =
                container.querySelector(
                    "[data-filter-price-min]"
                );

            const maxPriceInput =
                container.querySelector(
                    "[data-filter-price-max]"
                );


            const minPrice =
                Number(
                    minPriceInput?.value
                ) || 0;


            const maxPrice =
                Number(
                    maxPriceInput?.value
                ) || Infinity;


            const selectedFabrics =
                Array.from(
                    container.querySelectorAll(
                        "[data-filter-fabric]:checked"
                    )
                ).map(
                    (input) =>
                        input.value
                );


            const selectedColors =
                Array.from(
                    container.querySelectorAll(
                        "[data-filter-color]:checked"
                    )
                ).map(
                    (input) =>
                        input.value
                );


            const selectedPatterns =
                Array.from(
                    container.querySelectorAll(
                        "[data-filter-pattern]:checked"
                    )
                ).map(
                    (input) =>
                        input.value
                );


            const newFilter =
                container.querySelector(
                    "[data-filter-new]"
                );


            const onlyNew =
                newFilter?.checked === true;


            const featuredInputs =
                container.querySelectorAll(
                    "[data-filter-featured]"
                );


            const onlyFeatured =
                Array.from(
                    featuredInputs
                ).some(
                    (input) =>
                        input.checked
                );


            const productCards =
                document.querySelectorAll(
                    ".vp-product-card"
                );


            productCards.forEach(
                (card, index) => {

                    const product =
                        VPProducts[index];


                    if (!product) {
                        return;
                    }


                    let matches = true;


                    if (
                        product.price <
                        minPrice
                    ) {

                        matches = false;
                    }


                    if (
                        product.price >
                        maxPrice
                    ) {

                        matches = false;
                    }


                    if (
                        selectedFabrics.length &&
                        !selectedFabrics.includes(
                            product.fabric
                        )
                    ) {

                        matches = false;
                    }


                    if (
                        selectedColors.length &&
                        !selectedColors.includes(
                            product.color
                        )
                    ) {

                        matches = false;
                    }


                    if (
                        selectedPatterns.length &&
                        !selectedPatterns.includes(
                            product.pattern
                        )
                    ) {

                        matches = false;
                    }


                    if (
                        onlyNew &&
                        !product.isNew
                    ) {

                        matches = false;
                    }


                    if (
                        onlyFeatured &&
                        !product.isFeatured
                    ) {

                        matches = false;
                    }


                    card.style.display =
                        matches
                            ? ""
                            : "none";
                }
            );


            console.log(
                "VP Sarees filters applied"
            );
        }


        console.log(
            "VP Filter Bar ready"
        );
    }
};


export default VPFilterBar;