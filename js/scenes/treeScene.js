import Phaser from 'phaser';
import playerActions from '../actions/playerActions';
import { playerControls } from '../controls/playerControls';
import { detectDoor } from '../actions/doorDetection';

let player;
let controls;
let cursors;
let isOnGrass = false;

function detectGrass(_, tile) {
  isOnGrass = tile.properties.grass;
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
    const { anims } = this;
    const treeMap = this.make.tilemap({ key: 'tree-map' });
    const tileset = treeMap.addTilesetImage('tree-tileset', 'tree-tiles');
    const treeWorld = treeMap.createStaticLayer('below player', tileset);
    treeWorld.setCollisionByProperty({ collides: true });

    const spawnPoint = treeMap.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player');

    this.physics.add.collider(player, treeWorld);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, treeMap.widthInPixels, treeMap.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    treeWorld.setTileLocationCallback(0, 0, 14, 14, detectGrass, scene);
    treeWorld.setTileLocationCallback(
      6,
      14,
      1,
      1,
      detectDoor(scene, 'WorldScene'),
      scene
    );

    playerActions(anims);
  }

  update(time, delta) {
    const speed = 175;
    player.body.setVelocity(0);
    playerControls(cursors, player, controls, speed, delta, isOnGrass);
  }
}
