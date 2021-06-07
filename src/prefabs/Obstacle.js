class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(type, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;
        this.setMaxVelocity(500);
    }

    // spawn the obstacle and set active
    begin() {
        //add a random offset to the spawn x value
        var random = Math.floor(Math.random() * 600);

        this.x = 50 + random;
        this.y = -30;
        this.active = true;
        //console.log("Obstacle " + this.type + " movement begun");
        this.setAcceleration(0);
    }

    end(){
        this.x = -999;
        this.y = -999;
        //console.log("Obstacle " + this.type + " movement ceased");
    }
}