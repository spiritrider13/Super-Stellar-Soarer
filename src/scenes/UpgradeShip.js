/*

The UpgradeShip scene is where the player can purchase ship upgrades to improve
flight performance.

*/
class UpgradeShip extends Phaser.Scene {
    constructor() {
        super("upgradeShipScene");
    }

    preload() {
        


    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'UPGRADE SHIP', titleTextConfig).setOrigin(0.5);

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