import Phaser from 'phaser';
import PseudoKraken from '../entities/PseudoKraken';
import vars from '../vars';
import { EventManager as events } from '../managers/EventManager';

class DemoScene extends Phaser.Scene {
    constructor() {
        super('DemoScene');
        // @todo Take krakenIDs and selected kraken ID in from props(?)
        // this.krakenIDs = [1, 20, 25, 35, 45, 100, 1000];
        this.krakenIDs = vars.krakenIDs;
        // console.log(this.game.globals);
        // Set this.chosenKrakenID equal to a random ID from this.krakenIDs
        this.chosenKrakenID = this.krakenIDs[Math.floor(Math.random() * this.krakenIDs.length)];
    }

    preload() {
        this.krakenIDs.forEach((id) => {
            // this.load.image(`kraken-${id}-sheet`, `krakenData/images/${id}/sheet.png`);
            this.load.spritesheet(`kraken-${id}-sheet`, `krakenData/images/${id}/sheet.png`, {
                frameWidth: 64,
                frameHeight: 64,
            });
        });
        // Load sprite assets
    }

    updateKrakenData() {
        const oldKrakenIDs = this.krakenIDs;
        this.krakenIDs = vars.krakenIDs;

        // Get any new kraken IDs, and then load their assets and generate their animations.
        const newKrakenIDs = this.krakenIDs.filter((id) => {
            return !oldKrakenIDs.includes(id);
        });
        console.log('newKrakenIDs', newKrakenIDs);

        const newKrakenText = this.add.text(this.sys.canvas.width - 10, 140, `New Kraken IDs: ${newKrakenIDs.join(', ')}`, {
            fontFamily: 'Roboto',
            fontSize: '32px',
            color: '#000000',
            align: 'right',
            }).setOrigin(1, 0);

        newKrakenIDs.forEach((id) => {
            this.load.spritesheet(`kraken-${id}-sheet`, `krakenData/images/${id}/sheet.png`, {
                frameWidth: 64,
                frameHeight: 64,
            });
        });
        this.load.once('complete', () => {
            newKrakenIDs.forEach((id) => {
                this.anims.create({
                    key: `kraken-${id}-loop`,
                    frames: this.anims.generateFrameNumbers(`kraken-${id}-sheet`),
                    frameRate: 10,
                    repeat: -1,
                });
            });
            if(this.chosenKrakenID != vars.chosenKrakenID) {
                this.chosenKrakenID = vars.chosenKrakenID;
                // Update chosen kraken
                this.selectKraken(this.chosenKrakenID);
            }
        });
        this.load.start();
    }

    selectKraken(id) {
        this.chosenKrakenID = id;
        this.krakky.setTexture(`kraken-${id}-sheet`);
        this.krakky.play(`kraken-${id}-loop`);
        this.selKrakenText.setText(`Kraken ID: ${id}`);
    }

    create() {
        // Generate anims for player's krakens.
        this.krakenIDs.forEach((id) => {
            this.anims.create({
                key: `kraken-${id}-loop`,
                frames: this.anims.generateFrameNumbers(`kraken-${id}-sheet`),
                frameRate: 10,
                repeat: -1,
            });
        });

        // Render current krakens
        this.add.rectangle(0, 0, this.sys.canvas.width, this.sys.canvas.height, 0xaaaa00).setOrigin(0, 0);
        this.krakky = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, `kraken-${this.chosenKrakenID}-sheet`);
        this.krakky.play(`kraken-${this.chosenKrakenID}-loop`).setScale(3);
        this.selKrakenText = this.add.text(10, 140, `Kraken ID: ${this.chosenKrakenID}`, { 
            fontFamily: 'Roboto',
            fontSize: '32px',
            fill: '#000000' 
        });

        const addKraken = (x, y, id) => {
            this.add.rectangle(x, y, 128, 128, 0x000000, 0.3).setOrigin(0, 0);
            const kraken = this.add.sprite(x, y, `kraken-${id}-sheet`).setOrigin(0, 0).setInteractive();
            kraken.play(`kraken-${id}-loop`).setScale(2);
            kraken.on('pointerdown', () => {
                this.selectKraken(id);
            });
        }

        this.krakenIDs.forEach((id, i) => {
            addKraken(10 + (i * 128 + 4), 10, id);
        });

        // Camera
        this.cameras.main.fadeIn(4000, 0, 0, 0);

        // Register events
        events.on('updateKrakenIDs', this.updateKrakenData, this);
    }

    update(d, t) {

    }
}

export default DemoScene