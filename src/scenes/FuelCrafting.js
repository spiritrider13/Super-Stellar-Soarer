/*

The FuelCrafting scene is where the player selects three fuel
components to combine for their ship's fuel for the next launch.

*/
class FuelCrafting extends Phaser.Scene {
    constructor() {
        super("fuelCraftingScene");
    }

    preload() {
        this.load.image('ignus', './assets/ignus.png');


    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'FUEL CRAFTING', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, 1000, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })

        //add ignus to scene
        this.ignus = new Ignus(this, 'ignus');
        this.ignus.paint(this, 100, 100);
    }

    update() {
        


        
    }
}