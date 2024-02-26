//https://jeromeetienne.github.io/AR.js/three.js/

declare module "@ar-js-org/ar.js/three.js/build/ar-three.js" {
  //ArMarkerControls
  class ArMarkerControls {
    constructor(
      context,
      object3d,
      parameters: {
        size?: number = 1; //マーカーサイズ(m)
        type?: string = "unknown"; //['pattern', 'barcode', 'unknown' ]
        patternUrl: string;
        barcodeValue?: string = null; //バーコードの値
        changeMatrixMode?: string = "modelViewMatrix"; // [modelViewMatrix, cameraTransformMatrix]
        smooth?: boolean = true;
        smoothCount?: number = 5;
        smoothTolerance?: number = 0.01;
        smoothThreshold?: number = 2;
      }
    );
  }

  //ArToolkitSource
  class ArToolkitSource {
    public ready: boolean;
    public domElement: HTMLElement;

    constructor(option: {
      sourceType: ?string = "webcam"; //"webcam" | "image" | "video"
      sourceURL?: string = null;
      sourceWidth?: number = 640;
      sourceHeight?: number = 480;
      displayWidth?: number = 640;
      displayHeight?: number = 480;
    });
    /**
     * カメラ映像がvideoタグに出力される
     */
    public init(onReady: () => void): any;
  }

  //ArToolkitContext
  class ArToolkitContext {
    public ready: boolean;
    public domElement: HTMLElement;
    public baseURL: string = "https://jeromeetienne.github.io/AR.js/three.js/";
    public arController?: ARController;
    constructor(option: {
      trackingBackend?: string = "artoolkit"; //'artoolkit'| 'aruco'
      debug?: boolean = false;
      detectionMode?: string = "color_and_matrix"; //['color', 'color_and_matrix', 'mono', 'mono_and_matrix']
      matrixCodeType?: string = "3x3"; //[3x3, 3x3_HAMMING63, 3x3_PARITY65, 4x4, 4x4_BCH_13_9_3, 4x4_BCH_13_5_5]
      patternRatio?: number = 0.5; //マーカーの余白比
      labelingMode?: string = "black_region"; //黒字に白マーカーか、白地に黒マーカーか
      cameraParametersUrl?: string = "parameters/camera_para.dat"; //
      maxDetectionRate?: number = 60;
      canvasWidth?: number = 640;
      canvasHeight?: number = 480;
      imageSmoothingEnabled?: true;
    });
    /**
     * カメラ映像がvideoタグに出力される
     */
    public init(onCompleted: () => void): any;
    public update(srcElement: HTMLElement): boolean;
    public getProjectionMatrix(): Matrix4;
  }

  class ARController {}
}
