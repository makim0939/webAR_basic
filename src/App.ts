import * as THREE from "three";
//import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
const THREEx = require("@ar-js-org/ar.js/three.js/build/ar-threex.js");

let w: number;
let h: number;
let canvas: HTMLCanvasElement;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let object: THREE.Object3D;

let arToolkitSource: any;
let arToolkitContext: any;

function init() {
  w = window.innerWidth;
  h = window.innerHeight;
  //canvas = await (document.createElement("canvas") as HTMLCanvasElement);
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  setScene();
  setCamera();
  setObject();
  setArToolkit();
  setRenderer();
}

const setScene = () => {
  scene = new THREE.Scene();
  scene.visible = false;
};

const setCamera = () => {
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
  scene.add(camera);
};

const setArToolkit = () => {
  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  });

  arToolkitSource.init(() => {
    setTimeout(() => {
      onResize();
    }, 2000);
  });

  arToolkitContext = new THREEx.ArToolkitContext({
    detectionMode: "mono",
    // ※1 作ったマーカーのPattern Ratioを入れる
    patternRatio: 0.5,
  });

  arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  let onRenderFcts = [];
  onRenderFcts.push(() => {
    if (arToolkitSource.ready === false) return;
    arToolkitContext.update(arToolkitSource.domElement);
    scene.visible = camera.visible;
  });

  const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: "pattern",
    // ※2 マーカーのpattファイルのパスを入れる
    patternUrl: "./pattern-marker.patt",
    changeMatrixMode: "cameraTransformMatrix",
  });
};

const setObject = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  object = new THREE.Mesh(geometry, material);
  object.position.set(0, 0, 0);
  scene.add(object);
};

const setRenderer = () => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setAnimationLoop(() => {
    render();
  });
};

const render = () => {
  if (arToolkitSource.ready) {
    console.log("a");
    arToolkitContext.update(arToolkitSource.domElement);
    scene.visible = camera.visible;
  }
  renderer.render(scene, camera);
};

const onResize = () => {
  arToolkitSource.onResizeElement();
  arToolkitSource.copyElementSizeTo(renderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
  }
};

window.addEventListener("resize", () => {
  onResize();
});

window.onload = () => {
  init();
};

// let w = window.innerWidth;
// let h = window.innerWidth;
// const canvas = document.createElement("canvas");
// //setScene
// const scene = new THREE.Scene();
// //setCamera
// const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
// //initialize ArToolKit
// const arToolkitSource = new THREEx.ArToolkitSource({
//   sourceType: "webcam",
// });
// arToolkitSource.init(() => {
//   console.log("arToolKitSource init");
// });
// const arToolkitContext = new THREEx.ArToolkitContext({});
// arToolkitContext.init(() => {
//   console.log("arToolKitContext init");
// });

// const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
//   type: "pattern",
//   patternUrl: "./pattern-marker.patt",
// });

// //setObject
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial();
// const object = new THREE.Mesh(geometry, material);
// object.position.set(0, 0, 0);
// scene.add(object);

// //setRenderer
// const renderer = new THREE.WebGLRenderer({
//   canvas,
//   antialias: true,
//   alpha: true,
// });
// renderer.setClearColor(0x000000, 0);
// renderer.setSize(w, h);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setAnimationLoop(() => {
//   if (arToolkitSource.ready) {
//     arToolkitContext.update(arToolkitSource.domElement);
//   }
//   if (arToolkitContext.arController != null) {
//     arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
//   }
// });
