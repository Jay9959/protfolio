(() => {
    // Three.js Background Animation
    let scene, camera, renderer, stars, shapes = [];
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function init() {
        // Double check for THREE again in case init was called via a listener
        if (typeof THREE === 'undefined') return;

        const canvas = document.getElementById('three-canvas');
        if (!canvas) return;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Stars/Particles
        const starCount = 3000;
        const posArray = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 0.008,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });

        stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Floating Geometries
        const addShape = (geometry, x, y, z, rotationSpeed) => {
            // Fetch skin color from CSS
            const skinColor = getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim() || '#ec1839';
            
            const mat = new THREE.MeshPhongMaterial({
                color: skinColor,
                wireframe: true,
                transparent: true,
                opacity: 0.15,
                shininess: 100
            });

            const mesh = new THREE.Mesh(geometry, mat);
            mesh.position.set(x, y, z);
            mesh.rotationSpeed = rotationSpeed;
            scene.add(mesh);
            shapes.push(mesh);
        };

        // Add various shapes
        addShape(new THREE.IcosahedronGeometry(0.8, 0), -2, 1, -2, 0.005);
        addShape(new THREE.OctahedronGeometry(1.2, 0), 3, -1, -3, 0.003);
        addShape(new THREE.TorusGeometry(0.5, 0.2, 16, 100), -3, -2, -1, 0.01);
        addShape(new THREE.DodecahedronGeometry(0.6, 0), 2, 2, -4, 0.008);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Event Listeners
        window.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('scroll', onScroll);

        animate();
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        if (!camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let scrollY = 0;
    function onScroll() {
        scrollY = window.pageYOffset;
    }

    function animate() {
        requestAnimationFrame(animate);

        // Smooth movement for camera/scene
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Apply rotation based on mouse
        scene.rotation.y = targetX * 0.2;
        scene.rotation.x = targetY * 0.2;

        // Star animation
        stars.rotation.y += 0.0005;
        stars.position.y = scrollY * 0.0005; // Parallax scroll effect

        // Shapes animation
        shapes.forEach((shape, index) => {
            shape.rotation.x += shape.rotationSpeed;
            shape.rotation.y += shape.rotationSpeed;
            
            // Floating movement
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            
            // Parallax scroll for individual shapes
            shape.position.y -= (scrollY * 0.001 * (index % 2 === 0 ? 1 : 1.5));
        });

        // Update colors periodically in case theme changes
        if (Math.floor(Date.now() / 1000) % 2 === 0) {
            const skinColor = getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim();
            shapes.forEach(shape => {
                if (shape.material.color.getStyle() !== skinColor) {
                    shape.material.color.set(skinColor);
                }
            });
        }

        renderer.render(scene, camera);
    }

    // Start only if THREE is ready
    if (typeof THREE !== 'undefined') {
        init();
    } else {
        window.addEventListener('load', () => {
            if (typeof THREE !== 'undefined') {
                init();
            }
        });
    }
})();
