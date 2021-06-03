/*

Player controls the rocket in this scene

*/

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('space', './assets/space.png');
        
        // Obstacles
        this.load.image('coin', './assets/coin.png');
        this.load.image('junk', './assets/junk.png');
        this.load.image('block1', './assets/block1.png');
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

        this.load.audio('backgroundMusic', './assets/music.mp3');
    }

    create() {
        this.distance = 0;
        this.number = 0;

        this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.1, loop: true });
        this.backgroundMusic.play();
        
        this.space = this.add.tileSprite(0,0,720,1080,'space').setOrigin(0,0);

        // add some text labels
        // this.sceneText = this.add.text(game.config.width/2, 20, 'PLAY', titleTextConfig).setOrigin(0.5);

        // add spaceship
        this.rocket = new spaceShip(this, game.config.width/2, 900, 'spaceShip', 128, 80).setOrigin(0.5);
        this.rocket.initializeFuel();
        this.physics.add.existing(this.rocket, false);

        this.fuelText = this.add.text(600, 20, 'FUEL: ' + this.rocket.fuel, normalTextConfig).setOrigin(0.5);
        this.distanceDisplay = this.add.text(game.config.width/2, 20, '0 m',  normalTextConfig).setOrigin(0.5);
        this.upgDisplay = this.add.text(10, 0, "UGP: 0", normalTextConfig);

        this.point = new UGP(this, 200, 200, 'coin', 128, 80).setOrigin(0,0);
        this.point.destroyed = false;
        this.point.body.immovable = true;
        this.point.body.moves = false;
        this.currentPoint = null; 

        // obstacle
        //this.obstacle1 = new Obstacle(0, this, 999, 999, 'meteor').setOrigin(0);
        //this.obstacle2 = new Obstacle(1, this, 999, 999, 'junk').setOrigin(0);
        //this.obstacle3 = new Obstacle(2, this, 999, 999, 'block1').setOrigin(0);
        //this.currentObstacle = null;

        // define key
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 80, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.backgroundMusic.stop();
            this.scene.start('homeScene');
        })

        this.gameOver = false;
        this.gameStart = false;
    }

    update(time, delta) {
        this.space.tilePositionY -= 3;
        
        //point respawn
        if (this.currentPoint != null && !this.gameOver && this.gameStart && !this.point.destroyed){
            this.currentPoint.update();
            this.rngLocation();
        }
        /*if(this.currentObstacle != null && !this.gameOver && this.gameStart){
            this.currentObstacle.update();

            //if an obstacle falls off screen, spawn new one
            if(this.currentObstacle.y >= 1080 + this.currentObstacle.height){
                this.currentObstacle.end();
                this.beginRandom();
            }
        }

        if(this.gameOver && this.gameStart){
            this.gameStart = false;
        }*/

        this.fuelText.text = 'Fuel: ' + this.rocket.fuel;
        this.distanceDisplay.text = this.rocket.distance + ' m';
        this.rocket.update(time, delta);

        if (!this.point.destroyed){
            this.physics.world.collide(this.point, this.rocket, this.pointCollision, null, this);
            if(this.point.destroyed){
                this.upgDisplay.text = "UGP: " + this.number;
            }
        }
    }   

    pointCollision(){
        this.point.destroyed = true; 
        this.number += 50; 
        this.point.destroy(); 
    }

    rngLocation(){
        var random = Math.floor(Math.random() * 3);

        switch(random){
            case 0: 
                this.currentPoint = this.point;
                this.point.begin();
                break;
            case 1:
                this.currentPoint = this.point;
                this.point.begin();
                break;
            case 2:
                this.currentPoint = this.point;
                this.point.begin();
                break;
            case 3:
                this.currentPoint = this.point;
                this.point.begin();
                break;
            default:
                console.error("Invalid random obstacle attempted activation.");
        }
    }
    /*beginRandom() {

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
            case 3:
                this.currentObstacle = this.obstacle2;
                this.obstacle2.begin();
                break;
            case 4:
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
    }*/
}