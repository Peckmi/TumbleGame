import { Scene } from 'phaser';
import { GLOBALS } from '../main';

let platforms;
let fencePlatform;
let ground;
let fenceGround;
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
let cactus;
let deadBush;
let fence;

let playerHealth;

var collisionBad;
var collisionGood;
var collsionFence;

var score;


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
                        newScale = 6;
                        playerHealth.health5.setAlpha(1);
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 4:
                        newScale = 5;
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health4.setAlpha(1);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 3:
                        newScale = 4;
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health3.setAlpha(1);
                        playerHealth.health2.setAlpha(0);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 2:
                        newScale = 3;
                        playerHealth.health4.setAlpha(0);
                        playerHealth.health5.setAlpha(0);
                        playerHealth.health3.setAlpha(0);
                        playerHealth.health2.setAlpha(1);
                        playerHealth.health1.setAlpha(0);
                        player.setY(player.y - (player.width * newScale / 2));
                        player.setScale(newScale).refreshBody();
                        break;
                    case 1:
                        newScale = 2;
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

        this.physics.world.gravity.y = 1500;

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

        // obstacles
        cactus = this.physics.add.group();
        this.generateCactus();

        deadBush = this.physics.add.group();
        this.generateBush();

        fence = this.physics.add.group();
        this.generateFence();

        //----------------------------------------

        player = this.physics.add.sprite(200, 580, 'tumbleweed').setScale(4).refreshBody();

        shadow = this.add.image(200, 650, 'shadow').setAlpha(0.1).setDepth(-1).setScale(0.3);

        platforms = this.physics.add.staticGroup();
        fencePlatform = this.physics.add.staticGroup();

        // this is the invisible floor that the tumbleweed falls on
        ground = platforms.create(GLOBALS.VIEWPORT_WIDTH / 2, 650, 'empty').setScale(GLOBALS.VIEWPORT_WIDTH, 1).refreshBody().setAlpha(0);

        fenceGround = fencePlatform.create(GLOBALS.VIEWPORT_WIDTH / 2, GLOBALS.VIEWPORT_HEIGHT, 'empty').setScale(GLOBALS.VIEWPORT_WIDTH, 1).refreshBody().setAlpha(0);

        this.physics.add.collider(player, platforms);

        this.physics.add.collider(cactus, platforms);
        this.physics.add.collider(deadBush, platforms);
        this.physics.add.collider(fence, fencePlatform);

        //----------------------------------------

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score:0', { fontSize: '32px', fill: '#fff' });
        this.time.addEvent({ delay: 100, callback: this.updateScore, callbackScope: this, loop: true });
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

        //if you change the background speed, double it or half it so the looping lines up well
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

        shadow.setScale(0.3 + (DISTANCE_FROM_GROUND / 2800));
        shadow.setAlpha(0.1 - (DISTANCE_FROM_GROUND / 4000));
        playerHealth.alignAll();

        //check for collisions
        collisionBad = this.physics.overlap(player, cactus, this.collisionHandler, null, this);
        collisionGood = this.physics.overlap(player, deadBush, this.collisionHandler, null, this);

        collsionFence = this.physics.overlap(player, fence, this.collisionHandler, null, this);
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
                player.body.setVelocityY(-850);
            }
        });
    }

    generateCactus() {
        var cacti = cactus.create(GLOBALS.VIEWPORT_WIDTH + 50, 580, 'cactus').setScale(3); //i'm setting this scale to 5 cause it's hard to see

        cacti.setVelocityX(-670);

        this.time.delayedCall(Phaser.Math.Between(1000, 3000), this.generateCactus, [], this);
    }

    generateBush() {
        var bushes = deadBush.create(GLOBALS.VIEWPORT_WIDTH + 50, 610, 'deadBush').setScale(5); //i'm setting this scale to 5 cause it's hard to see

        bushes.setVelocityX(-670);

        this.time.delayedCall(Phaser.Math.Between(3000, 8000), this.generateBush, [], this);
    }

    generateFence() {
        var fences = fence.create(GLOBALS.VIEWPORT_WIDTH + 100, 620, 'fence').setScale(3.5);
        fences.setVelocityX(-670);

        this.time.delayedCall(Phaser.Math.Between(4000, 9000), this.generateFence, [], this);
    }

    collisionHandler() {
        if (collisionBad) {
            playerHealth.hurt();
        }
        if (collisionGood) {
            playerHealth.heal();
        }

        if (collsionFence) {
            //player.setPosition(fence.x, 580);
            playerHealth.hurt();
        }
    }

    updateScore() {
        this.score++;
        this.scoreText.setText('Score: ' + this.score);
    }
}
