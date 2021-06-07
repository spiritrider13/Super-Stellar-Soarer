class spaceShip extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ANG_VELOCITY = 180;
        if(powerBuff == 50){
            this.MAX_VELOCITY = 500;
        }
        else if(powerBuff == 100){
            this.MAX_VELOCITY = 600;
        }
        else if(powerBuff == 200){
            this.MAX_VELOCITY = 800;
        }else{
            this.MAX_VELOCITY = 400;
        }
        
        this.DRAG = 0.5;

        this.setMaxVelocity(this.MAX_VELOCITY);
        this.setDamping(true);
        this.setDrag(this.DRAG);
        this.setBounce(0);
        this.setCollideWorldBounds(true);
    
        this.fuel = 0;
        this.power = 0;
        this.stability = 0;

        this.distance = 0;
        //set up key input
        cursors = scene.input.keyboard.createCursorKeys();

        //this.layers = scene.make.group({key: 'boosterTier3'});
        //Phaser.Actions.SetXY(this.layers.getChildren(), )



        if(boosterTier3){
            /*this.bt3 = scene.add.sprite(x, y, 'boosterTier3');
            //this.layers.add(scene.add.image(x, y, 'boosterTier3'));
            this.layers.add(this.bt3);
            scene.add.existing(this.bt3);
            //this.bt3.setVisible = true;*/
            //console.log("Test");
            this.bt3 = scene.add.sprite(x, y, 'boosterTier3').setOrigin(0.5);
            if(scene.name == 'homeScene')
                this.bt3.setScale(3);
            scene.add.existing(this.bt3);
        }
        else if(boosterTier2){
            this.bt2 = scene.add.sprite(x, y, 'boosterTier2').setOrigin(0.5);
            if(scene.name == 'homeScene')
                this.bt2.setScale(3);
            scene.add.existing(this.bt2);
        }
        else if(boosterTier1){
            this.bt1 = scene.add.sprite(x, y, 'boosterTier1').setOrigin(0.5);
            if(scene.name == 'homeScene')
                this.bt1.setScale(3);
            scene.add.existing(this.bt1);
        }
        
        if(wings){
            this.w = scene.add.sprite(x, y, 'wings').setOrigin(0.5);
            if(scene.name == 'homeScene')
                this.w.setScale(3);
            scene.add.existing(this.w);
        }

        if(boosterNose){
            this.bN = scene.add.sprite(x, y, 'boosterNose').setOrigin(0.5);
            if(scene.name == 'homeScene')
                this.bN.setScale(3);
            scene.add.existing(this.bN);
        }

        this.playing = false;
        //this.customAngle = 0;

        // Particle effect
        // create line on right side of screen for particles source
        //this.zone = Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);  
        // create particle manager  
        scene.particleManager = scene.add.particles('exhaust');
        // add emitter and setup properties
        this.exhaustEmitter = scene.particleManager.createEmitter({
            x: this.x,
            y: this.y,
            gravityY: 250,
            angle: { min: -30, max: 30 },
            //angle: Math.round((Math.random()) * 2 - 1) * Math.PI,
            lifespan: { min: 200, max: 1000 },
            alpha: { start: 0.5, end: 0.1 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            //emitZone: { type: 'random', source: this.zone, quantity: 150 },
            blendMode: 'ADD',
        });
        /*this.particles = scene.add.particles('exhaust');
        this.exhaustEmitter = this.particles.createEmitter({
            frame: 'exhaust',
            speed: {
                onEmit: function (particle, key, t, value)
                {
                    return this.body.speed;
                }
            },
            lifespan: {
                onEmit: function (particle, key, t, value)
                {
                    return Phaser.Math.Percent(this.body.speed, 0, 300) * 20000;
                }
            },
            alpha: {
                onEmit: function (particle, key, t, value)
                {
                    return Phaser.Math.Percent(this.body.speed, 0, 300) * 1000;
                }
            },
            scale: { start: 1.0, end: 0 },
            blendMode: 'ADD'
        });*/

        //this.point = scene.add.rectangle(x, y, x + 1, y + 1).setOrigin(0.5, 1);

        this.exhaustEmitter.startFollow(this);
        this.exhaustEmitter.on = false;
    }

    update(time, delta){

        // Inspiration from Phaser3 'Asteroids' example
        // Inside the velocityFromRotation method, the 1st parameter is starting direction (pi/2), second is thrust power
        if(cursors.up.isDown && this.fuel > 0) {
            this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2, this.power + powerBuff, this.body.acceleration);
            if(!unlimitedFuel)
                this.fuel -= delta/100;
            this.distance += delta/100;
            
            var force = Math.floor(Math.random() * (999 - (this.stability + stabilityBuff)));
            if(force < 0)
                force = 0;
            //this.scene.physics.velocityFromRotation(Math.random() * Math.PI, force);
            this.body.velocity.x += this.rotation - Math.cos(Math.floor(Math.random() * 600)) * force/9;
            this.body.velocity.y += this.rotation - Math.sin(Math.floor(Math.random() * 600)) * force/9;
            //this.setAngularVelocity(Math.round((Math.random()) * 2 - 1) * force * 10);
            this.angle += Math.round((Math.random()) * 2 - 1) * force/70;

            if(!this.playing){
                this.scene.rocketSound.play();
                this.playing = true;
            }

            this.exhaustEmitter.on = true;
        }
        else if(!cursors.up.isDown && this.playing){
            this.scene.rocketSound.stop();
            this.playing = false;
            this.exhaustEmitter.on = false;
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
            this.setAngularVelocity(-this.ANG_VELOCITY - turningBuff);
        } else if (cursors.right.isDown) {
            this.setAngularVelocity(this.ANG_VELOCITY + turningBuff);
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
    }

    initializeFuel(){
        this.fuel = fuelComp1.duration + fuelComp2.duration + fuelComp3.duration;
        this.power = fuelComp1.power + fuelComp2.power + fuelComp3.power;
        this.stability = fuelComp1.stability + fuelComp2.stability + fuelComp3.stability;
    }
}