import Phaser from 'phaser';
import { detectDoor } from '../actions/doorDetection';
import Player from '../player';
import Inventory from '../inventory';
import { checkForDescriptiveTiles } from '../actions/tileDetection';
import { waterTap } from '../animations/water';

function detectGrass(_, tile) {
  this.player.isOnGrass(tile.properties.grass);
}

let map;
const TILE_SQUARE = 16;
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
    this.load.spritesheet('water', './assets/spritesheets/watertank.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      'water-cliff-angle',
      './assets/spritesheets/cliff.png',
      {
        frameWidth: 32,
        frameHeight: 16,
      }
    );
    this.load.spritesheet('river-tide', './assets/spritesheets/tide.png', {
      frameWidth: 256,
      frameHeight: 400,
    });
  }

  create() {
    const scene = this;
    map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('world-tileset', 'tiles');
    map.createStaticLayer('below player', tileset);
    this.ground = map.createStaticLayer('world', tileset);
    waterTap(this.anims);
    this.add.sprite(339, 616, 'river-tide').play('tide');

    map.createStaticLayer('buildings', tileset);
    const abovePlayer = map.createStaticLayer('above player', tileset);

    abovePlayer.setDepth(10);

    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    const x = this.xTile ? this.xTile * 16.5 : spawnPoint.x;
    const y = this.yTile ? this.yTile * TILE_SQUARE : spawnPoint.y;

    this.player = new Player(scene, x, y);
    this.inventory = new Inventory(scene);
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

    this.input.keyboard.on(
      'keydown-SPACE',
      checkForDescriptiveTiles(
        this.ground,
        this.player.sprite,
        TILE_SQUARE,
        map,
        scene
      ),
      scene
    );

    this.add.sprite(352, 437, 'water').play('pour');
  }

  update(time, delta) {
    this.player.update();
    this.inventory.update();
  }
}
