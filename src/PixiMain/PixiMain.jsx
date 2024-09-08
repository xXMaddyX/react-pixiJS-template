import { useEffect, useMemo } from "react";
import PixiMainApp from "./PixiApp.js";

const PixiMain = () => {
    const APP = useMemo(() => new PixiMainApp(), []); // useMemo stellt sicher, dass die Instanz nur einmal erstellt wird

    useEffect(() => {
        document.querySelector('.pixi-app').innerHTML = null;

        const initPixi = async () => {
            await APP.initApp();
            await APP.preload();
            APP.create();
            APP.addToDOMElement(".pixi-app");
            APP.update();
            window.addEventListener('resize', () => {
                APP.screenResize();
            });
        };

        initPixi();
        return () => {
            window.removeEventListener('resize', APP.screenResize);
        };
    }, [APP]);

    return (
        <div className="pixi-app"></div>
    );
};

export default PixiMain;