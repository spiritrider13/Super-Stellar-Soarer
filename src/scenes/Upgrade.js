/*



*/
class Upgrade extends Phaser.Scene {
    constructor() {
        super("upgradeScene");
    }

    preload() {
        this.load.image('background', './assets/upgradeBackground.png');
        this.load.image('engineer', './assets/engineer.png');

        // Ship Upgrades
        this.load.image('spaceShip', './assets/shipUpgrades/rocket.png');
        this.load.image('boosterTier1', './assets/shipUpgrades/boosterTier1.png');
        this.load.image('boosterTier2', './assets/shipUpgrades/boosterTier2.png');
        this.load.image('booserTier3', './assets/shipUpgrades/boosterTier3.png');
        this.load.image('noseBoosters', './assets/shipUpgrades/noseBoosters.png');
        this.load.image('wings', './assets/shipUpgrades/wings.png');
    }

    create() {
        // background
        this.background = this.add.tileSprite(0,0,720,1080,'background').setOrigin(0,0);
        this.engineer = this.add.sprite(100, 100, 'engineer').setOrigin(0,0);
        this.engineer1 = this.add.sprite(100, 300, 'engineer').setOrigin(0,0);
        this.engineer2 = this.add.sprite(100, 500, 'engineer').setOrigin(0,0);
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'UPGRADE SHOP', titleTextConfig).setOrigin(0.5);
        this.pointsText = this.add.text(game.config.width/2, 800, 'POINTS AVAILABLE: ' + points, subtitleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, game.config.width/2, game.config.height - 35);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(game.config.width/2, game.config.height - 35, 'BACK TO HOME', buttonTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })

        // UPGRADE BOOSTERS BUTTON ***********************************************************************
        this.warningBoostersText = this.add.text(game.config.width/2, 160, '', normalTextConfig).setOrigin(0.5);

        const upgradeBoostersButton = new Button(this, game.config.width/2, 200);
        this.add.existing(upgradeBoostersButton);
        this.upgradeBoostersButtonText = this.add.text(game.config.width/2, 120, 
            'CURRENT TIER: ' + currentBoosterTier + "\nUPGRADE COST: " + upgradeBoostersCost, subtitleTextConfig).setOrigin(0.5);
        this.upgradeBoostersButtonInnerText = this.add.text(game.config.width/2, 200, 'UPGRADE', buttonTextConfig).setOrigin(0.5);
        upgradeBoostersButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(boosterTier3){
                this.warningBoostersText.text = "No more upgrades available: Boosters at maximum tier!";
            }
            else if(boosterTier2){
                if(points >= upgradeBoostersCost || freeUpgrades){
                    boosterTier3 = true;
                    currentBoosterTier = 3 + " (MAX)";
                    upgradeBoostersCost = "NA";
                    powerBuff = 200;
                }else{
                    this.warningBoostersText.text = "Not enough points for selected upgrade!";
                }
                
            }
            else if(boosterTier1){
                if(points >= upgradeBoostersCost || freeUpgrades){
                    boosterTier2 = true;
                    currentBoosterTier = 2;
                    upgradeBoostersCost = 15;
                    powerBuff = 100;
                }else{
                    this.warningBoostersText.text = "Not enough points for selected upgrade!";
                }
            }
            else{
                if(points >= upgradeBoostersCost || freeUpgrades){
                    boosterTier1 = true;
                    currentBoosterTier = 1;
                    upgradeBoostersCost = 10;
                    powerBuff = 50;
                }else{
                    this.warningBoostersText.text = "Not enough points for selected upgrade!";
                }
            }

            this.upgradeBoostersButtonText.text = 'CURRENT TIER: ' + currentBoosterTier + "\nUPGRADE COST: " + upgradeBoostersCost;
            this.pointsText.text = 'POINTS AVAILABLE: ' + points;
        })

        // BUY NOSE BOOSTERS BUTTON ***********************************************************************
        this.noseBoostersCostText = "UPGRADE COST: 12";
        this.warningNoseText = this.add.text(game.config.width/2, 360, '', normalTextConfig).setOrigin(0.5);

        const noseBoostersButton = new Button(this, game.config.width/2, 400);
        this.add.existing(noseBoostersButton);
        this.noseBoostersButtonText = this.add.text(game.config.width/2, 320, 
            'NOSE BOOSTERS\n' + this.noseBoostersCostText, subtitleTextConfig).setOrigin(0.5);
        this.noseBoostersButtonInnerText = this.add.text(game.config.width/2, 400, 'UPGRADE', buttonTextConfig).setOrigin(0.5);
        noseBoostersButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(boosterNose){
                this.warningNoseText.text = "Nose Boosters already bought!";
            }else{
                if(points >= 12 || freeUpgrades){
                    boosterNose = true;
                    this.noseBoostersCostText = "EQUIPPED";
                    turningBuff = 100;
                }else{
                    this.warningNoseText.text = "Not enough points for selected upgrade!";
                }
            }

            this.noseBoostersButtonText.text = 'NOSE BOOSTERS\n' + this.noseBoostersCostText;
            this.pointsText.text = 'POINTS AVAILABLE: ' + points;
        })

        // BUY WINGS BUTTON ***********************************************************************
        this.wingsCostText = "UPGRADE COST: 8";
        this.warningWingsText = this.add.text(game.config.width/2, 560, '', normalTextConfig).setOrigin(0.5);

        const wingsButton = new Button(this, game.config.width/2, 600);
        this.add.existing(wingsButton);
        this.wingsButtonText = this.add.text(game.config.width/2, 520, 
            'WINGS\n' + this.wingsCostText, subtitleTextConfig).setOrigin(0.5);
        this.wingsButtonInnerText = this.add.text(game.config.width/2, 600, 'UPGRADE', buttonTextConfig).setOrigin(0.5);
        wingsButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if(wings){
                this.warningWingsText.text = "Nose Boosters already bought!";
            }else{
                if(points >= 8 || freeUpgrades){
                    wings = true;
                    this.wingsCostText = "EQUIPPED";
                    stabilityBuff = 100;
                }else{
                    this.warningWingsText.text = "Not enough points for selected upgrade!";
                }
            }

            this.wingsButtonText.text = 'WINGS\n' + this.wingsCostText;
            this.pointsText.text = 'POINTS AVAILABLE: ' + points;
        })
    }

    update() {
        this.clock = this.time.delayedCall(1000, () => {
            this.engineer.y += 1
            this.engineer1.y += 1
            this.engineer2.y += 1
        }, null, this);
        this.clock = this.time.delayedCall(1500, () => {
            this.engineer.y -= 1
            this.engineer1.y -= 1
            this.engineer2.y -= 1
        }, null, this);
    }
}