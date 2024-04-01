class PlayerMovement extends Phaser.Scene {
    constructor() {
        super("playerMovement");
    }

    preload() {
        this.load.image('tumble', './assets/tempWeed.png');
    }

    create() {
        tumble = this.add.image(500, 500, 'tumble');
        tumble.setScale(0.5);
    }

    update() {

    }

}