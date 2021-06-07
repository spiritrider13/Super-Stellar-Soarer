// 
class HotSauce extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 400;
        super.duration = 20;
        super.stability = 200;
    }
}