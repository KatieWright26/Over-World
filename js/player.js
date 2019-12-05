import Phaser from 'phaser';
import { playerControls } from './controls/playerControls';
import { playerActions } from './actions/playerActions';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    playerActions(this.scene.anims);

    this.sprite = scene.physics.add
      .sprite(x, y, 'player', 0)
      .setDrag(1000, 0)
      .setMaxVelocity(300, 400);

    const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
    });
  }

  update() {
    const { keys, sprite } = this;
    const speed = 175;

    playerControls(keys, sprite, speed);
  }
}
