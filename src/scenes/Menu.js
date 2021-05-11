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

        // beginning of button test code
        const playButton = new Button(this, 300, 500);
        this.add.existing(playButton);

        //when mouse clicks down, log into console
        playButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log('button was pressed in menu');
        })
        // end of button test code


    }

    update() {
        


        
    }
}