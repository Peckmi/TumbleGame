import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('5-heart', '5-heart.png');
        this.load.image('4-heart', '4-heart.png');
        this.load.image('3-heart', '3-heart.png');
        this.load.image('2-heart', '2-heart.png');
        this.load.image('1-heart', '1-heart.png');

        this.load.image('shadow', 'shadow.png');
        this.load.image('tumbleweed', 'tumbleWeed.png');
        this.load.image('fence', 'fence.png');
        this.load.image('deadBush', 'deadBush.png');
        this.load.image('cactus', 'cactus.png');
        this.load.image('sandTile', 'sand-32.png');
        this.load.image('sandTileTop', 'sandTop-32-2.png');
        this.load.image('dunesTile', 'dunes-full.png');
        this.load.image('dunesTileTop', 'dunes-top.png');
        this.load.image('dunesTileMid', 'dunes-mid.png');
        this.load.image('dunesTileBottom', 'dunes-bottom.png');
        this.load.image('clouds1', 'clouds-1.png');
        this.load.image('clouds2', 'clouds-2.png');
        this.load.image('clouds3', 'clouds-3.png');
        this.load.image('clouds4', 'clouds-4.png');

        this.load.image('empty', 'empty.png');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
