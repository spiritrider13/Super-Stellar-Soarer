// FuelComponent Parent Class for all child fuel components.
// All fuel components shall inheret / "extend" this class.
class FuelComponent extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.power;         //how quickly the fuel causes the rocket to accelerate
        this.duration;      //how slowly the fuel burns
        this.stability;     //smoothness of the burn / how gradual the acceleration is
    }
}