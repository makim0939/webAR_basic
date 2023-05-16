declare module "@ar-js-org/ar.js/three.js/build/ar-threex" {
  class ArMarkerControls {
    constructor() {}
  }

  class ArToolkitSource {
    public ready: boolean;
    public domElement: HTMLElement;

    constructor(option: {
      sourceType?: string; //"webcam" | "image" | "video"
      sourceURL?: string;
      sourceWidth?: number;
      sourceHeight?: number;
      displayWidth?: number;
      displayHeight?: number;
    });
    /**
     * カメラ映像がvideoタグに出力される
     */
    public init(onReady: () => void): any;
  }

  class ArToolkitContext {
    public ready: boolean;
    public domElement: HTMLElement;

    constructor(option: {
      trackingBackend?; //'artoolkit'| 'aruco'
      debug?: boolean;
      detectionMode?: string; //['color', 'color_and_matrix', 'mono', 'mono_and_matrix']
      cameraParametersUrl?: string;
      maxDetectionRate?: number;
      canvasWidth?: number;
      canvasHeight?: number;
      patternRatio?: number;
      labelingMode?: string; //['black_region', 'white_region']
      imageSmoothingEnabled?: boolean;
    });
    /**
     * カメラ映像がvideoタグに出力される
     */
    public init(onCompleted: () => void): any;
    public update(srcElement: HTMLElement): boolean;
    public getProjectionMatrix(): Matrix4;
  }
}
