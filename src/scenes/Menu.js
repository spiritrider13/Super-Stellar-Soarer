//Main menu

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('buttonUp', './assets/buttonUp.png');
        this.load.image('buttonOver', './assets/buttonOver.png');
        this.load.image('buttonDown', './assets/buttonDown.png');
        this.load.image('spaceSky', './assets/spaceSky.png');
        this.load.image('moon', './assets/moon.png');
    }

    create() {
        this.spaceSky = this.add.tileSprite(0,0,720,1080,'spaceSky').setOrigin(0,0);
        this.moon = this.add.tileSprite(0,0,720,1080,'moon').setOrigin(0,0);
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'MENU', titleTextConfig).setOrigin(0.5);
        this.titleText = this.add.text(game.config.width/2, 300, 'SUPER STELLAR SOARER', titleTextConfig).setOrigin(0.5);

        
        // PLAY BUTTON ***********************************************************************
        const playButton = new Button(this, 110, 660);
        this.add.existing(playButton);
        this.playButtonText = this.add.text(110, 620, 'PLAY', titleTextConfig).setOrigin(0.5);
        playButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })
        // CREDITS BUTTON ********************************************************************
        const creditsButton = new Button(this, 110, 760);
        this.add.existing(creditsButton);
        this.creditsButtonText = this.add.text(110, 720, 'CREDITS', titleTextConfig).setOrigin(0.5);
        creditsButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('creditsScene');
        })
        // HELP BUTTON ***********************************************************************
        const helpButton = new Button(this, 110, 860);
        this.add.existing(helpButton);
        this.helpButtonText = this.add.text(110, 820, 'HELP', titleTextConfig).setOrigin(0.5);
        helpButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('helpScene');
        })
    }

    update() {
        //background scrolling
        this.spaceSky.tilePositionX += 3;
    }
}