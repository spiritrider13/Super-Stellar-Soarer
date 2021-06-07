class Cookies extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 10;
        super.duration = 500;
        super.stability = 333;
    }
}