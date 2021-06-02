/*

The UpgradeShip scene is where the player can purchase ship upgrades to improve
flight performance.

*/
class UpgradeShip extends Phaser.Scene {
    constructor() {
        super("upgradeShipScene");
    }

    preload() {
        this.load.image('background', './assets/upgradeBackground.png');

        


    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);

        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'UPGRADE SHIP', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 80, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })
    }

    update() {
        


        
    }
}