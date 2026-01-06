<script>
  import { onMount, afterUpdate } from "svelte";
  import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Color,
    NearestFilter,
    TextureLoader,
  } from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

  const missin_tex =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAKklEQVQokWO0tA9lwAZevXiAVZwJqygeMKqBGMCCK7zFJBSoY8OoBmIAAC/hBqHyKo3BAAAAAElFTkSuQmCC";
  
  export let top = missin_tex;
  export let bottom = missin_tex;
  export let west = missin_tex;
  export let east = missin_tex;
  export let north = missin_tex;
  export let south = missin_tex;

  /** @type {HTMLDivElement} */
  let container;
  /** @type {Mesh | null} */
  let cube = null;
  /** @type {Scene | null} */
  let scene = null;
  /** @type {TextureLoader | null} */
  let textureLoader = null;

  function loadTexture(url) {
    const tex = textureLoader.load(url);
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  function createCube() {
    const urls = [east, west, top, bottom, north, south];
    const materials = urls.map(
      (url) => new MeshBasicMaterial({ map: loadTexture(url) })
    );
    const geometry = new BoxGeometry(2, 2, 2);
    return new Mesh(geometry, materials);
  }

  function updateTextures() {
    if (!cube) return;
    const urls = [east, west, top, bottom, north, south];
    urls.forEach((url, i) => {
      cube.material[i].map = loadTexture(url);
      cube.material[i].needsUpdate = true;
    });
  }

  onMount(() => {
    if (!container) return;

    // Scene
    scene = new Scene();
    scene.background = new Color("white");

    // Camera
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10);

    // Texture loader
    textureLoader = new TextureLoader();

    // Create and add cube
    cube = createCube();
    scene.add(cube);

    // Create renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 20;

    // Add canvas to div
    container.appendChild(renderer.domElement);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // On resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  });

  // Update textures when props change
  afterUpdate(() => {
    if (cube && textureLoader) {
      updateTextures();
    }
  });
</script>

<div bind:this={container} class="w-full h-full"></div>