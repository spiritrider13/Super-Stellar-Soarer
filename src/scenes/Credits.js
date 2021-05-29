/*

The Credits scene is where the credits for the project is displayed to the player.

*/
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('background', './assets/spaceSkay.png');
    }

    create() {
        // background image
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/6 - borderUISize - borderPadding, 'CREDITS', titleTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'TEAM AJS', normalTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4, 'Programming', titleTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.1, 'Art & Design', titleTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.53, 'Music & Sound', titleTextConfig).setOrigin(0.5);

        // Programming
        this.add.text(game.config.width/2, game.config.height/3.25, 'Aria Altenburg', normalTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.85, 'Jason Lee', normalTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.53, 'Sam Vik', normalTextConfig).setOrigin(0.5);        

        // Art & Design
        this.add.text(game.config.width/2, game.config.height/1.9, 'Aria Altenburg', normalTextConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/1.75, 'Jason Lee', normalTextConfig).setOrigin(0.5);

        // Music & Sound
        this.add.text(game.config.width/2, game.config.height/1.41, 'Jason Lee', normalTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, 1000, 'BACK TO MENU', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })
    }

    update() {
        //background scrolling
        this.background.tilePositionX += 3;


        
    }
}