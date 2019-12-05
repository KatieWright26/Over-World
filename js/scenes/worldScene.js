import Phaser from 'phaser';
// import { waveAnimation } from '../actions/waveAnimation';
import { detectDoor } from '../actions/doorDetection';
import Player from '../player';

// let isOnGrass = false;

// function detectGrass(_, tile) {
//   isOnGrass = tile.properties.grass;
// }

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene');
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/world-tileset.png', 16, 16);
    this.load.tilemapTiledJSON('map', './assets/tilemaps/map.json');
    this.load.spritesheet('player', './assets/spritesheets/player.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet('worm', './assets/spritesheets/testsprite.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    const scene = this;
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('world-tileset', 'tiles');
    map.createStaticLayer('below player', tileset);
    this.ground = map.createStaticLayer('world', tileset);
    map.createStaticLayer('buildings', tileset);

    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );
    this.player = new Player(scene, spawnPoint.x, spawnPoint.y);

    this.ground.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.ground);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // world.setTileLocationCallback(9, 14, 43, 32, detectGrass, scene);

    this.ground.setTileLocationCallback(
      27,
      21,
      1,
      1,
      detectDoor(scene, 'TreeScene'),
      scene
    );
    // waveAnimation(anims);
    // this.add.sprite(300, 300, 'worm').play('wave');
  }

  update(time, delta) {
    this.player.update();
  }
}
