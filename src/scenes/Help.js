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
        this.gameControl = this.add.sprite(130, 300, 'controller').setOrigin(0,0);

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
        this.helpText1 = this.add.text(game.config.width/2, 100, 
            'Press PLAY to be taken to the main screen,\nwhere you can navigate the different menus of the game.\n',
            normalTextConfig).setOrigin(0.5);
        this.helpText2 = this.add.text(game.config.width/2, 200, 
            'Use the Arrow Keys to rotate and thrust forward.\nCollect the green coins to earn upgrade points.\nUpgrade points may be spent after flight\nin the Upgrade Shop',
            normalTextConfig).setOrigin(0.5);
        this.helpText3 = this.add.text(game.config.width/2, 300, 
            'In the fuel crafting menu,you can select three fuel components \nthat will determine different stats for your rocket.\nPower: affects your thrust speed.\nDuration: your total fuel storage in flight.\nStability: shakiness of rocket during thrust.', 
            normalTextConfig).setOrigin(0.5);
        this.helpText4 = this.add.text(game.config.width/2, 400, 
            '', 
            normalTextConfig).setOrigin(0.5);
    }
}