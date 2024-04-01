var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', './assets/tempBack.png');
}

function create() {
    this.add.image(400, 300, 'background');
}

function update() {

}