// 
class Mayo extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 190;
        super.duration = 100;
        super.stability = 310;
    }
}