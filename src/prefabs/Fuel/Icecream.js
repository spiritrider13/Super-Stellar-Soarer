// 
class Icecream extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 50;
        super.duration = 200;
        super.stability = 250;
    }
}