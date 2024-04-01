class PlayerMovement extends Phaser.Scene {
    constructor() {
        super('playerMovement');
    }


    create() {
        var background = this.add.image(500, 350, 'background');
        background.setScale(1.3);

        var player = this.physics.add.sprite(config.width / 2, config.height - 150, 'player');
        player.displayWidth = 300;
        player.scaleY = player.scaleX;

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.playerMovement();
    }

    playerMovement() {
        this.player.setVelocity(0);
        if (this.cursorKeys.left.isDown) {
            this.player.setX += 100;
        } else if (this.cursorKeys.right.isDown) {
            console.log("right is down");
        }
    }

}