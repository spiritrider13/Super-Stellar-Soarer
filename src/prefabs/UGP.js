// Object prefab
class UGP extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;   
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.number =0;
    }

    update() {
    }
}