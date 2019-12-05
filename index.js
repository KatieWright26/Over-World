import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';
import TreeScene from './js/scenes/treeScene';
import HomeScene from './js/scenes/homeScene';

const config = {
  type: Phaser.AUTO,
  width: 300,
  height: 200,
  zoom: 3,
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
