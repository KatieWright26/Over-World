import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  zoom: 1.5,
  parent: "game-container",
  pixelArt: true,
  scene: [WorldScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);