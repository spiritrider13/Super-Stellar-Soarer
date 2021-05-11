// Ignus - Firelike substance - low in duration but powerful
class Ignus extends FuelComponent {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        super.power = 400;
        super.duration = 100;
        super.stability = 250;
    }
}