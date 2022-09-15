import Phaser from 'phaser';

class PseudoKraken extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, id) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.id = id;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setDragX(1000);
        this.setDepth(1);
    }
}