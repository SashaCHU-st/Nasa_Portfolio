declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher } from "three";
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enableDamping: boolean;
    update(): void;
  }
}
