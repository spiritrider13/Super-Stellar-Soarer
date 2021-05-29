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

        
        //set up key input
        cursors = scene.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        // Inspiration from Phaser3 'Asteroids' example
        // Inside the velocityFromRotation method, the 1st parameter is starting direction (pi/2), second is thrust power
        if(cursors.up.isDown) {
            this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2, 200, this.body.acceleration);
        } else {
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
    }
}