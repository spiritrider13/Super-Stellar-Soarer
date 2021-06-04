// Object prefab
class UGP extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;   
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
      
    }

    begin(){
        var random = Math.floor(Math.random() * 600);
        this.x = 60 + random;
        this.y = 60 + random;
    }
    reset() {




    }
}