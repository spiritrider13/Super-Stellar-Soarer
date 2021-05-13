/*

FuelComponent Parent Class for all child fuel components.
All fuel components shall inheret / "extend" this class.

All texture dimensions should be 100 x 100 pixels

*/
class FuelComponent extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame) {
        super(scene, 999, 999, texture, frame);
        //scene.add.existing(this);

        this.power;         //how quickly the fuel causes the rocket to accelerate
        this.duration;      //how slowly the fuel burns
        this.stability;     //smoothness of the burn / how gradual the acceleration is
    }

    paint(scene, x, y){
        scene.add.existing(this);
        this.x = x;
        this.y = y;

        // add highlight box
        this.highlight = scene.add.rectangle(x, y, 100, 100, '0xFFFFFF').setOrigin(0.5);
        this.highlight.alpha = 0;

        this.setInteractive()
        // highlight the component if hovering over
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.highlight.alpha = 0.3;
        })
        // stop highlighting when cursor moves away
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.highlight.alpha = 0;
        })
    }
}

