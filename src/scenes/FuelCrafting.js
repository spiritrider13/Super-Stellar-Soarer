/*

The FuelCrafting scene is where the player selects three fuel
components to combine for their ship's fuel for the next launch.

*/
class FuelCrafting extends Phaser.Scene {
    constructor() {
        super("fuelCraftingScene");
    }

    preload() {
        


    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'FUEL CRAFTING', titleTextConfig).setOrigin(0.5);


    }

    update() {
        


        
    }
}