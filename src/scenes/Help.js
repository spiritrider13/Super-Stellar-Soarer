/*

The Help scene is the home directory of the tutorials page. From here, the player can find
how to play the game, controls, hints, etc.

*/
class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }

    preload() {
        this.load.image('background', './assets/helpBackground.png');


    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);

        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'HOW TO PLAY', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 35);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 35, 'BACK TO MENU', subtitleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })

        // Help text
        this.helpText = this.add.text(game.config.width/2, 200, 
            'Press PLAY to be taken to the main screen,\nwhere you can navigate the different menus of the game.', normalTextConfig).setOrigin(0.5);

    }

    update() {
        


        
    }
}