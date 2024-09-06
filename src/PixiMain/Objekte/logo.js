import PixiMainApp from "../PixiApp";
import { Assets, Sprite, Text } from "pixi.js";

class FlamingLogo {
    constructor(app) {
        /**@type {PixiMainApp} */
        this.app = app;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isPickedUp = false;

        this.currentScreenSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.STATES = {
            moveRight: 1,
            moveLeft: 2,
        }
        this.currentState;
        this.stateMachine(this.STATES.moveRight)
    }
//-------------------------<<<<Basic Funcs>>>>------------------------------>
    async preload() {
        this.logoSprite = await Assets.load('./src/assets/test.png');
    }

    async create() {
        this.logo = new Sprite(this.logoSprite);
        this.logo.zIndex = 10
        this.logo.interactive = true
        this.logo.on('click', () => {
            this.addListenerToLogo();
        })
        this.logo.x = this.app.renderer.width / 2;
        this.logo.y = this.app.renderer.height / 2;
        this.logo.anchor.set(0.5);
        
        this.basicText = new Text(
            { 
                text: 'Flaming Trails Logo',
                style: {
                    fontSize: 82,
                    stroke: { 
                        color: 'white', 
                        width: 4, 
                        join: 'round' 
                    },
                    dropShadow: {
                        color: '#FFFFFF',
                        blur: 4,
                        angel: 1.5,
                        alpha: 2,
                        angle: Math.PI / 6,
                        distance: 10,
                    },
                }
            });
            
            this.basicText.anchor.set(.5)
            this.basicText.skew.set(0.0, 0.0)
            this.basicText.x = this.app.renderer.width / 2;
            this.basicText.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.logo);
            this.app.stage.addChild(this.basicText);
            
            this.addMouseMove()
        }
        
    update() {
        this.app.ticker.add(() => {
            this.basicText.rotation += 0.01;
            this.logo.rotation += .01;
            if (!this.isPickedUp) {
                this.checkState();
                this.checkPosition();
            }
        });
    }
        
    screenResize() {
        this.currentScreenSize.height = window.innerHeight;
        this.currentScreenSize.width = window.innerWidth;
        this.updatePositionAtRerender();
    }
//------------------------<<<<BASIC_FUNCTIONS_END------------------------>

    //CUSTOM_CLASS_FUNCTIONS------------------>
    stateMachine(newState) {
        this.currentState = newState;
    }
    
    checkState() {
        if (this.currentState == this.STATES.moveRight) {
            this.logo.x += 3
        }
        if (this.currentState == this.STATES.moveLeft) {
            this.logo.x -= 3
        }
    }

    checkPosition() {
        if (this.logo.x >= this.currentScreenSize.width - 50) {
            this.stateMachine(this.STATES.moveLeft)
        }
        if (this.logo.x <= 50) {
            this.stateMachine(this.STATES.moveRight)
        }
    }


    addListenerToLogo() {
        this.isPickedUp = !this.isPickedUp
        this.stateMachine(this.currentState)
    }

    updatePositionAtRerender() {
        this.logo.x = this.app.renderer.width / 2;
        this.logo.y = this.app.renderer.height / 2;
        this.basicText.x = this.app.renderer.width / 2;
        this.basicText.y = this.app.renderer.height / 2;
    }

    addMouseMove() {
        window.addEventListener('mousemove', (e) => {
            if (this.isPickedUp) {
                this.logo.x = e.clientX
                this.logo.y = e.clientY
            }
        })
    }

}

export default FlamingLogo;