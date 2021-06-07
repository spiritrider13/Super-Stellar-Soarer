/*

The FuelCrafting scene is where the player selects three fuel
components to combine for their ship's fuel for the next launch.

*/

class FuelCrafting extends Phaser.Scene {
    constructor() {
        super("fuelCraftingScene");
    }

    preload() {
        this.load.image('backgroundFuel', './assets/backgrounds/fuelCraftingBackground.jpg');
        this.load.image('ignus', './assets/fuelComponents/Ignus.png');
        this.load.image('cola', './assets/fuelComponents/coke.png');
        this.load.image('cookies', './assets/fuelComponents/cookie.png');
        this.load.image('gasoline', './assets/fuelComponents/gasoline.png');
        this.load.image('honey', './assets/fuelComponents/honey.png');
        this.load.image('hotsauce', './assets/fuelComponents/hotsouce.png');
        this.load.image('hydrogen', './assets/fuelComponents/hydrogen.png');
        this.load.image('icecream', './assets/fuelComponents/icecream.png');
        this.load.image('mayonnaise', './assets/fuelComponents/maayonaise.png');
        this.load.image('mentos', './assets/fuelComponents/mentos.png');
        this.load.image('Qmark', './assets/Qmark1.png');
    }

    create() {
        // background
        this.backgroundImage = this.add.image(0,0,'backgroundFuel').setOrigin(0);

        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'FUEL CRAFTING', buttonTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, 150, game.config.height - 35);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(150, game.config.height - 35, 'BACK TO HOME', buttonTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })

        // CLEAR BUTTON ***********************************************************************
        const clearButton = new Button(this, game.config.width - 150, game.config.height - 35);
        this.add.existing(clearButton);
        this.backButtonText = this.add.text(game.config.width - 150, game.config.height - 35, 'CLEAR SELECTION', buttonTextConfig).setOrigin(0.5);
        clearButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            fuelComp1 = null;
            fuelComp2 = null;
            fuelComp3 = null;
            currentSelection = 1;
            this.refreshStats();
        })

        // ADDING FUEL COMPONENTS TO SCENE START ===========================================================================

        //add ignus to scene
        this.ignus = new Ignus(this, 'ignus');
        this.ignus.paint(this, 100, 100);

        //add  to scene
        this.cola = new Cola(this, 'cola');
        this.cola.paint(this, 275, 100);

        //add  to scene
        this.cookies = new Cookies(this, 'cookies');
        this.cookies.paint(this, 425, 100);

        //add  to scene
        this.gasoline = new Gasoline(this, 'gasoline');
        this.gasoline.paint(this, 600, 100);

        //add  to scene
        this.honey = new Honey(this, 'honey');
        this.honey.paint(this, 100, 275);

        //add  to scene
        this.hotsauce = new HotSauce(this, 'hotsauce');
        this.hotsauce.paint(this, 275, 275);

        //add  to scene
        this.hydrogen = new Hydrogen(this, 'hydrogen');
        this.hydrogen.paint(this, 425, 275);

        //add  to scene
        this.icecream = new Icecream(this, 'icecream');
        this.icecream.paint(this, 600, 275);

        //add  to scene
        this.mayo = new Mayo(this, 'mayonnaise');
        this.mayo.paint(this, 100, 425);

        //add  to scene
        this.mentos = new Mentos(this, 'mentos');
        this.mentos.paint(this, 275, 425);

        // ADDING FUEL COMPONENTS TO SCENE END =============================================================================

        //fuel slot labels
        this.fuelComp1Text = this.add.text(game.config.width/3 - 100, 800 - 130, 'COMPONENT 1', normalTextConfig).setOrigin(0.5);
        this.fuelComp2Text = this.add.text(game.config.width/2, 800 - 130, 'COMPONENT 2', normalTextConfig).setOrigin(0.5);
        this.fuelComp3Text = this.add.text(game.config.width/1.5 + 100, 800 - 130, 'COMPONENT 3', normalTextConfig).setOrigin(0.5);

        //display crafting selection
        this.fuelImage1 = this.add.sprite(game.config.width/3 - 100, 860 - 120, 'Qmark').setOrigin(0.5);
        this.fuelImage2 = this.add.sprite(game.config.width/2, 860 - 120, 'Qmark').setOrigin(0.5);
        this.fuelImage3 = this.add.sprite(game.config.width/1.5 + 100, 860 - 120, 'Qmark').setOrigin(0.5);

        //  if there is no fuel component attatched to a slot, a default question mark image is displayed in its place.
        //  otherwise, the fuel's texture is displayed.
        //fuel 1
        if(fuelComp1 == null){
            this.fuelImage1.setTexture('Qmark');
        }
        else{
            this.fuelImage1.setTexture(fuelComp1.texture);
        }
        //fuel 2
        if(fuelComp2 == null){
            this.fuelImage2.setTexture('Qmark');
        }
        else{
            this.fuelImage2.setTexture(fuelComp2.texture);
        }
        //fuel 3
        if(fuelComp3 == null){
            this.fuelImage3.setTexture('Qmark');
        }
        else{
            this.fuelImage3.setTexture(fuelComp3.texture);
        }

        this.totalDuration = 0;
        this.totalPower = 0;
        this.totalStability = 0;

        this.totalPower += powerBuff;
        this.totalStability += stabilityBuff;

        this.powerText = this.add.text(game.config.width/3 - 100, 700 - 130, 'Power: ' + this.totalPower + " MJ" ,normalTextConfig).setOrigin(0.5);
        this.durationText = this.add.text(game.config.width/2, 700 - 130, 'Capacity: ' + this.totalDuration + " L", normalTextConfig).setOrigin(0.5);
        this.stabilityText = this.add.text(game.config.width/1.5 + 100, 700 - 130, 'Stability: ' + (this.totalStability)/10 + "%", normalTextConfig).setOrigin(0.5);

        //when left click is pressed, refresh all images
        this.input.on('pointerdown', function (pointer){
            this.refreshImages();
        }, this);

        this.refreshStats();
    }

    refreshImages(){
        //fuel 1
        if(fuelComp1 == null){
            this.fuelImage1.setTexture('Qmark');
        }
        else{
            this.fuelImage1.setTexture(fuelComp1.texture);
            this.refreshStats();
        }
        //fuel 2
        if(fuelComp2 == null){
            this.fuelImage2.setTexture('Qmark');
        }
        else{
            this.fuelImage2.setTexture(fuelComp2.texture);
            this.refreshStats();
        }
        //fuel 3
        if(fuelComp3 == null){
            this.fuelImage3.setTexture('Qmark');
        }
        else{
            this.fuelImage3.setTexture(fuelComp3.texture);
            this.refreshStats();
        }
    }

    refreshStats(){
        this.totalDuration = 0;
        this.totalPower = 0;
        this.totalStability = 0;

        if(fuelComp1 != null){
            this.totalDuration += fuelComp1.duration;
            this.totalPower += fuelComp1.power;
            this.totalStability += fuelComp1.stability;
        }
        if(fuelComp2 != null){
            this.totalDuration += fuelComp2.duration;
            this.totalPower += fuelComp2.power;
            this.totalStability += fuelComp2.stability;
        }
        if(fuelComp3 != null){
            this.totalDuration += fuelComp3.duration;
            this.totalPower += fuelComp3.power;
            this.totalStability += fuelComp3.stability;
        }

        this.totalPower += powerBuff;
        this.totalStability += stabilityBuff;
        
        this.powerText.text = 'Power: ' + this.totalPower + " MJ";
        this.durationText.text = 'Capacity: ' + this.totalDuration + " L";
        this.stabilityText.text = 'Stability: ' + (this.totalStability)/10 + "%";
    }
}