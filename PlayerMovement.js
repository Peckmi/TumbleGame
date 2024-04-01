class PlayerMovement extends Phaser.Scene {
    constructor() {
        super("playerMovement");
    }


    create() {
        var background = this.add.image(500, 350, "background");
        background.setScale(1.3);

        this.player = this.physics.add.sprite(config.width / 2, config.height - 150, "player");
        this.player.displayWidth = 300;
        this.player.scaleY = this.player.scaleX;
        this.player.setCollideWorldBounds(true);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.playerMovement();
    }

    playerMovement() {
        this.player.setVelocity(0);

        if (Phaser.Input.Keyboard.JustDown(this.left)) {
            if (this.player.x == config.width / 2) {
                this.player.setX(200);
            }
            if (this.player.x == 800) {
                this.player.setX(config.width / 2);
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.right)) {
            if (this.player.x == config.width / 2) {
                this.player.setX(800);
            }
            if (this.player.x == 200) {
                this.player.setX(config.width / 2);
            }
        }
    }

}