import { Scene } from 'phaser';
import { GLOBALS } from '../main';

let platforms;
let ground;
let player;
let isPlayerGrounded;
let shadow;
let background1;
let background2;
let sandTile1;
let sandTileTop1;
let dunesTile1;
let dunesTile2;
let dunesTile3;
let clouds1a;
let clouds1b;
let clouds2a;
let clouds2b;
let clouds3a;
let clouds3b;
let clouds4a;
let clouds4b;

let playerHealth;

//obstacles
let cactus;
var collide = true;
var collision = 0;

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        playerHealth = {
            health5: this.add.image(200, 600, '5-heart').setAlpha(0).setScale(1.5),
            health4: this.add.image(200, 600, '4-heart').setAlpha(0).setScale(1.5),
            health3: this.add.image(200, 600, '3-heart').setAlpha(1).setScale(1.5),
            health2: this.add.image(200, 600, '2-heart').setAlpha(0).setScale(1.5),
            health1: this.add.image(200, 600, '1-heart').setAlpha(0).setScale(1.5),
            alignAll: () => {
                playerHealth.health5.y = player.body.position.y - 20;
                playerHealth.health4.y = player.body.position.y - 20;
                playerHealth.health3.y = player.body.position.y - 20;
                playerHealth.health2.y = player.body.position.y - 20;
                playerHealth.health1.y = player.body.position.y - 20;
            },
            currentHealth: 3,
            hurt: () => {
                playerHealth.setHealth(playerHealth.currentHealth - 1);
            },
            heal: () => {
                if ((playerHealth.currentHealth + 1) < 6) {
                    playerHealth.setHealth(playerHealth.currentHealth + 1);
                }
            },
            setHealth: (healthNum) => {
                playerHealth.currentHealth = healthNum;
                let newScale;
                switch (healthNum) {
                    case 5:
                        newScale = 0.4;
                        playerHealth.health5.setAlpha(1);
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 4:
                        newScale = 0.35;
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health4.setAlpha(1);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 3:
                        newScale = 0.3;
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health3.setAlpha(1);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 2:
                        newScale = 0.25;
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(1);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 1:
                        newScale = 0.2;
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(1);
                        player.setScale(newScale).refreshBody();
                        break;
                    case 0:
                        this.scene.start('GameOver');
                }
            }
        };
        //background

        background1 = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width + 5, this.sys.canvas.height).setDepth(-2);
        background2 = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3 / 2),
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width + 8, this.sys.canvas.height).setDepth(-2).setFlipX(true);

        //clouds
        var tileScale = 4

        clouds4a = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 1.9,
            'clouds4'
        ).setDepth(-2).setScale(tileScale)
        clouds4b = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3 / 2),
            GLOBALS.VIEWPORT_HEIGHT / 1.9,
            'clouds4'
        ).setDepth(-2).setScale(tileScale)

        clouds3a = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2.4,
            'clouds3'
        ).setDepth(-2).setScale(tileScale)
        clouds3b = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3 / 2),
            GLOBALS.VIEWPORT_HEIGHT / 2.4,
            'clouds3'
        ).setDepth(-2).setScale(tileScale)

        clouds2a = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 3.5,
            'clouds2'
        ).setDepth(-2).setScale(tileScale)
        clouds2b = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3 / 2),
            GLOBALS.VIEWPORT_HEIGHT / 3.5,
            'clouds2'
        ).setDepth(-2).setScale(tileScale)

        clouds1a = this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 8,
            'clouds1'
        ).setDepth(-2).setScale(tileScale)
        clouds1b = this.add.image(
            GLOBALS.VIEWPORT_WIDTH * (3 / 2),
            GLOBALS.VIEWPORT_HEIGHT / 8,
            'clouds1'
        ).setDepth(-2).setScale(tileScale)

        //dunes 
        var tileHeight = 32
        var tileScale = 4
        var tileNum = 1.75
        dunesTile3 = this.add.tileSprite(
            0,
            GLOBALS.VIEWPORT_HEIGHT - (tileHeight * tileScale * tileNum),
            GLOBALS.VIEWPORT_WIDTH,
            tileHeight,
            'dunesTileTop'
        ).setScale(tileScale).setOrigin(.5, 1).setDepth(-2)
        dunesTile2 = this.add.tileSprite(
            0,
            GLOBALS.VIEWPORT_HEIGHT - (tileHeight * tileScale * tileNum),
            GLOBALS.VIEWPORT_WIDTH,
            tileHeight,
            'dunesTileMid'
        ).setScale(tileScale).setOrigin(.5, 1).setDepth(-2)
        dunesTile1 = this.add.tileSprite(
            0,
            GLOBALS.VIEWPORT_HEIGHT - (tileHeight * tileScale * tileNum),
            GLOBALS.VIEWPORT_WIDTH,
            tileHeight,
            'dunesTileBottom'
        ).setScale(tileScale).setOrigin(.5, 1).setDepth(-2)

        //sand floor
        var tileHeight = 32
        var tileScale = 4
        var tileNum = 1.5
        sandTile1 = this.add.tileSprite(
            0,
            GLOBALS.VIEWPORT_HEIGHT,
            GLOBALS.VIEWPORT_WIDTH,
            tileHeight * tileNum,
            'sandTile'
        ).setScale(tileScale).setOrigin(.5, 1).setDepth(-2)

        sandTileTop1 = this.add.tileSprite(
            0,
            GLOBALS.VIEWPORT_HEIGHT - (tileHeight * tileScale * tileNum),
            GLOBALS.VIEWPORT_WIDTH,
            tileHeight,
            'sandTileTop'
        ).setScale(tileScale).setOrigin(.5, 1).setDepth(-2)

        //cactus obstacle
        cactus = this.physics.add.sprite(
            GLOBALS.VIEWPORT_WIDTH, 600, 'cactus1'
        ).setScale(4)


        player = this.physics.add.sprite(200, 500, 'tumbleweed').setScale(4).refreshBody();

        shadow = this.add.image(200, 650, 'shadow').setAlpha(0.1).setDepth(-1).setScale(0.3);

        platforms = this.physics.add.staticGroup();

        // this is the invisible floor that the tumbleweed falls on
        ground = platforms.create(GLOBALS.VIEWPORT_WIDTH / 2, 650, 'empty').setScale(GLOBALS.VIEWPORT_WIDTH / 8, 1).refreshBody().setAlpha(0);

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(cactus, platforms);
    }

    update() {
        const DISTANCE_FROM_GROUND = (Math.abs(ground.body.position.y) - Math.abs(player.body.position.y)) - (player.displayWidth);

        if (DISTANCE_FROM_GROUND === 0) {
            isPlayerGrounded = true;
        } else {
            isPlayerGrounded = false;
        }

        this.playerController();
        this.spin(player, 0.05);

        this.movingBackground(background1, .1); this.movingBackground(background2, .1);
        this.movingBackground(clouds1a, 1); this.movingBackground(clouds1b, 1);
        this.movingBackground(clouds2a, .5); this.movingBackground(clouds2b, .5);
        this.movingBackground(clouds3a, .2); this.movingBackground(clouds3b, .2);
        this.movingBackground(clouds4a, .1); this.movingBackground(clouds4b, .1);
        this.movingBackground(sandTile1, 4);
        this.movingBackground(sandTileTop1, 4);
        this.movingBackground(dunesTile1, 1);
        this.movingBackground(dunesTile2, .5);
        this.movingBackground(dunesTile3, .2);

        this.movingBackground(cactus, 4);

        shadow.setScale(0.3 + (DISTANCE_FROM_GROUND / 2800));
        shadow.setAlpha(0.1 - (DISTANCE_FROM_GROUND / 4000));
        playerHealth.alignAll();
    }

    spin(object, amount) {
        object.setRotation(object.rotation + amount);
    }

    movingBackground(background, speed) {
        if (background.x > GLOBALS.VIEWPORT_WIDTH / -2) {
            background.setX(background.x - speed);
        } else {
            background.setX(GLOBALS.VIEWPORT_WIDTH * (3 / 2));
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
