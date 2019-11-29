import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';

const config = {
  type: Phaser.AUTO,
  width: 350,
  height: 250,
  zoom: 3,
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