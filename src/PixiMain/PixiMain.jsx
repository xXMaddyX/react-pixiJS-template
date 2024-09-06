import { useEffect } from "react";
import PixiMainApp from "./PixiApp.js";

const PixiMain = () => {
    useEffect(() => {
        document.querySelector('.pixi-app').innerHTML = null
        const APP = new PixiMainApp();

        const initPixi = async () => {
            await APP.initApp();
            await APP.preload();
            APP.create();
            APP.addToDOMElement(".pixi-app")
            APP.update();
            window.addEventListener('resize', () => {
                APP.screenResize();
            });
        }
        initPixi();
    }, []);

    return(
        <div className="pixi-app"></div>
    )
}


export default PixiMain;