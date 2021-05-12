// Ignus - Firelike substance - low in duration but powerful
class Ignus extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 400;
        super.duration = 100;
        super.stability = 250;
    }
}