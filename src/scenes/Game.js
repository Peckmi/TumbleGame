import { Scene } from 'phaser';
import { GLOBALS } from '../main';

let platforms;
let ground;
let player;
let isPlayerGrounded;
let shadow;
let background1;
let background2;

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        background1 = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width + 5, this.sys.canvas.height).setDepth(-2);
        background2 = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3/2),
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width + 8, this.sys.canvas.height).setDepth(-2).setFlipX(true);

        player = this.physics.add.sprite(200, 500, 'tumbleweed').setScale(0.3).refreshBody();

        shadow = this.add.image(200, 650, 'shadow').setAlpha(0.1).setDepth(-1).setScale(0.3);
        
        platforms = this.physics.add.staticGroup();

        // this is the invisible floor that the tumbleweed falls on
        ground = platforms.create(GLOBALS.VIEWPORT_WIDTH / 2, 650, 'empty').setScale(GLOBALS.VIEWPORT_WIDTH / 8, 1).refreshBody().setAlpha(0);

        this.physics.add.collider(player, platforms);
    }

    update() {
        const DISTANCE_FROM_GROUND = (Math.abs(ground.body.position.y) - Math.abs(player.body.position.y)) - (player.displayWidth);

        if (DISTANCE_FROM_GROUND === 0) {
            isPlayerGrounded = true;
        } else {
            isPlayerGrounded = false;
        }

        this.playerController();
        this.spin(player, 0.15);
        this.movingBackground(background1);
        this.movingBackground(background2);

        shadow.setScale(0.3 + (DISTANCE_FROM_GROUND / 500))
    }

    spin(object, amount) {
        object.setRotation(object.rotation + amount);
    }

    movingBackground(background) {
        if (background.x > GLOBALS.VIEWPORT_WIDTH / -2) {
            background.setX(background.x - 5);
        } else {
            background.setX(GLOBALS.VIEWPORT_WIDTH * (3/2));
        }
    }

    playerController() {
        this.input.keyboard.once('keydown-SPACE', () => {
            if (isPlayerGrounded) {
                player.body.setVelocityY(-600);
            }
        });
    }
}
