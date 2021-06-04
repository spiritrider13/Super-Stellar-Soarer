/*



*/
class Upgrade extends Phaser.Scene {
    constructor() {
        super("upgradeScene");
    }

    preload() {
        this.load.image('background', './assets/upgradeBackground.png');

        // Ship Upgrades
        this.load.image('spaceShip', './assets/shipUpgrades/rocket.png');
        this.load.image('boosterTier1', './assets/shipUpgrades/boosterTier1.png');
        this.load.image('boosterTier2', './assets/shipUpgrades/boosterTier2.png');
        this.load.image('booserTier3', './assets/shipUpgrades/boosterTier3.png');
        this.load.image('noseBoosters', './assets/shipUpgrades/noseBoosters.png');
        this.load.image('wings', './assets/shipUpgrades/wings.png');
    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);

        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'UPGRADE SHOP', titleTextConfig).setOrigin(0.5);

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