import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';
import TreeScene from './js/scenes/treeScene';
import HomeScene from './js/scenes/homeScene';

const config = {
  type: Phaser.AUTO,
  width: 350,
  height: 250,
  zoom: 2.75,
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