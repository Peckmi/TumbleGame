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
    scene: [Background, PlayerMovement]
}

var game = new Phaser.Game(config);
