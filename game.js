var gameSettings = {
    playerSpeed: 300
}


var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scene: [Background, PlayerMovement]
}

var game = new Phaser.Game(config);