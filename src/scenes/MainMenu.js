import { Scene } from 'phaser';
import { GLOBALS } from '../main';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(
            GLOBALS.VIEWPORT_WIDTH / 2,
            GLOBALS.VIEWPORT_HEIGHT / 2,
            'background'
        ).setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

        this.add.text(512, 460, 'Tumble', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 520, 'Press space to begin', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Game');
        });
    }
}
