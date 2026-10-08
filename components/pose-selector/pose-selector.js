const VPPoseSelector = {

    init(container) {

        if (!container) {

            console.error(
                "VP Pose Selector: container not found."
            );

            return;
        }


        const cards =
            container.querySelectorAll(
                ".vp-pose-card"
            );


        if (!cards.length) {

            console.error(
                "VP Pose Selector: no pose cards found."
            );

            return;
        }


        /*
        ============================================
        POSE SELECTION
        ============================================

        For now this controls only the
        visual selected state.

        Later the selected pose will be
        connected to the 3D mannequin.
        ============================================
        */

        cards.forEach((card) => {

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


                    const pose =
                        card.dataset.pose;


                    console.log(
                        "Selected VP Pose:",
                        pose
                    );

                }
            );

        });


        console.log(
            "VP Pose Selector ready:",
            cards.length,
            "poses"
        );

    }

};


export default VPPoseSelector;