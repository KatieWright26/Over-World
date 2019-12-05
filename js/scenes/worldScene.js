import Phaser from 'phaser';
import playerActions from '../actions/playerActions';
import { playerControls } from '../controls/playerControls';
import { waveAnimation } from '../actions/waveAnimation';
import { detectDoor } from '../actions/doorDetection';

let player;
let cursors;
let controls;
let isOnGrass = false;

function detectGrass(_, tile) {
  isOnGrass = tile.properties.grass;
}

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
    const { anims } = this;
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('world-tileset', 'tiles');
    map.createStaticLayer('below player', tileset);
    const world = map.createStaticLayer('world', tileset);
    map.createStaticLayer('buildings', tileset);
    // const aboveLayer = map.createStaticLayer("above player", tileset);
    world.setCollisionByProperty({ collides: true });

    // aboveLayer.setDepth(10);

    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');

    this.physics.add.collider(player, world);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // world.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    world.setTileLocationCallback(9, 14, 43, 32, detectGrass, scene);

    world.setTileLocationCallback(
      27,
      21,
      1,
      1,
      detectDoor(scene, 'TreeScene'),
      scene
    );

    playerActions(anims);
    waveAnimation(anims);
    this.add.sprite(300, 300, 'worm').play('wave');
  }

  update(time, delta) {
    const speed = 175;
    player.body.setVelocity(0);
    playerControls(cursors, player, controls, speed, delta, isOnGrass);
  }
}
