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
        this.load.audio('buttonSFX', './assets/music/buttonSFX.wav');
        this.load.image('soarer', './assets/soarer.png');
        this.load.image('superStellar', './assets/superStellar.png');
    }

    create() {
        this.buttonSFX = this.sound.add('buttonSFX',{ volume: 0.8 });
        // background
        this.spaceSky = this.add.tileSprite(0,0,game.config.width,game.config.height,'spaceSky').setOrigin(0,0);
        this.moon = this.add.tileSprite(0,0,game.config.width,game.config.height,'moon').setOrigin(0,0);

        this.title1 = this.add.image(game.config.width/2, 200, 'superStellar').setOrigin(0.5);
        this.title2 = this.add.image(game.config.width/2, 305, 'soarer').setOrigin(0.5);

        // PLAY BUTTON ***********************************************************************
        const playButton = new Button(this, 110, 500);
        this.add.existing(playButton);
        this.playButtonText = this.add.text(110, 500, 'PLAY', buttonTextConfig).setOrigin(0.5);
        playButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('homeScene');
        })
        // CREDITS BUTTON ********************************************************************
        const creditsButton = new Button(this, 110, 600);
        this.add.existing(creditsButton);
        this.creditsButtonText = this.add.text(110, 600, 'CREDITS', buttonTextConfig).setOrigin(0.5);
        creditsButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('creditsScene');
        })
        // HELP BUTTON ***********************************************************************
        const helpButton = new Button(this, 110, 700);
        this.add.existing(helpButton);
        this.helpButtonText = this.add.text(110, 700, 'HELP', buttonTextConfig).setOrigin(0.5);
        helpButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('helpScene');
        })
        // CHEATS BUTTON ***********************************************************************
        const cheatsButton = new Button(this, 110, 800);
        this.add.existing(cheatsButton);
        this.cheatsButtonText = this.add.text(110, 800, 'CHEATS MENU', buttonTextConfig).setOrigin(0.5);
        cheatsButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('cheatsScene');
        })
    }

    update() {
        //background scrolling
        this.spaceSky.tilePositionX += 3;
    }
}