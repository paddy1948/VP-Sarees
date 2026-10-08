const VPSareeSelector = {

    init(container) {

        if (!container) {

            console.error(
                "VP Saree Selector: container not found."
            );

            return;
        }


        const cards =
            container.querySelectorAll(
                ".vp-saree-card"
            );


        if (!cards.length) {

            console.error(
                "VP Saree Selector: no cards found."
            );

            return;
        }


        /*
        ============================================
        CARD SELECTION
        ============================================

        For now this only changes the
        selected/active card.

        Later this same system will tell
        the 3D viewer which saree design
        to load.
        ============================================
        */

        cards.forEach((card, index) => {

            card.addEventListener(
                "click",
                () => {

                    cards.forEach(
                        (item) => {

                            item.classList.remove(
                                "is-active"
                            );

                        }
                    );


                    card.classList.add(
                        "is-active"
                    );


                    console.log(
                        "Selected VP Saree:",
                        index + 1
                    );

                }
            );

        });


        console.log(
            "VP Saree Selector ready:",
            cards.length,
            "designs"
        );

    }

};


export default VPSareeSelector;