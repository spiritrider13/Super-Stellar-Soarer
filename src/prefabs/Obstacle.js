class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(type, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;
        
    }

    update() {
        // obstacle falling
        this.y += 6;
    }

    // spawn the obstacle and set active
    begin() {
        //add a random offset to the spawn x value
        var random = Math.floor(Math.random() * 600); //creates either 0, 1, or 3

        this.x = 60 + random;
        this.y = -200;
        this.active = true;
        console.log("Obstacle " + this.type + " movement begun");
    }

    end(){
        this.x = 999;
        this.y = 999;
        console.log("Obstacle " + this.type + " movement ceased");
    }
}