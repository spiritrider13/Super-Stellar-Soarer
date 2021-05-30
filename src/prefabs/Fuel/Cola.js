// Ignus - Firelike substance - low in duration but powerful
class Cola extends FuelComponent {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);
        scene.add.existing(this);

        super.power = 220;
        super.duration = 70;
        super.stability = 250;
    }
}