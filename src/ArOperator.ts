import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex";

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
      // ※1 作ったマーカーのPattern Ratioを入れる
      patternRatio: 0.5,
    });
  }
  public testAnimation(scene: any, camera: any, renderer: any) {
    if (this.arToolkitSource.ready) {
      this.arToolkitContext.update(this.arToolkitSource.domElement);
      scene.visible = camera.visible;
    }
    renderer.render(scene, camera);
  }
}
