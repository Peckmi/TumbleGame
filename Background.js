class Background extends Phaser.Scene {
    constructor() {
        super("backgroundElements");
    }

    preload() {
        this.load.image("background", "assets/tempBack.png");
        this.load.image("player", "assets/tempWeed.png");
    }

    create() {
        this.scene.start("playerMovement");
    }
}