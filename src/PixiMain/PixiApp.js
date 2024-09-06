import { Application, Assets } from "pixi.js";
import FlamingLogo from "./Objekte/logo";

class PixiMainApp extends Application {
    constructor() {
        super();
    };

    async initApp() {
        await this.init({width: window.innerWidth, height: window.innerHeight, backgroundColor: "black"});
        this.logo = new FlamingLogo(this);
    }

    async preload() {
        await this.logo.preload();
    }

    create() {
        this.logo.create();
    }

    addToDOMElement(target) {
        document.querySelector(target).appendChild(this.canvas)
    }

    update() {
        this.logo.update();
    }

    screenResize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
        this.logo.screenResize();
    }

    destroyScene() {
        this.stage.destroy();
    }
}

export default PixiMainApp;
