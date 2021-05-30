// 
class Hydrogen extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 250;
        super.duration = 50;
        super.stability = 250;
    }
}