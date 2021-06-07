// 
class Icecream extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 60;
        super.duration = 300;
        super.stability = 300;
    }
}