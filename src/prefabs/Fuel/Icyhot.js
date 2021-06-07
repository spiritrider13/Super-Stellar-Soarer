// 
class Icyhot extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 200;
        super.duration = 200;
        super.stability = 300;
    }
}