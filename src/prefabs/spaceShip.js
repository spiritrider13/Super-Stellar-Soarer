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

        this.distance = 0;
        //set up key input
        cursors = scene.input.keyboard.createCursorKeys();

        scene.load.image('boosterTier1', './assets/shipUpgrades/boosterTier1.png');
        scene.load.image('boosterTier2', './assets/shipUpgrades/boosterTier2.png');
        scene.load.image('boosterTier3', './assets/shipUpgrades/boosterTier3.png');
        scene.load.image('boosterNose', './assets/shipUpgrades/noseBoosters.png');
        scene.load.image('wings', './assets/shipUpgrades/wings.png');

        this.layers = scene.make.group({key: 'boosterTier3'});
        //Phaser.Actions.SetXY(this.layers.getChildren(), )

        if(boosterTier3){
            /*this.bt3 = scene.add.sprite(x, y, 'boosterTier3');
            //this.layers.add(scene.add.image(x, y, 'boosterTier3'));
            this.layers.add(this.bt3);
            scene.add.existing(this.bt3);
            //this.bt3.setVisible = true;*/
            //console.log("Test");
            this.bt3 = scene.add.sprite(x, y, 'boosterTier3').setOrigin(0.5);
            scene.add.existing(this.bt3);
        }
        else if(boosterTier2){
            this.bt2 = scene.add.sprite(x, y, 'boosterTier2').setOrigin(0.5);
            scene.add.existing(this.bt2);
        }
        else if(boosterTier1){
            this.bt1 = scene.add.sprite(x, y, 'boosterTier1').setOrigin(0.5);
            scene.add.existing(this.bt1);
        }
        
        if(wings){
            this.w = scene.add.sprite(x, y, 'wings').setOrigin(0.5);
            scene.add.existing(this.w);
        }

        if(boosterNose){
            this.bN = scene.add.sprite(x, y, 'boosterNose').setOrigin(0.5);
            scene.add.existing(this.bN);
        }
    }

    update(time, delta){
        // Inspiration from Phaser3 'Asteroids' example
        // Inside the velocityFromRotation method, the 1st parameter is starting direction (pi/2), second is thrust power
        if(cursors.up.isDown && this.fuel > 0) {
            this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2, this.power, this.body.acceleration);
            this.fuel -= delta/100;
            this.distance += 10;
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

        if(boosterTier3){
            this.bt3.x = this.x;
            this.bt3.y = this.y;
            this.bt3.angle = this.angle;
        }
        else if(boosterTier2){
            this.bt2.x = this.x;
            this.bt2.y = this.y;
            this.bt2.angle = this.angle;
        }
        else if(boosterTier1){
            this.bt1.x = this.x;
            this.bt1.y = this.y;
            this.bt1.angle = this.angle;
        }

        if(boosterNose){
            this.bN.x = this.x;
            this.bN.y = this.y;
            this.bN.angle = this.angle;
        }

        if(wings){
            this.w.x = this.x;
            this.w.y = this.y;
            this.w.angle = this.angle;
        }
        //this.physics.world.wrap(this, this.width);
    }

    initializeFuel(){
        this.fuel = fuelComp1.duration + fuelComp2.duration + fuelComp3.duration;
        this.power = fuelComp1.power + fuelComp2.power + fuelComp3.power;
        this.stability = fuelComp1.stability + fuelComp2.stability + fuelComp3.stability;
    }
}