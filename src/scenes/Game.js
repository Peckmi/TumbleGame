import { Scene } from 'phaser';
import { GLOBALS } from '../main';

let platforms
let ground
let player
let isPlayerGrounded

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

        player = this.physics.add.sprite(200, 500, 'tumbleweed').setScale(0.3).refreshBody();
        
        platforms = this.physics.add.staticGroup();

        // this is the invisible floor that the tumbleweed falls on
        ground = platforms.create(GLOBALS.VIEWPORT_WIDTH / 2, 650, 'empty').setScale(80, 1).refreshBody().setAlpha(0);

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
        this.spin(player);
    }

    spin(object) {
        object.setRotation(player.rotation + 0.15);
    }

    playerController() {
        this.input.keyboard.once('keydown-SPACE', () => {
            if (isPlayerGrounded) {
                player.body.setVelocityY(-600);
            }
        });
    }
}
