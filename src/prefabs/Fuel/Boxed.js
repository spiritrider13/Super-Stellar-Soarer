class Boxed extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 150;
        super.duration = 320;
        super.stability = 269;
    }
}