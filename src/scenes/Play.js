/*

Player controls the rocket in this scene

*/

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('space', './assets/space.png');
        this.load.image('coin', './assets/coin.png');
        this.load.image('fuelPoint', './assets/fuelPoint.png');
        // Obstacles
        this.load.image('meteor', './assets/obstacles/meteor.png');
        this.load.image('comet', './assets/obstacles/comet.png');
        this.load.image('satellite', './assets/obstacles/satellite.png');

        // Ship Upgrades
        this.load.image('spaceShip', './assets/shipUpgrades/rocket.png');
        this.load.image('boosterTier1', './assets/shipUpgrades/boosterTier1.png');
        this.load.image('boosterTier2', './assets/shipUpgrades/boosterTier2.png');
        this.load.image('booserTier3', './assets/shipUpgrades/boosterTier3.png');
        this.load.image('noseBoosters', './assets/shipUpgrades/noseBoosters.png');
        this.load.image('wings', './assets/shipUpgrades/wings.png');

        this.load.audio('backgroundMusic', './assets/music/background.mp3');
        this.load.audio('alert', './assets/music/alert.wav');
        this.load.audio('coinSFX', './assets/music/coinSFX.wav');
        this.load.audio('explosionSFX', './assets/music/explosion.mp3');

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 8});
    }

    create() {
        this.number = 0;

        this.alertSFX = this.sound.add('alert',{ volume: 0.1});
        this.coinSFX = this.sound.add('coinSFX', {volume: 0.1});
        this.explosionSFX = this.sound.add('explosionSFX', {volume: 0.1});
        this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.1, loop: true });
        this.backgroundMusic.play();
        
        this.space = this.add.tileSprite(0,0,720,1080,'space').setOrigin(0,0);
        //create invisible wall
        this.b1 = this.add.rectangle(0,0,game.config.width, borderUISize-60, 0xFFFFFF).setOrigin(0, 0);
        this.b2 = this.add.rectangle(0, game.config.height - borderUISize + 60, game.config.width, borderUISize-60, 0xFFFFFF).setOrigin(0, 0);
        this.b3 = this.add.rectangle(0, 0, borderUISize - 60, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.b4 = this.add.rectangle(game.config.width - borderUISize + 60, 0, borderUISize -60, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add spaceship
        this.rocket = new spaceShip(this, game.config.width/2, 600, 'spaceShip', 128, 80).setOrigin(0.5);
        this.rocket.initializeFuel();
        this.physics.add.existing(this.rocket, false);

        this.fuelText = this.add.text(600, 20, 'FUEL: ' + this.rocket.fuel, buttonTextConfig).setOrigin(0.5);
        this.distanceDisplay = this.add.text(game.config.width/2, 20, '0 m',  buttonTextConfig).setOrigin(0.5);
        this.upgDisplay = this.add.text(10, 0, "UGP: 0", buttonTextConfig);

        this.point = new UGP(this, 200, 200, 'coin', 128, 80).setOrigin(0,0);
        this.fuelPoint = new UGP(this, 300,300, 'fuelPoint', 128, 80).setOrigin(0,0);
        this.physics.add.existing(this.point, false);
        this.physics.add.existing(this.fuelPoint, false);

        this.point.kill = false;
        this.point.body.immovable = true;
        this.point.body.moves = false;

        this.fuelPoint.kill = false;
        this.fuelPoint.body.immovable = true;
        this.fuelPoint.body.moves = false;
        this.fuelPoint.setVisible(false);

        // obstacle
        this.obstacle1 = new Obstacle(0, this, 999, 0, 'meteor').setOrigin(0);
        this.obstacle2 = new Obstacle(1, this, 999, 0, 'comet').setOrigin(0);
        this.obstacle3 = new Obstacle(2, this, 999, 0, 'satellite').setOrigin(0);
        this.currentObstacle = null;

        this.currentScore;
        this.maxScore = this.currentScore;

        this.gameOver = false;
        this.gameStart = false;

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8, first: 0}),
            framerate: 30
        });

        // restart button *********************************************************************
        this.restartButton = new Button(this, 500, 550);
        this.add.existing(this.restartButton);
        this.restartButtonText = this.add.text(9999, 9999, 'RESTART', buttonTextConfig).setOrigin(0.5);
        this.restartButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
            this.scene.start('playScene');
        })
        this.restartButton.setVisible(false);

        // BACK BUTTON ***********************************************************************
        this.backButton = new Button(this, 220, 550);
        this.add.existing(this.backButton);
        this.backButtonText = this.add.text(220, 550, 'BACK TO HOME', buttonTextConfig).setOrigin(0.5);
        this.backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
            this.scene.start('homeScene');
        })
        this.backButton.setVisible(false);
    }

    update(time, delta) {
        if (!this.gameStart){
            this.gameStart = true; 
            if (this.currentObstacle != null){
                this.currentObstacle.end();
            }
            this.beginRandom();
        }

        this.fuelText.text = 'Fuel: ' + Math.floor(this.rocket.fuel);
        this.distanceDisplay.text = Math.floor(this.rocket.distance) + ' m';
        this.upgDisplay.text = "UGP: " + this.number;
        this.rocket.update(time, delta);

        if (!this.point.kill){
            this.physics.world.collide(this.point, this.rocket, this.pointCollision, null, this);
            if(this.point.kill){
                this.upgDisplay.text = "UGP: " + this.point.number;
                this.clock = this.time.delayedCall(15000, () => {
                    var random = Math.floor(Math.random() * 600);
                    this.point.setActive(true);
                    this.point.setVisible(true);
                    this.point.x = random;
                    this.point.y = random;
                    this.pointReset();
                }, null, this);
            }
        }

        if (!this.fuelPoint.kill){
            this.physics.world.collide(this.point, this.rocket, this.fuelpointCollision, null, this);
            if(this.fuelPoint.kill){
                this.clock = this.time.delayedCall(20000, () => {
                    var random = Math.floor(Math.random() * 600);
                    this.fuelPoint.setActive(true);
                    this.fuelPoint.setVisible(true);
                    this.fuelPoint.x = random;
                    this.fuelPoint.y = random;
                    this.fuelpointReset();
                }, null, this);
            }
        }

        this.space.tilePositionY -= 3;

        if(this.currentObstacle != null && !this.gameOver && this.gameStart){
            this.currentObstacle.update();

            //if an obstacle falls off screen, spawn new one
            if(this.currentObstacle.y >= 1080 + this.currentObstacle.height){
                this.currentObstacle.end();
                this.beginRandom();
            }
        }

        if (this.rocket.fuel < 50){
            this.alertSFX.play();
        }

        if (Math.floor(this.rocket.distance) == 300){
            this.currentObstacle.y += 8;
        }

        if (Math.floor(this.rocket.distance) == 1000){
            this.currentObstacle.y += 9;
        }

        if (Math.floor(this.rocket.distance) > 1000){
            this.currentObstacle.y += 10;
        }

        //check collisions
        if(this.currentObstacle != null && this.checkCollision(this.rocket, this.currentObstacle)) {
            this.gameOver = true;
            this.explosionSFX.play();
            this.rocketExplode(this.rocket);
        }

        if(this.rocket.fuel == 0 ){
            this.gameOver = true; 
        }

        if (this.gameOver == true){
            this.backgroundMusic.stop();
            this.coinSFX.stop();
            this.alertSFX.stop();
            this.rocket.body.immovable = true;
            this.rocket.body.moves = false;
            this.endBlock = this.add.rectangle(100, 200, 520, 400, 0xa9a9a9).setOrigin(0,0);
            this.endText = this.add.text(290, 250, "GAME OVER", titleTextConfig).setOrigin(0,0);
            this.displayUpg = this.add.text(120, 350, "POINTS EARNED: " + this.number + " points", subtitleTextConfig).setOrigin(0,0);
            points += this.number;
            
            this.restartButtonText.x = 500;
            this.restartButtonText.y = 550;
            this.restartButton.setVisible(true);
            

            this.backButtonText.x = 220;
            this.backButtonText.y = 550;
            this.backButton.setVisible(true);
        }
    }   

    pointCollision(){
        this.coinSFX.play();
        this.point.kill = true; 
        this.number++; 
        this.point.setActive(false);
        this.point.setVisible(false);  
    }

    fuelpointCollision(){
        this.coinSFX.play();
        this.fuelPoint.kill = true; 
        this.rocket.fuel += 20; 
        this.fuelPoint.setActive(false);
        this.fuelPoint.setVisible(false);  
    }

    pointReset(){
        this.point.kill = false;
    }

    fuelpointReset(){
        this.fuelPoint.kill = false; 
    }

    beginRandom() {

        var random = Math.floor(Math.random() * 3); //creates either 0, 1, or 3

        //the following switch block takes the previously generated random number and
        //activates the corresponding obstacle through the Play class
        switch(random){
            case 0:
                this.currentObstacle = this.obstacle1;
                this.obstacle1.begin();
                break;
            case 1:
                this.currentObstacle = this.obstacle2;
                this.obstacle2.begin();
                break;
            case 2:
                this.currentObstacle = this.obstacle3;
                this.obstacle3.begin();
                break;
            default:
                console.error("Invalid random obstacle attempted activation.");
        }
    }

    checkCollision(obstacle, spaceShip) {  // collision function
        // simple AABB checking
        if (obstacle.x < spaceShip.x + spaceShip.width &&
            obstacle.x + obstacle.width > spaceShip.x &&
            obstacle.y < spaceShip.y + spaceShip.height &&
            obstacle.height + obstacle.y > spaceShip.y) {
                return true;
        } else {
            return false;
        }
    }

    rocketExplode(rocket){
        rocket.alpha = 0;

        let boom = this.add.sprite(rocket.x, rocket.y, 'explosion').setOrigin(0, 0); 
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {                     
            rocket.alpha = 1;                  
            boom.destroy();                   
        });
    }
}