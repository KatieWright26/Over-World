import Phaser from 'phaser';

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene');
  }

  preload() {
    this.load.image('home-tileset', './assets/tilesets/home-tileset.png');
    this.load.tilemapTiledJSON('home-map', './assets/tilemaps/home.json');
  }

  create() {}

  upload() {}
}
