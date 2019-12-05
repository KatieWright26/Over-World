import Phaser from 'phaser';
import Player from '../player';
import { detectDoor } from '../actions/doorDetection';

function detectGrass(_, tile) {
  this.player.isOnGrass(tile.properties.grass);
}

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene');
  }

  preload() {
    this.load.image(
      'home-tileset',
      './assets/tilesets/home-tileset.png',
      16,
      16
    );
    this.load.tilemapTiledJSON('home-map', './assets/tilemaps/home.json');
  }

  create() {
    const scene = this;
    const homeMap = this.make.tilemap({ key: 'home-map' });
    const tileset = homeMap.addTilesetImage('home-tileset', 'home-tileset');
    const belowPlayer = homeMap.createStaticLayer('below player', tileset);

    this.homeWorld = homeMap.createStaticLayer('world', tileset);

    const spawnPoint = homeMap.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    this.player = new Player(scene, spawnPoint.x, spawnPoint.y);
    belowPlayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, belowPlayer);
    this.homeWorld.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.homeWorld);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(
      0,
      0,
      homeMap.widthInPixels,
      homeMap.heightInPixels
    );

    this.homeWorld.setTileLocationCallback(0, 0, 14, 14, detectGrass, scene);
    this.homeWorld.setTileLocationCallback(
      7,
      14,
      1,
      1,
      detectDoor(scene, 'WorldScene', 35, 23),
      scene
    );
  }

  update(time, delta) {
    this.player.update();
  }
}
