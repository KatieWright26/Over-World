function closeTextbox() {
  textBox.destroy();
}
let textBox;

const checkForDescriptiveTiles = (
  layer,
  player,
  tileWidth,
  map,
  scene
) => () => {
  const currentFrame = player.anims.currentAnim.key || 'player-down-walk';
  let playerX = Math.floor(player.x / tileWidth);
  let playerY = Math.floor(player.y / tileWidth);
  console.log(playerX, playerY, player, currentFrame);

  if (currentFrame === 'player-up-walk-grass') {
    playerY = Math.floor((player.y - tileWidth) / tileWidth);
  } else if (currentFrame === 'player-down-walk-grass') {
    playerY = Math.floor((player.y + tileWidth) / tileWidth);
  } else if (player.flipX) {
    playerX = Math.floor((player.x + tileWidth) / tileWidth);
  } else {
    playerX = Math.floor((player.x - tileWidth) / tileWidth);
  }
  console.log(playerX, playerY);

  const tile = map.getTileAt(playerX, playerY, false, layer);
  if (tile.properties.description) {
    scene.input.keyboard.on('keydown-X', closeTextbox, scene);

    textBox = scene.add
      .text(0, 0, tile.properties.description, {
        font: '16px monospace',
        fill: '#ffffff',
        align: 'center',
        backgroundColor: 'black',
        padding: { x: 10, y: 5 },
      })
      .setScrollFactor(0);
  }
};

export { checkForDescriptiveTiles };
