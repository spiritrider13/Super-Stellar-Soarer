// 
class Honey extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 100;
        super.duration = 250;
        super.stability = 320;
    }
}