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

        this.load.audio('backgroundMusic', './assets/music.mp3');
    }

    create() {
        this.distance = 0;
        this.number = 0;
        this.currentHigh = 0;

        //this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.1, loop: true });
        //this.backgroundMusic.play();
        
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


        this.fuelText = this.add.text(600, 20, 'FUEL: ' + this.rocket.fuel, normalTextConfig).setOrigin(0.5);
        this.distanceDisplay = this.add.text(game.config.width/2, 20, '0 m',  normalTextConfig).setOrigin(0.5);
        this.upgDisplay = this.add.text(10, 0, "UGP: 0", normalTextConfig);

        this.point = new UGP(this, 200, 200, 'coin', 128, 80).setOrigin(0,0);
        this.physics.add.existing(this.point, false);
        this.point.kill = false;
        this.point.body.immovable = true;
        this.point.body.moves = false;

        // obstacle
        this.obstacle1 = new Obstacle(0, this, 100, 0, 'meteor').setOrigin(0);
        this.obstacle2 = new Obstacle(1, this, 100, 0, 'comet').setOrigin(0);
        this.obstacle3 = new Obstacle(2, this, 100, 0, 'satellite').setOrigin(0);
        this.currentObstacle = null;

        /*this.endBlock = this.add.rectangle(100, 200, 520, 400, 0xa9a9a9).setOrigin(0,0);
        this.endText = this.add.text(290, 250, "GAME OVER", titleTextConfig).setOrigin(0,0);
        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, 220, 550);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(220, 550, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
            this.scene.start('homeScene');
        })
        // restart button
        const restartButton = new Button(this, 500, 550);
        this.add.existing(restartButton);
        this.restartButtonText = this.add.text(500, 550, 'RESTART', titleTextConfig).setOrigin(0.5);
        restartButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
            this.scene.start('playScene');
        })
        this.endBlock.setVisible(false);
        this.endText.setVisible(false);
        backButton.setVisible(false);
        this.backButtonText.setVisible(false);
        restartButton.setVisible(false);
        this.restartButtonText.setVisible(false);*/

        this.gameOver = false;
        this.gameStart = false;
    }

    update(time, delta) {
        if (!this.gameStart){
            this.gameStart = true; 
            if (this.currentObstacle != null){
                this.currentObstacle.end();
            }
            this.beginRandom();
        }

        this.fuelText.text = 'Fuel: ' + this.rocket.fuel;
        this.distanceDisplay.text = this.rocket.distance + ' m';
        this.rocket.update(time, delta);

        if (!this.point.kill){
            this.physics.world.collide(this.point, this.rocket, this.pointCollision, null, this);
            if(this.point.kill){
                this.upgDisplay.text = "UGP: " + this.number;
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
            // give alert sound 
        }

         //check collisions
        if(this.currentObstacle != null && this.checkCollision(this.rocket, this.currentObstacle)) {
            this.gameOver = true;
        }

        if(this.rocket.fuel == 0 ){
            this.gameOver = true; 
        }

        if (this.gameOver == true){
            this.endBlock = this.add.rectangle(100, 200, 520, 400, 0xa9a9a9).setOrigin(0,0);
            this.endText = this.add.text(290, 250, "GAME OVER", titleTextConfig).setOrigin(0,0);
            // BACK BUTTON ***********************************************************************
            const backButton = new Button(this, 220, 550);
            this.add.existing(backButton);
            this.backButtonText = this.add.text(220, 550, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
            backButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                //this.backgroundMusic.stop();
                this.scene.start('homeScene');
            })
            // restart button
            const restartButton = new Button(this, 500, 550);
            this.add.existing(restartButton);
            this.restartButtonText = this.add.text(500, 550, 'RESTART', titleTextConfig).setOrigin(0.5);
            restartButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                //this.backgroundMusic.stop();
                this.scene.start('playScene');
            })
        }
    }   

    pointCollision(){
        this.point.kill = true; 
        this.number += 50; 
        this.point.setActive(false);
        this.point.setVisible(false);  
    }

    pointReset(){
        this.point.kill = false;
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
}