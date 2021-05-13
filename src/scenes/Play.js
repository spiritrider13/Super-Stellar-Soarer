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
        this.load.image('junk', './assets/junk.png');
        this.load.image('block1', './assets/block1.png');
        this.load.image('spaceShip', './assets/spaceship.png');

    }

    create() {
        this.space = this.add.tileSprite(0,0,720,1080,'space').setOrigin(0,0);
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'PLAY', titleTextConfig).setOrigin(0.5);
        // add spaceship
        this.p1Ship = new spaceShip(this, 50, 430, 'spaceShip', 128, 80).setOrigin(0,1);

        // obstacle
        this.obstacle1 = new Obstacle(0, this, 720, 1080, 'coin').setOrigin(0,0);
        this.obstacle2 = new Obstacle(0, this, 720, 1080, 'junk').setOrigin(0,0);
        this.obstacle3 = new Obstacle(0, this, 720, 1080, 'block1').setOrigin(0,0);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, 1000, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })

        this.gameover = false;
        this.gameStart = false;
    }

    update() {

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
}