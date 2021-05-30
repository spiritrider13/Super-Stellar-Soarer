/*

The FuelCrafting scene is where the player selects three fuel
components to combine for their ship's fuel for the next launch.

*/
class FuelCrafting extends Phaser.Scene {
    constructor() {
        super("fuelCraftingScene");
    }

    preload() {
        this.load.image('ignus', './assets/fuel components/Ignus.png');
        this.load.image('cola', './assets/fuel components/coke.png');
        this.load.image('cookies', './assets/fuel components/cookie.png');
        this.load.image('gasoline', './assets/fuel components/gasoline.png');
        this.load.image('honey', './assets/fuel components/honey.png');
        this.load.image('hotsauce', './assets/fuel components/hotsouce.png');
        this.load.image('hydrogen', './assets/fuel components/hydrogen.png');
        this.load.image('icecream', './assets/fuel components/icecream.png');
        this.load.image('mayonnaise', './assets/fuel components/maayonaise.png');
        this.load.image('mentos', './assets/fuel components/mentos.png');
        this.load.image('Qmark', './assets/Qmark1.png');

    }

    create() {
        //add some text labels
        this.sceneText = this.add.text(game.config.width/2, 20, 'FUEL CRAFTING', titleTextConfig).setOrigin(0.5);

        // BACK BUTTON ***********************************************************************
        const backButton = new Button(this, 150, 1040);
        this.add.existing(backButton);
        this.backButtonText = this.add.text(150, 1000, 'BACK TO HOME', titleTextConfig).setOrigin(0.5);
        backButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('homeScene');
        })

        // CLEAR BUTTON ***********************************************************************
        const clearButton = new Button(this, game.config.width - 150, 1040);
        this.add.existing(clearButton);
        this.backButtonText = this.add.text(game.config.width - 150, 1000, 'CLEAR SELECTION', titleTextConfig).setOrigin(0.5);
        clearButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            fuelComp1 = null;
            fuelComp2 = null;
            fuelComp3 = null;
            currentSelection = 1;
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
        this.fuelComp1Text = this.add.text(game.config.width/3 - 100, 800, 'COMPONENT 1', normalTextConfig).setOrigin(0.5);
        this.fuelComp2Text = this.add.text(game.config.width/2, 800, 'COMPONENT 2', normalTextConfig).setOrigin(0.5);
        this.fuelComp3Text = this.add.text(game.config.width/1.5 + 100, 800, 'COMPONENT 3', normalTextConfig).setOrigin(0.5);

        //display crafting selection
        this.fuelImage1 = this.add.sprite(game.config.width/3 - 100, 860, 'Qmark').setOrigin(0.5);
        this.fuelImage2 = this.add.sprite(game.config.width/2, 860, 'Qmark').setOrigin(0.5);
        this.fuelImage3 = this.add.sprite(game.config.width/1.5 + 100, 860, 'Qmark').setOrigin(0.5);
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


        //when left click is pressed, refresh all images
        this.input.on('pointerdown', function (pointer){
            this.refreshImages();
        }, this);
    }

    update() {
        
        
    }

    refreshImages(){
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
    }
}