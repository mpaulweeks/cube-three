
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let aspectRatio = windowWidth / windowHeight;
const distance = 3;
const isMobile = mobileAndTabletCheck();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  aspectRatio,
  0.1,
  1000
);
camera.position.z = distance;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = undefined;
let MOUSE_DOWN = undefined;
let mobilePresetIndex = 0;
let checkForHoldTimeout = undefined;

let tick = 0;
function step(){
  tick += 0.1;
  scene.children.forEach(mesh => {
    const b = mesh.block;
    b.rotate();
    b.paint(tick);
  });
}
function animate() {
  requestAnimationFrame(animate);
  step();

  if (!isMobile) {
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      INTERSECTED = intersects[0].object;
    } else {
      INTERSECTED = null;
    }
  }

  if (INTERSECTED) {
    // todo make an option?
    // INTERSECTED.block.paintWhite();
  }

  renderer.render(scene, camera);
};
function onWindowResize() {
  // reset constants
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  aspectRatio = windowWidth / windowHeight;

  // update affected
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize( windowWidth, windowHeight );
}
window.addEventListener('resize', onWindowResize, false);

function updateMouse(event){
  mouse.x = (event.clientX / windowWidth) * 2 - 1;
  mouse.y = - (event.clientY / windowHeight) * 2 + 1;
}
function convertMouseToSpace(){
  return aspectRatio > 1 ? {
    x: mouse.x * distance,
    y: mouse.y * distance / aspectRatio,
  } : {
    x: mouse.x * distance * aspectRatio,
    y: mouse.y * distance,
  }
}

function checkForHold() {
  if (checkForHoldTimeout){
    clearTimeout(checkForHoldTimeout);
  }
  checkForHoldTimeout = setTimeout(() => {
    if (MOUSE_DOWN && !MOUSE_DOWN.isDrag){
      // definitely held in place
      if (isMobile) {
        PRESETS[mobilePresetIndex].load();
        mobilePresetIndex = (mobilePresetIndex + 1) % PRESETS.length;
        MOUSE_DOWN = undefined;
      }
    }
  }, 1000);
}

let moveTick = 0;
function onDocumentMouseMove(event) {
  updateMouse(event);
  if (MOUSE_DOWN){
    MOUSE_DOWN.isDrag = true;
    moveTick += 0.1;
    Block.spawnAt(
      convertMouseToSpace(),
      0,
      moveTick
    );
  }
}
function onDocumentMouseDown(event) {
  updateMouse(event);
  MOUSE_DOWN = {
    isDrag: false,
  };
  checkForHold();
}
function onDocumentMouseUp(event) {
  if (MOUSE_DOWN){
    const { isDrag, startLocation } = MOUSE_DOWN;
    if (!isDrag){
      const newBlock = Block.spawnAt(
        convertMouseToSpace(),
        0,
        moveTick
      );
      newBlock.clone();
      newBlock.clone();
      newBlock.clone();
      newBlock.clone();
    }
  }
  MOUSE_DOWN = undefined;
}
function onContextMenu(event) {
  if (INTERSECTED){
    scene.remove(INTERSECTED);
    INTERSECTED = undefined;
  }
}

// global objects
window.SCENE = scene;
window.CANVAS = document.getElementsByTagName('canvas')[0];

// setup
SCENE.removeAll = () => {
  SCENE.children.concat().forEach(c => {
    SCENE.remove(c);
  });
};
setupMotionListeners(onDocumentMouseMove, onDocumentMouseDown, onDocumentMouseUp, onContextMenu);
Block.original();

// start
animate();

// optional jukebox stuff
createJukebox({
  // todo
  color_scheme: 'dark',
}).then(jukebox => {
  const elm = document.getElementById('jukebox-open');
  elm.parentElement.classList.remove('hidden');
  elm.addEventListener('click', jukebox.open);
});
