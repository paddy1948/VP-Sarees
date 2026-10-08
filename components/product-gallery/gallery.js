const VPProductGallery = {

    init(options = {}) {

        const {

            lightbox,

            imageElement,

            thumbnails,

            images = []

        } = options;


        // =====================================
        // VALIDATION
        // =====================================

        if (!lightbox) {

            console.error(
                "VP Product Gallery: lightbox not found."
            );

            return;
        }


        if (!imageElement) {

            console.error(
                "VP Product Gallery: main image not found."
            );

            return;
        }


        if (!images.length) {

            console.error(
                "VP Product Gallery: no images found."
            );

            return;
        }


        // =====================================
        // ELEMENTS
        // =====================================

        const lightboxImage =
            lightbox.querySelector(
                ".vp-gallery-lightbox__image"
            );

        const closeButton =
            lightbox.querySelector(
                ".vp-gallery-lightbox__close"
            );

        const previousButton =
            lightbox.querySelector(
                ".vp-gallery-lightbox__previous"
            );

        const nextButton =
            lightbox.querySelector(
                ".vp-gallery-lightbox__next"
            );

        const counter =
            lightbox.querySelector(
                ".vp-gallery-lightbox__counter"
            );


        if (!lightboxImage) {

            console.error(
                "VP Product Gallery: fullscreen image not found."
            );

            return;
        }


        // =====================================
        // STATE
        // =====================================

        let currentIndex = 0;

        let touchStartX = 0;

        let touchStartY = 0;


        // =====================================
        // UPDATE ACTIVE THUMBNAIL
        // =====================================

        function updateThumbnails(index) {

            if (!thumbnails) {
                return;
            }


            thumbnails.forEach(
                (thumbnail, thumbnailIndex) => {

                    thumbnail.classList.toggle(
                        "is-active",
                        thumbnailIndex === index
                    );

                }
            );

        }


        // =====================================
        // UPDATE COUNTER
        // =====================================

        function updateCounter() {

            if (!counter) {
                return;
            }


            counter.textContent =
                `${currentIndex + 1} / ${images.length}`;

        }


        // =====================================
        // SHOW FULLSCREEN IMAGE
        // =====================================

        function showImage(
            index,
            animate = true
        ) {

            if (
                index < 0 ||
                index >= images.length
            ) {

                return;

            }


            currentIndex =
                index;


            if (!animate) {

                lightboxImage.style.opacity =
                    "1";

                lightboxImage.style.transform =
                    "scale(1)";

                lightboxImage.src =
                    images[currentIndex];

                updateCounter();

                updateThumbnails(
                    currentIndex
                );

                return;

            }


            lightboxImage.style.opacity =
                "0";

            lightboxImage.style.transform =
                "scale(0.985)";


            setTimeout(
                () => {

                    lightboxImage.src =
                        images[currentIndex];


                    lightboxImage.onload =
                        () => {

                            lightboxImage.style.opacity =
                                "1";

                            lightboxImage.style.transform =
                                "scale(1)";

                        };

                    updateCounter();

                    updateThumbnails(
                        currentIndex
                    );

                },
                120
            );

        }


        // =====================================
        // OPEN LIGHTBOX
        // =====================================

        function openLightbox(index) {

            currentIndex =
                index;


            lightbox.classList.add(
                "is-open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            showImage(
                currentIndex,
                false
            );

        }


        // =====================================
        // CLOSE LIGHTBOX
        // =====================================

        function closeLightbox() {

            lightbox.classList.remove(
                "is-open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        // =====================================
        // NEXT IMAGE
        // =====================================

        function showNext() {

            const nextIndex =
                (
                    currentIndex + 1
                ) %
                images.length;


            showImage(
                nextIndex
            );

        }


        // =====================================
        // PREVIOUS IMAGE
        // =====================================

        function showPrevious() {

            const previousIndex =
                (
                    currentIndex -
                    1 +
                    images.length
                ) %
                images.length;


            showImage(
                previousIndex
            );

        }


        // =====================================
        // MAIN IMAGE CLICK
        // =====================================

        imageElement.addEventListener(
            "click",
            () => {

                openLightbox(
                    currentIndex
                );

            }
        );


        // =====================================
        // THUMBNAIL CLICK
        // =====================================

        if (thumbnails) {

            thumbnails.forEach(
                (thumbnail, index) => {

                    thumbnail.addEventListener(
                        "click",
                        () => {

                            currentIndex =
                                index;

                            updateThumbnails(
                                currentIndex
                            );

                        }
                    );

                }
            );

        }


        // =====================================
        // CLOSE
        // =====================================

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeLightbox
            );

        }


        // =====================================
        // NEXT
        // =====================================

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                showNext
            );

        }


        // =====================================
        // PREVIOUS
        // =====================================

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                showPrevious
            );

        }


        // =====================================
        // BACKDROP CLICK
        // =====================================

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        // =====================================
        // KEYBOARD CONTROLS
        // =====================================

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    !lightbox.classList.contains(
                        "is-open"
                    )
                ) {

                    return;

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    showNext();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    showPrevious();

                }

            }
        );


        // =====================================
        // TOUCH / SWIPE
        // =====================================

        lightbox.addEventListener(
            "touchstart",
            (event) => {

                const touch =
                    event.touches[0];


                touchStartX =
                    touch.clientX;

                touchStartY =
                    touch.clientY;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            (event) => {

                const touch =
                    event.changedTouches[0];


                const deltaX =
                    touch.clientX -
                    touchStartX;

                const deltaY =
                    touch.clientY -
                    touchStartY;


                const minimumSwipe =
                    50;


                // Ignore mostly vertical movement.

                if (
                    Math.abs(deltaX) <
                    minimumSwipe ||
                    Math.abs(deltaX) <=
                    Math.abs(deltaY)
                ) {

                    return;

                }


                if (deltaX < 0) {

                    showNext();

                }
                else {

                    showPrevious();

                }

            },
            {
                passive: true
            }
        );


        // =====================================
        // INITIAL STATE
        // =====================================

        updateCounter();

        updateThumbnails(
            currentIndex
        );


        console.log(
            "VP Product Gallery ready:",
            images.length,
            "images"
        );


        return {

            open: openLightbox,

            close: closeLightbox,

            next: showNext,

            previous: showPrevious

        };

    }

};


export default VPProductGallery;