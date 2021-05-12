/*

The Credits scene is where the credits for the project is displayed to the player.

*/
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        


    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'CREDITS', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, 1000, 'BACK TO MENU', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('menuScene');
        })
    }

    update() {
        


        
    }
}