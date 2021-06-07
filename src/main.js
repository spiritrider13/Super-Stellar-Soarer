// ================================== //
//       Developed by: Team AJS       //
// Aria Altenburg, Jason Lee, Sam Vik //
// ================================== //

let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 720,
    height: 950,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 250
            }
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play, Home, FuelCrafting, Upgrade, Credits, Help, Cheats]
}

//Title Text
let titleTextConfig = {
    fontFamily: 'Courier',
    fontSize: '36px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

//subtitle Text
let subtitleTextConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

//Normal Text
let normalTextConfig = {
    fontFamily: 'Courier',
    fontSize: '16px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

//Button Text
let buttonTextConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    backgroundColor: '#00000000', 
    color: '#FFFFFF',   
    align: 'center',
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

let cursors;

//Global gameplay variables ---------------------------------------

//Cheats
let freeUpgrades = false;
let freeUpgradesStatus = "OFF";
let unlimitedFuel = false;
let unlimitedFuelStatus = "OFF";
let unlockAllFuel = false;
let freeFuelStatus = "OFF";

//Fuel Related
let currentSelection = 1;
let fuelComp1 = null;
let fuelComp2 = null;
let fuelComp3 = null;

//Rocket Upgrades
let currentBoosterTier = 0;
let upgradeBoostersCost = 5;
let boosterTier1 = false;
let boosterTier2 = false;
let boosterTier3 = false;
let boosterNose = false;
let wings = false;
let powerBuff = 0;
let stabilityBuff = 0;
let turningBuff = 0;

//Fuel upgrades
let fuelLevel = 1;

//Upgrade Points
let points = 0;

//distance high score
let highScore = 0;