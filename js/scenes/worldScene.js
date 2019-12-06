import Phaser from 'phaser';
import { detectDoor } from '../actions/doorDetection';
import Player from '../player';

function detectGrass(_, tile) {
  this.player.isOnGrass(tile.properties.grass);
}

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene');
  }

  init(data) {
    this.xTile = data.xTile;
    this.yTile = data.yTile;
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/world-tileset.png', 16, 16);
    this.load.tilemapTiledJSON('map', './assets/tilemaps/map.json');
    this.load.spritesheet('player', './assets/spritesheets/player.png', {
      frameWidth: 16,
      frameHeight: 32,
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

    const x = this.xTile ? this.xTile * 16.5 : spawnPoint.x;
    const y = this.yTile ? this.yTile * 16 : spawnPoint.y;

    this.player = new Player(scene, x, y);

    this.ground.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.ground);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.ground.setTileLocationCallback(9, 14, 43, 32, detectGrass, scene);

    this.ground.setTileLocationCallback(
      27,
      21,
      1,
      1,
      detectDoor(scene, 'TreeScene'),
      scene
    );

    this.ground.setTileLocationCallback(
      35,
      21,
      1,
      1,
      detectDoor(scene, 'HomeScene'),
      scene
    );

    // this.input.keyboard.on('keydown-SPACE', testFunction, scene);
  }

  update(time, delta) {
    this.player.update();
  }
}

// function testFunction(k, scene) {
//   console.log(k, scene);
// }
