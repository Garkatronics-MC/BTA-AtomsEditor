<script>
  import { onMount } from "svelte";
  import { formData } from "../stores";
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
    // @ts-ignore
  } from "three";
  // @ts-ignore
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

  // @ts-ignore
  let container;
  // @ts-ignore
  let cube;
  // @ts-ignore
  let scene;
  // @ts-ignore
  let textureLoader;
  let previousTextures = {};

  // Función para cargar textura
  // @ts-ignore
  function loadTexture(url) {
    // @ts-ignore
    const tex = textureLoader.load(url || "");
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  // Crear el cubo inicial
  function createCube() {
    const faces = $formData.textures.faces;
    const urls = [
      faces.east,
      faces.west,
      faces.top,
      faces.bottom,
      faces.north,
      faces.south,
    ];
    const materials = urls.map(
      (url) => new MeshBasicMaterial({ map: loadTexture(url) })
    );
    const geometry = new BoxGeometry(2, 2, 2);
    return new Mesh(geometry, materials);
  }

  // Actualizar texturas
  function updateTextures() {
    // @ts-ignore
    if (!cube) return;
    const faces = $formData.textures.faces;
    if (previousTextures === faces) {
      return;
    } else {
      previousTextures = $formData.textures.faces;
    }
    const urls = [
      faces.east,
      faces.west,
      faces.top,
      faces.bottom,
      faces.north,
      faces.south,
    ];
    urls.forEach((url, i) => {
      // @ts-ignore
      cube.material[i].map = loadTexture(url);
      // @ts-ignore
      cube.material[i].needsUpdate = true;
    });
  }

  onMount(() => {
    // @ts-ignore
    if (!container) return;

    scene = new Scene();
    scene.background = new Color("white");

    const camera = new PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    textureLoader = new TextureLoader();

    cube = createCube();
    scene.add(cube);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 20;

    container.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      // @ts-ignore
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      // @ts-ignore
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      // @ts-ignore
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  });

  // Reacciona a cambios en el store
  $effect(() => {
    // @ts-ignore
    if (cube && textureLoader) {
      updateTextures();
    }
  });
</script>

<div bind:this={container} class="w-full h-full"></div>
