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

    const { LEFT, RIGHT, UP, DOWN, SPACE, X } = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      action: SPACE,
      cancel: X,
    });

    this.grass = false;
  }

  update() {
    const { keys, sprite, grass } = this;
    const speed = 175;

    playerControls(keys, sprite, speed, grass);
  }

  isOnGrass(arg) {
    this.grass = arg;
  }
}
