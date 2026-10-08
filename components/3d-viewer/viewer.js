import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


const VPViewer = {

    init(container) {

        if (!container) {

            console.error(
                "VP Viewer: container not found."
            );

            return;
        }


        /*
        ============================================
        VIEWER ELEMENTS
        ============================================
        */

        const canvasContainer =
            container.querySelector(
                ".vp-viewer__canvas"
            );

        const loading =
            container.querySelector(
                ".vp-viewer__loading"
            );

        const errorBox =
            container.querySelector(
                ".vp-viewer__error"
            );


        /*
        ============================================
        SCENE
        ============================================
        */

        const scene =
            new THREE.Scene();

        scene.background =
            new THREE.Color(0xffffff);


        /*
        ============================================
        CAMERA
        ============================================
        */

        const camera =
            new THREE.PerspectiveCamera(
                35,
                container.clientWidth /
                container.clientHeight,
                0.01,
                1000
            );

        camera.position.set(
            0,
            0,
            8
        );


        /*
        ============================================
        RENDERER
        ============================================
        */

        const renderer =
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: false
            });


        const isMobile =
            window.matchMedia("(max-width: 600px)").matches;

        const pixelRatio = isMobile
            ? Math.min(window.devicePixelRatio, 1.5)
            : Math.min(window.devicePixelRatio, 2);

        renderer.setPixelRatio(pixelRatio);


        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );


        renderer.outputColorSpace =
            THREE.SRGBColorSpace;


        renderer.toneMapping =
            THREE.ACESFilmicToneMapping;


        renderer.toneMappingExposure =
            1.0;


        canvasContainer.appendChild(
            renderer.domElement
        );


        /*
        ============================================
        LIGHTING
        ============================================
        */

        const keyLight =
            new THREE.DirectionalLight(
                0xffffff,
                3.0
            );

        keyLight.position.set(
            4,
            6,
            6
        );

        scene.add(keyLight);


        const fillLight =
            new THREE.DirectionalLight(
                0xffffff,
                1.8
            );

        fillLight.position.set(
            -4,
            3,
            4
        );

        scene.add(fillLight);


        const topLight =
            new THREE.DirectionalLight(
                0xffffff,
                1.5
            );

        topLight.position.set(
            0,
            8,
            -2
        );

        scene.add(topLight);


        const ambientLight =
            new THREE.HemisphereLight(
                0xffffff,
                0xffffff,
                1.5
            );

        scene.add(ambientLight);


        /*
        ============================================
        ORBIT CONTROLS
        ============================================
        */

        const controls =
            new OrbitControls(
                camera,
                renderer.domElement
            );


        controls.enableDamping =
            true;


        controls.dampingFactor =
            0.06;


        /*
        --------------------------------------------
        PAN
        --------------------------------------------
        */

        controls.enablePan =
            false;


        /*
        --------------------------------------------
        ZOOM
        --------------------------------------------
        */

        controls.enableZoom =
            true;


        controls.zoomSpeed =
            0.8;


        /*
        ============================================
        IMPORTANT CAMERA RESTRICTION
        ============================================

        Horizontal rotation:
        FULL 360° allowed.

        Vertical rotation:
        Limited.

        The user can look slightly upward,
        but cannot rotate the camera underneath
        the saree.

        This prevents the unwanted
        "looking underneath the saree" view.
        ============================================
        */

        controls.minPolarAngle =
            THREE.MathUtils.degToRad(65);


        controls.maxPolarAngle =
            THREE.MathUtils.degToRad(105);


        /*
        ============================================
        CAMERA TARGET
        ============================================
        */

        controls.target.set(
            0,
            0,
            0
        );


        /*
        ============================================
        LOAD 3D MODEL
        ============================================
        */

        const loader =
            new GLTFLoader();


        const MODEL_URL =
            "assets/3d/VP_Sarees_Mannequin_SAREE_0_2.glb";


        loader.load(

            MODEL_URL,


            function (gltf) {

                console.log(
                    "================================"
                );

                console.log(
                    "VP SAREES 3D MODEL LOADED"
                );

                console.log(
                    "================================"
                );

                console.log(gltf);


                const model =
                    gltf.scene;


                scene.add(model);


                /*
                ====================================
                AUTO FRAME MODEL
                ====================================
                */

                const box =
                    new THREE.Box3()
                        .setFromObject(
                            model
                        );


                const center =
                    box.getCenter(
                        new THREE.Vector3()
                    );


                const size =
                    box.getSize(
                        new THREE.Vector3()
                    );


                const maxDimension =
                    Math.max(
                        size.x,
                        size.y,
                        size.z
                    );


                console.log(
                    "VP Sarees model size:",
                    size
                );


                /*
                ------------------------------------
                CENTER MODEL
                ------------------------------------
                */

                model.position.x -=
                    center.x;


                model.position.y -=
                    center.y;


                model.position.z -=
                    center.z;


                /*
                ------------------------------------
                CAMERA DISTANCE
                ------------------------------------
                */

                const distance =
                    maxDimension /
                    (
                        2 *
                        Math.tan(
                            THREE.MathUtils.degToRad(
                                camera.fov
                            ) / 2
                        )
                    );


                camera.position.set(
                    0,
                    0,
                    distance * 1.35
                );


                /*
                ------------------------------------
                RESET TARGET
                ------------------------------------
                */

                controls.target.set(
                    0,
                    0,
                    0
                );


                /*
                ------------------------------------
                ZOOM LIMITS
                ------------------------------------
                */

                controls.minDistance =
                    maxDimension * 0.5;


                controls.maxDistance =
                    maxDimension * 4;


                controls.update();


                /*
                ------------------------------------
                HIDE LOADING
                ------------------------------------
                */

                loading.style.display =
                    "none";


                console.log(
                    "VP SAREES 3D VIEWER READY"
                );

            },


            /*
            ========================================
            LOADING PROGRESS
            ========================================
            */

            function (progress) {

                if (
                    progress.total > 0
                ) {

                    const percent =
                        Math.round(
                            (
                                progress.loaded /
                                progress.total
                            ) * 100
                        );


                    loading.textContent =
                        "Loading VP Sarees... " +
                        percent +
                        "%";
                }

            },


            /*
            ========================================
            ERROR
            ========================================
            */

            function (error) {

                console.error(
                    "VP SAREES GLB ERROR:",
                    error
                );


                loading.style.display =
                    "none";


                errorBox.style.display =
                    "flex";


                errorBox.innerHTML = `

                    <div>

                        <strong>
                            Could not load the
                            VP Sarees mannequin.
                        </strong>

                        <br><br>

                        Expected file:

                        <br>

                        assets/3d/
                        VP_Sarees_Mannequin_SAREE_0_2.glb

                        <br><br>

                        Open the browser console
                        with F12 for details.

                    </div>

                `;

            }

        );


        /*
        ============================================
        RESPONSIVE RESIZE
        ============================================
        */

        function resizeViewer() {

            const width =
                container.clientWidth;


            const height =
                container.clientHeight;


            if (
                width <= 0 ||
                height <= 0
            ) {

                return;
            }


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }


        window.addEventListener(
            "resize",
            resizeViewer
        );


        /*
        ============================================
        ANIMATION LOOP
        ============================================
        */

        function animate() {

            requestAnimationFrame(
                animate
            );


            controls.update();


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /*
        ============================================
        RETURN VIEWER OBJECT
        ============================================
        */

        return {

            scene,

            camera,

            renderer,

            controls

        };

    }

};


export default VPViewer;