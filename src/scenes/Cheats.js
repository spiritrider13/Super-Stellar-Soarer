/*

The Help scene is the home directory of the tutorials page. From here, the player can find
how to play the game, controls, hints, etc.

*/
class Cheats extends Phaser.Scene {
    constructor() {
        super("cheatsScene");
    }

    preload() {
        this.load.image('cheatsBackground', './assets/backgrounds/cheatsBackground.png');
    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,game.config.width,game.config.height,'cheatsBackground').setOrigin(0,0);

        //add some text labels
       // this.sceneText = this.add.text(game.config.width/2, 20, 'CHEAT MENU', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 40, 'BACK TO MENU', buttonTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })

        // Help text
        this.helpText = this.add.text(game.config.width/2, 200, 
            'Here you can enable cheats to quickly\naccess game features', normalTextConfig).setOrigin(0.5);

        
        // UNLIMITED POINTS BUTTON ***********************************************************************
        const freeUpgradesButton = new Button(this, game.config.width/2, 300);
        this.add.existing(freeUpgradesButton);
        this.freeUpgradesButtonText = this.add.text(game.config.width/2, 300, 'FREE UPGRADES: ' + freeUpgradesStatus, normalTextConfig).setOrigin(0.5);
        freeUpgradesButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(freeUpgrades){
                freeUpgrades = false;
                freeUpgradesStatus = "OFF";
            }
            else{
                freeUpgrades = true;
                freeUpgradesStatus = "ON";
            }
            this.freeUpgradesButtonText.text = 'FREE UPGRADES: ' + freeUpgradesStatus;
        })

        // FREE FUEL BUTTON ***********************************************************************
        const freeFuelButton = new Button(this, game.config.width/2, 400);
        this.add.existing(freeFuelButton);
        this.freeFuelButtonText = this.add.text(game.config.width/2, 400, 'UNLOCK ALL FUEL: ' + freeFuelStatus, normalTextConfig).setOrigin(0.5);
        freeFuelButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(unlockAllFuel){
                unlockAllFuel = false;
                freeFuelStatus = "OFF";
            }
            else{
                unlockAllFuel = true;
                freeFuelStatus = "ON";
            }
            this.freeFuelButtonText.text = 'UNLOCK ALL FUEL: ' + freeFuelStatus;
        })

        // UNLIMITED FUEL BUTTON ***********************************************************************
        const unlimitedFuelButton = new Button(this, game.config.width/2, 500);
        this.add.existing(unlimitedFuelButton);
        this.unlimitedFuelButtonText = this.add.text(game.config.width/2, 500, 'INFINITE FUEL: ' + unlimitedFuelStatus, normalTextConfig).setOrigin(0.5);
        unlimitedFuelButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(unlimitedFuel){
                unlimitedFuel = false;
                unlimitedFuelStatus = "OFF";
            }
            else{
                unlimitedFuel = true;
                unlimitedFuelStatus = "ON";
            }
            this.unlimitedFuelButtonText.text = 'INFINITE FUEL: ' + unlimitedFuelStatus;
        })
    }

    update() {
        


        
    }
}