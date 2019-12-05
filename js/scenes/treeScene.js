import Phaser from 'phaser';
import { detectDoor } from '../actions/doorDetection';
import Player from '../player';

function detectGrass(_, tile) {
  this.player.isOnGrass(tile.properties.grass);
}

export default class TreeScene extends Phaser.Scene {
  constructor() {
    super('TreeScene');
  }

  preload() {
    this.load.image('tree-tiles', './assets/tilesets/tree-tileset.png');
    this.load.tilemapTiledJSON('tree-map', './assets/tilemaps/tree.json');
  }

  create() {
    const scene = this;
    const treeMap = this.make.tilemap({ key: 'tree-map' });
    const tileset = treeMap.addTilesetImage('tree-tileset', 'tree-tiles');
    this.treeWorld = treeMap.createStaticLayer('below player', tileset);

    const spawnPoint = treeMap.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    this.player = new Player(scene, spawnPoint.x, spawnPoint.y);

    this.treeWorld.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.treeWorld);

    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, treeMap.widthInPixels, treeMap.heightInPixels);

    this.treeWorld.setTileLocationCallback(0, 0, 14, 14, detectGrass, scene);
    this.treeWorld.setTileLocationCallback(
      6,
      14,
      1,
      1,
      detectDoor(scene, 'WorldScene'),
      scene
    );
  }

  update(time, delta) {
    this.player.update();
  }
}
