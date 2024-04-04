import { Scene } from 'phaser';
import { GLOBALS } from '../main';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height).setAlpha(0.5);

        this.add.text(512, 460, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ff0000',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 520, 'Press space to try again', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Game');
        });
    }
}
