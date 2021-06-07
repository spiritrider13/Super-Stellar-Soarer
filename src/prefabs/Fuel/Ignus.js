// Ignus - Firelike substance - low in duration but powerful
class Ignus extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 270;
        super.duration = 120;
        super.stability = 260;
    }
}