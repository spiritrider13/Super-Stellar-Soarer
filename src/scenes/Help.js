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
        this.sceneText = this.add.text(game.config.width/2, 20, 'HELP', titleTextConfig).setOrigin(0.5);

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
        


        
    }
}