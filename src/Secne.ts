import * as THREE from "three";
import { ArOperator } from "./ArOperator";

//const THREEx = require("@ar-js-org/ar.js/three.js/build/ar-threex");

export class Scene {
  public scene: THREE.Scene;
  private canvas: HTMLCanvasElement;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer();
    this.camera = this.setCamera();
    this.renderer = this.setRenderer();
  }
  public setCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(16 / 10, 30);
    this.scene.add(camera);
    this.camera = camera;
    return camera;
  }
  public setObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    this.scene.add(object);
  }
  public setRenderer(): THREE.WebGLRenderer {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas,
    });
    return this.renderer;
  }
  public render() {
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(640, 480);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const ar = new ArOperator();
    this.renderer.setAnimationLoop(() => {
      ar.testAnimation(this.scene, this.camera, this.renderer);
    });
  }
}
