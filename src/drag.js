import { FBXLoader } from "./js/fbxloader.js";
import { Scene } from "./js/three.module.js";
let camera, scene, renderer, hemilight, spotlight, directional,delta,ambient;

init();
animate();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
/* -------------------------------- constants ------------------------------- */
const raycaster=new THREE.Raycaster()
const clickmouse=new THREE.Vector2()
const movemouse=new THREE.Vector2()
var draggable=new THREE.Object3D();


/* -------------------------------- controls -------------------------------- */
function init() {
  /* -------------------------------- geometry -------------------------------- */
  scene = new THREE.Scene();
  // scene.add(new THREE.AxesHelper(500));
  /* --------------------------------- camera --------------------------------- */
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
 
  /* -------------------------------- material -------------------------------- */
  const geometry = new THREE.PlaneGeometry(1000, 1000);

  const material = new THREE.MeshLambertMaterial({
    color: 0x211f1f,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  const box = new THREE.BoxGeometry(20, 20, 20);
  const material2 = new THREE.MeshLambertMaterial({
    color: 0x302d2d,
    side: THREE.DoubleSide,
  });
  const square = new THREE.Mesh(box, material2);
  plane.rotation.x = Math.PI / 1.8;
  square.rotation.x = Math.PI / 1.8;
  square.position.y = 10.2;

  const sphereGeometry = new THREE.SphereGeometry(10, 32, 16);
  const material3 = new THREE.MeshLambertMaterial({ color: 0x302d2d });
  const sphere = new THREE.Mesh(sphereGeometry, material3);
  sphere.rotation.x = Math.PI / 1.8;
  sphere.position.set(30, 10.1, 0);
  scene.add(sphere);
  scene.add(plane);
  scene.add(square);
  /* -------------------------------- Lighting -------------------------------- */
   ambient = new THREE.HemisphereLight(0xffffff,0xfff000,3);
  
  scene.add(ambient);
  /* --------------------------------- render --------------------------------- */
  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
}
/* --------------------------------- animate -------------------------------- */

function animate() {
  delta+=0.01;
 
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
