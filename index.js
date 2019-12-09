import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';
import TreeScene from './js/scenes/treeScene';
import HomeScene from './js/scenes/homeScene';

const WIDTH = 400;
const HEIGHT = 250;

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
  pixelArt: true,
  scene: [WorldScene, TreeScene, HomeScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};
const game = new Phaser.Game(config);
