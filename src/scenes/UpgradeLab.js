/*

The UpgradeLab scene is where the player can upgrade the Lab machines
and improve crew efficiency/performance.

*/
class UpgradeLab extends Phaser.Scene {
    constructor() {
        super("upgradeLabScene");
    }

    preload() {
        this.load.image('background', './assets/upgradeBackground.png');



    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);


        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'UPGRADE LAB', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, 1000, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })
    }

    update() {
        


        
    }
}