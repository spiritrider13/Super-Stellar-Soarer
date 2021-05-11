class Button extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);

        this.upImage = scene.add.image(0,0, 'buttonUp');
        this.overImage = scene.add.image(0,0, 'buttonOver');
        this.downImage = scene.add.image(0,0, 'buttonDown');

        this.add(this.upImage);
        this.add(this.overImage);
        this.add(this.downImage);

        this.overImage.setVisible(false);
        this.downImage.setVisible(false);

        this.setSize(200, 50);

        // the following changes the appearance of the button given current state
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.upImage.setVisible(false);
                this.downImage.setVisible(false);
                this.overImage.setVisible(true);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.upImage.setVisible(true);
                this.downImage.setVisible(false);
                this.overImage.setVisible(false);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.upImage.setVisible(false);
                this.downImage.setVisible(true);
                this.overImage.setVisible(false);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.upImage.setVisible(false);
                this.downImage.setVisible(false);
                this.overImage.setVisible(true);
            })
    }

    /*

        The following is how you would implement on-click or on-down (etc) events for the buttons.

        In the scene class that you want to check if a button is down, do this:

        --mouse up
        this.<button-name>.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                
        })

        --mouse down
        this.<button-name>.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                
        })

        --mouse over
        this.<button-name>.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                
        })

        --mouse out
        this.<button-name>.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                
        })
    */

}