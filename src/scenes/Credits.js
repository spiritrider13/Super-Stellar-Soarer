/*

The Credits scene is where the credits for the project is displayed to the player.

*/
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('background', './assets/creditsBackground.png');
    }

    create() {
        // background image
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);

        // show menu text
        this.add.text(game.config.width/2, 125, 'CREDITS', titleTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 200, 'TEAM AJS', titleTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 305, 'Programming', titleTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, 500, 'Art & Design', titleTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 700, 'Music & Sound', titleTextConfig).setOrigin(0.5);

        // Programming
        this.add.text(game.config.width/2, 340, 'Sam Vik', normalTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, 370, 'Jason Lee', normalTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 400, 'Aria Altenburg', normalTextConfig).setOrigin(0.5);        

        // Art & Design
        this.add.text(game.config.width/2, 535, 'Jason Lee', normalTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, 565, 'Aria Altenburg', normalTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 595, 'Sam Vik', normalTextConfig).setOrigin(0.5);        

        // Music & Sound
        this.add.text(game.config.width/2, 735, 'Jason Lee', normalTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 80, 'BACK TO MENU', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })
    }

    update() {
        //background scrolling
        //this.background.tilePositionX += 3;


        
    }
}