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
    scene: [ Menu, Play, Home, FuelCrafting, UpgradeLab, UpgradeShip, Credits, Help ]
}

//Title Text
let titleTextConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

let normalTextConfig = {
    fontFamily: 'Courier',
    fontSize: '16px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;