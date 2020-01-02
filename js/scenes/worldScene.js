import Phaser from 'phaser';
import { detectDoor } from '../actions/doorDetection';
import Player from '../player';
import Inventory, { collectItem } from '../inventory';
import { checkForDescriptiveTiles } from '../actions/tileDetection';
import { waterTap } from '../animations/water';
import { showDebug } from '../showDebug';

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
    this.load.image('ball', './assets/spritesheets/ball.png', 16, 16);
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
    // RENDER MAP AND LAYERS
    map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('world-tileset', 'tiles');
    map.createStaticLayer('below player', tileset);
    this.ground = map.createStaticLayer('world', tileset);
    map.createStaticLayer('buildings', tileset);
    const abovePlayer = map.createStaticLayer('above player', tileset);
    abovePlayer.setDepth(10);

    // CREATE INVENTORY
    const scene = this;
    this.inventory = new Inventory(scene);
    const balls = this.physics.add.group({
      key: 'ball',
      repeat: 3,
      setXY: { x: 500, y: 700, stepX: 16 },
    });

    balls.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    balls.enableBody = true;
    this.physics.add.collider(balls, this.ground);
    // START ANIMATIONS
    waterTap(this.anims);
    this.add.sprite(339, 616, 'river-tide').play('tide');
    this.add.sprite(352, 437, 'water').play('pour');

    // CREATE PLAYER
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    const x = this.xTile ? this.xTile * 16.5 : spawnPoint.x;
    const y = this.yTile ? this.yTile * TILE_SQUARE : spawnPoint.y;

    this.player = new Player(scene, x, y);

    // ADD PHYSICS AND COLLIDERS
    this.ground.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.ground);
    this.physics.add.overlap(
      this.player.sprite,
      balls,
      collectItem,
      null,
      scene
    );

    // ADD CAMERA
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // ADD DYNAMIC TILE DETECTION
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

    showDebug(this.ground, scene);
  }

  update(time, delta, scene) {
    this.player.update();
    this.inventory.update();
  }
}
