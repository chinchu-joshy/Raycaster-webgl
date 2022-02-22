// import * as dat from 'dat.gui'
import gsap from "../node_modules/gsap/all.js";
// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
// Objects
const geometry = new THREE.PlaneBufferGeometry(1, 1);
for (let index = 0; index < 4; index++) {
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`../image/${index}.png`),
  });
  const img = new THREE.Mesh(geometry, material);
  img.position.set(Math.random() + 0.3, index * -1.8);
  scene.add(img);
}
// events
window.addEventListener("wheel", onMouseWheel);
let y = 0;
let position = 0;
function onMouseWheel(event) {
  y = event.deltaY * 0.0007;
}
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});
/* --------------------------------- Actions -------------------------------- */
const raycaster = new THREE.Raycaster();
let objs = [];
scene.traverse((object) => {
  if (object.isMesh) {
    objs.push(object);
  }
});
// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  position += y;
  y *= 0.9;
  camera.position.y = -position;
  //Raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);
  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.3, y: 1.3 });
    gsap.to(intersect.object.rotation, { y: -0.3 });
    gsap.to(intersect.object.position, { z: 0.3 });
  }
  for (const obj of objs) {
    if (!intersects.find((intersect) => intersect.object == obj)) {
      gsap.to(obj.scale, { x: 1, y: 1 });
      gsap.to(obj.rotation, { y: 0 });
      gsap.to(obj.position, { z: 0 });
    }
  }
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
