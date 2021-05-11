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

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                console.log('over button');
                this.upImage.setVisible(false);
                this.downImage.setVisible(false);
                this.overImage.setVisible(true);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                console.log('out button');
                this.upImage.setVisible(true);
                this.downImage.setVisible(false);
                this.overImage.setVisible(false);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log('down button');
                this.upImage.setVisible(false);
                this.downImage.setVisible(true);
                this.overImage.setVisible(false);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                console.log('up button');
                this.upImage.setVisible(false);
                this.downImage.setVisible(false);
                this.overImage.setVisible(true);
            })
    }
}