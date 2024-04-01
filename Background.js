class Background extends Phaser.Scene {
    constructor() {
        super("backgroundElements");
    }

    preload() {
        this.load.image('background', './assets/tempBack.png');
    }

    create() {
        var background = this.add.image(500, 350, 'background');
        background.setScale(1.3);
    }

    update() {
    }
}