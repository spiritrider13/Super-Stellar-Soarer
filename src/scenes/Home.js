/*

The Home scene is where the player interacts with his ship before launch. 
In home, the player is able to move to the fuel selection scene, as well
as the upgrade lab & ship scenes.

*/
class Home extends Phaser.Scene {
    constructor() {
        super("homeScene");
    }

    preload() {
        this.load.image('buttonUp', './assets/buttonUp.png');
        this.load.image('buttonOver', './assets/buttonOver.png');
        this.load.image('buttonDown', './assets/buttonDown.png');

        this.load.image('ship', './assets/junk.png');
    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'HOME', titleTextConfig).setOrigin(0.5);

        this.warningText = this.add.text(game.config.width/2, game.config.height/2, '', normalTextConfig).setOrigin(0.5);

        // PLAY BUTTON ***********************************************************************
        const playButton = new Button(this, game.config.width/2, 940);
        this.add.existing(playButton);
        this.playButtonText = this.add.text(game.config.width/2, 900, 'PLAY', titleTextConfig).setOrigin(0.5);
        playButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(fuelComp3 == null){
                this.warningText.text = 'You must select three fuel components first!';
            }else{
                this.scene.start('playScene');
            }
        })
        // QUIT BUTTON ***********************************************************************
        const quitButton = new Button(this, 110, 60);
        this.add.existing(quitButton);
        this.quitButtonText = this.add.text(110, 20, 'QUIT TO MENU', titleTextConfig).setOrigin(0.5);
        quitButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })
        // UPGRADE LAB BUTTON ****************************************************************
        const labButton = new Button(this, 110, 1040);
        this.add.existing(labButton);
        this.labButtonText = this.add.text(110, 1000, 'UPGRADE LAB', titleTextConfig).setOrigin(0.5);
        labButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('upgradeLabScene');
        })
        // UPGRADE SHIP BUTTON ***************************************************************
        const shipButton = new Button(this, 610, 1040);
        this.add.existing(shipButton);
        this.shipButtonText = this.add.text(610, 1000, 'UPGRADE SHIP', titleTextConfig).setOrigin(0.5);
        shipButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('upgradeShipScene');
        })
        // FUEL CRAFTING BUTTON ***************************************************************
        const fuelButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(fuelButton);
        this.fuelButtonText = this.add.text(game.config.width/2, 1000, 'FUEL CRAFTING', titleTextConfig).setOrigin(0.5);
        fuelButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('fuelCraftingScene');
        })
    }

    update() {
        


        
    }
}