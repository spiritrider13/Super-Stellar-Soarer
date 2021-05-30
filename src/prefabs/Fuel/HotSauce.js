// 
class HotSauce extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 300;
        super.duration = 10;
        super.stability = 250;
    }
}