import Phaser from 'phaser';

const MAX_ITEM_STORAGE = 10;
let showInventory;

export default class Inventory {
  constructor(scene) {
    this.scene = scene;
    this.inventoryIsVisible = false;
    this.inventory = new Array(MAX_ITEM_STORAGE);

    const { I, ESC } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      inventory: I,
      escape: ESC,
    });
  }

  update() {
    const { scene, keys, inventoryIsVisible } = this;
    if (keys.inventory.isDown && !inventoryIsVisible) {
      this.openInventory();
    } else if (keys.escape.isDown && inventoryIsVisible) {
      this.closeInventory();
    }
  }

  findNextAvailableSpot() {}

  openInventory() {
    showInventory = this.scene.add
      .text(0, 0, 'this is the inventory', {
        font: '16px monospace',
        fill: '#ffffff',
        align: 'center',
        backgroundColor: 'black',
        padding: { x: 10, y: 5 },
      })
      .setScrollFactor(0);
    this.inventoryIsVisible = true;
  }

  closeInventory() {
    this.inventoryIsVisible = false;
    showInventory.destroy();
  }
}

export const collectItem = (player, ball) => {
  ball.disableBody(true, true);
};
