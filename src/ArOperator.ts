import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex";
import { Scene } from "./Scene";

export class ArOperator {
  public readonly arToolkitSource;
  public readonly arToolkitContext;

  constructor() {
    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
    });
    this.arToolkitSource.init(() => {
      console.log("init");
    });

    this.arToolkitContext = new THREEx.ArToolkitContext({
      detectionMode: "mono",
      //作ったマーカーのPattern Ratioを入れる
      patternRatio: 0.5,
    });
  }

  public init(scene: Scene) {
    this.arToolkitSource.init(() => {
      console.log("init");
    });

    this.arToolkitContext.init(() => {
      scene
        .getCamera()
        .projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix());
    });
  }

  public testAnimation(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    if (this.arToolkitSource.ready) {
      this.arToolkitContext.update(this.arToolkitSource.domElement);
      scene.visible = camera.visible;
    }
    renderer.render(scene, camera);
  }
}
