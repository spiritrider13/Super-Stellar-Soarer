class spaceShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ANG_VELOCITY = 180;
        this.MAX_VELOCITY = 300;
        this.DRAG = 0.5;

        this.setMaxVelocity(this.MAX_VELOCITY);
        this.setDamping(true);
        this.setDrag(this.DRAG);

        this.fuel = 0;
        this.power = 0;
        this.stability = 0;

        
        //set up key input
        cursors = scene.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        // Inspiration from Phaser3 'Asteroids' example
        // Inside the velocityFromRotation method, the 1st parameter is starting direction (pi/2), second is thrust power
        if(cursors.up.isDown && this.fuel > 0) {
            this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2, this.power, this.body.acceleration);
            this.fuel -= delta/100;
        }
        else if(this.fuel <= 0){
            this.fuel = 0;
            this.setAcceleration(0);
        }
        else {
            this.setAcceleration(0);
        }

        // ship rotation by adjusting angular velocity
        if(cursors.left.isDown) {
            this.setAngularVelocity(-this.ANG_VELOCITY);
        } else if (cursors.right.isDown) {
            this.setAngularVelocity(this.ANG_VELOCITY);
        } else {
            this.setAngularVelocity(0);
        }

        //this.physics.world.wrap(this, this.width);
    }

    initializeFuel(){
        this.fuel = fuelComp1.duration + fuelComp2.duration + fuelComp3.duration;
        this.power = fuelComp1.power + fuelComp2.power + fuelComp3.power;
        this.stability = fuelComp1.stability + fuelComp2.stability + fuelComp3.stability;
    }
}