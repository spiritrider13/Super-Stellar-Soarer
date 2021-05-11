//Main menu

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('buttonUp', './assets/buttonUp.png');
        this.load.image('buttonOver', './assets/buttonOver.png');
        this.load.image('buttonDown', './assets/buttonDown.png');

    }

    create() {
        const playButton = new Button(this, 300, 500);
        this.add.existing(playButton);

        


    }

    update() {
        


        
    }
}