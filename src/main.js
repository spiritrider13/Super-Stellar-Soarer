let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 720,
    height: 1080,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play, Home, FuelCrafting, UpgradeLab, UpgradeShip ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;