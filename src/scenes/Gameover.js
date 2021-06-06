class Play extends Phaser.Scene {
    constructor() {
        super("gameover");
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
    }

    create(){
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

        this.endBlock = this.add.rectangle(100, 200, 520, 400, 0xa9a9a9).setOrigin(0,0);
            this.endText = this.add.text(290, 250, "GAME OVER", titleTextConfig).setOrigin(0,0);
            this.displayUpg = this.add.text(120, 350, "EARNE UGP: " + this.number + " points", buttonTextConfig).setOrigin(0,0);

        // BACK BUTTON ***********************************************************************
            const backButton = new Button(this, 220, 550);
            this.add.existing(backButton);
            this.backButtonText = this.add.text(220, 550, 'BACK TO HOME', buttonTextConfig).setOrigin(0.5);
            backButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
                this.scene.start('homeScene');
            })
        // restart button
            const restartButton = new Button(this, 500, 550);
            this.add.existing(restartButton);
            this.restartButtonText = this.add.text(500, 550, 'RESTART', buttonTextConfig).setOrigin(0.5);
            restartButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.backgroundMusic.stop();
                this.scene.start('playScene');
            })
    }
}