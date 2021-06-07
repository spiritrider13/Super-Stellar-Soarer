/*

The Help scene is the home directory of the tutorials page. From here, the player can find
how to play the game, controls, hints, etc.

*/
class Cheats extends Phaser.Scene {
    constructor() {
        super("cheatsScene");
    }

    preload() {
    }

    create() {
        // background
        this.wal2 = this.add.rectangle(0,0,game.config.width,game.config.height,0x9ccc9c).setOrigin(0,0);

        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'CHEAT MENU', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 80, 'BACK TO MENU', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })

        // Help text
        this.helpText = this.add.text(game.config.width/2, 200, 
            'Press PLAY to be taken to the main screen,\nwhere you can navigate the different menus of the game.', normalTextConfig).setOrigin(0.5);

        
        // UNLIMITED POINTS BUTTON ***********************************************************************

        const freeUpgradesButton = new Button(this, game.config.width/2, 340);
        this.add.existing(freeUpgradesButton);
        this.freeUpgradesButtonText = this.add.text(game.config.width/2, 300, 'FREE UPGRADES: ' + freeUpgradesStatus, subtitleTextConfig).setOrigin(0.5);
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
            //this.update();
        })

        // BACK BUTTON ***********************************************************************
        /*const backButton = new Button(this, game.config.width/2, game.config.height - 40);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 80, 'BACK TO MENU', subtitleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })*/

    }

    update() {
        


        
    }
}