/*

The Help scene is the home directory of the tutorials page. From here, the player can find
how to play the game, controls, hints, etc.

*/

class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }

    preload() {
        this.load.image('controller', './assets/controller.png');

    }

    create() {
        // background
        this.add.rectangle(0,0,game.config.width,game.config.height,0xe5d3b3).setOrigin(0,0);
        this.gameControl = this.add.sprite(130, 500, 'controller').setOrigin(0,0);

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
        this.helpText2 = this.add.text(game.config.width/2, 300, 
            'In the fuel crafting menu,you can select three different\nfuel components that will determine different stats of your rocket.', normalTextConfig).setOrigin(0.5);
        this.helpText2 = this.add.text(game.config.width/2 + 30, 400, 
            'In the upgrade shop,you can upgrade four different components such\nas wings, nose boosters, and fuel option. This will hugely impact \non your flight.', normalTextConfig).setOrigin(0.5);
       this.helpText3 = this.add.text(game.config.width/+30, 450, 'During the flight, you need be cautious of falling obstacles\nand losing fuel.');
    }
}