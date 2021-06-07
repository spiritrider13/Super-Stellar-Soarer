// 
class Mentos extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 230;
        super.duration = 100;
        super.stability = 290;
    }
}