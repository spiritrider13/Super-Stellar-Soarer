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
        this.load.image('boosterTier1', './assets/shipUpgrades/boosterTier1.png');
        this.load.image('boosterTier2', './assets/shipUpgrades/boosterTier2.png');
        this.load.image('boosterTier3', './assets/shipUpgrades/boosterTier3.png');
        this.load.image('boosterNose', './assets/shipUpgrades/noseBoosters.png');
        this.load.image('wings', './assets/shipUpgrades/wings.png');
        this.load.image('ship', './assets/shipUpgrades/rocket.png');
        this.load.image('homeBackground', './assets/spaceSky.png');
        this.load.image('astronaut', './assets/astronaut.png');

        this.load.audio('buttonSFX', './assets/music/buttonSFX.wav');
    }

    create() {
        this.buttonSFX = this.sound.add('buttonSFX',{ volume: 0.8 });
        // background
        this.background = this.add.tileSprite(0,0,game.config.width,game.config.height,'homeBackground').setOrigin(0,0);

        // add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'HOME', titleTextConfig).setOrigin(0.5);

        this.warningText = this.add.text(game.config.width/2, 800, '', normalTextConfig).setOrigin(0.5);

        // PLAY BUTTON ***********************************************************************
        const playButton = new Button(this, game.config.width/2, game.config.height - 35);
        this.add.existing(playButton);
        this.playButtonText = this.add.text(game.config.width/2, game.config.height - 35, 'LAUNCH', buttonTextConfig).setOrigin(0.5);
        playButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            if(fuelComp3 == null){
                this.warningText.text = 'You must select three fuel components first!';
            }else{
                this.scene.start('playScene');
            }
        })
        // QUIT BUTTON ***********************************************************************
        const quitButton = new Button(this, 110, 35);
        this.add.existing(quitButton);
        this.quitButtonText = this.add.text(110, 35, 'QUIT TO MENU', buttonTextConfig).setOrigin(0.5);
        quitButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('menuScene');
        })
        // UPGRADE SHOP BUTTON ***************************************************************
        const shipButton = new Button(this, 610, game.config.height - 35);
        this.add.existing(shipButton);
        this.shipButtonText = this.add.text(610, game.config.height - 35, 'UPGRADE SHOP', buttonTextConfig).setOrigin(0.5);
        shipButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('upgradeScene');
        })
        // FUEL CRAFTING BUTTON ***************************************************************
        const fuelButton = new Button(this, 110, game.config.height - 35);
        this.add.existing(fuelButton);
        this.fuelButtonText = this.add.text(110, game.config.height - 35, 'FUEL CRAFTING', buttonTextConfig).setOrigin(0.5);
        fuelButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.buttonSFX.play();
            this.scene.start('fuelCraftingScene');
        })

        // display rocket
        var x = game.config.width / 2;
        var y = game.config.height / 2;
        this.playerShip = this.add.image(x, y, 'ship').setOrigin(0.5);
        this.playerShip.setScale(3);
        if(boosterTier3){
            this.bt3 = this.add.sprite(x, y, 'boosterTier3').setOrigin(0.5);
            this.bt3.setScale(3);
            this.add.existing(this.bt3);
        }
        else if(boosterTier2){
            this.bt2 = this.add.sprite(x, y, 'boosterTier2').setOrigin(0.5);
            this.bt2.setScale(3);
            this.add.existing(this.bt2);
        }
        else if(boosterTier1){
            this.bt1 = this.add.sprite(x, y, 'boosterTier1').setOrigin(0.5);
            this.bt1.setScale(3);
            this.add.existing(this.bt1);
        }
        
        if(wings){
            this.w = this.add.sprite(x, y, 'wings').setOrigin(0.5);
            this.w.setScale(3);
            this.add.existing(this.w);
        }

        if(boosterNose){
            this.bN = this.add.sprite(x, y, 'boosterNose').setOrigin(0.5);
            this.bN.setScale(3);
            this.add.existing(this.bN);
        }
    }

    update() {
        //background scrolling
        this.background.tilePositionX += 3;
    }
}