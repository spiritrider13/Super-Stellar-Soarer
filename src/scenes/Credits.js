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
        // show menu text
        this.add.text(game.config.width/2, game.config.height/6 - borderUISize - borderPadding, 'CREDITS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'TEAM AJS', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px'
        this.add.text(game.config.width/2, game.config.height/4, 'Programming', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.1, 'Art & Design', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.53, 'Music & Sound', menuConfig).setOrigin(0.5);        this.add.text(530, 440, '<- GO BACK', Menu.menuConfig).setOrigin(0,0);  

        menuConfig.fontSize = '20px'

        // Programming
        this.add.text(game.config.width/2, game.config.height/3.25, 'Aria Altenburg', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.85, 'Jason Lee', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.53, 'Sam Vik', menuConfig).setOrigin(0.5);        this.add.text(530, 440, '<- GO BACK', Menu.menuConfig).setOrigin(0,0);  

        // Art & Design
        this.add.text(game.config.width/2, game.config.height/1.9, 'Aria Altenburg', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/1.75, 'Jason Lee', menuConfig).setOrigin(0.5);

        // Music & Sound
        this.add.text(game.config.width/2, game.config.height/1.41, 'Jason Lee', menuConfig).setOrigin(0.5);
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