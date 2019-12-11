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
  let playerX = Math.round(player.x / tileWidth);
  let playerY = Math.round(player.y / tileWidth);

  if (currentFrame === ('player-up-walk-grass' || 'player-up-walk')) {
    playerY = Math.round((player.y - tileWidth) / tileWidth);
  } else if (
    currentFrame === ('player-down-walk-grass' || 'player-down-walk')
  ) {
    playerY = Math.round((player.y + tileWidth) / tileWidth);
  } else if (player.flipX) {
    playerX = Math.round((player.x + tileWidth) / tileWidth);
  } else {
    playerX = Math.round((player.x - tileWidth) / tileWidth);
  }
  console.log(`x: ${playerX}, y: ${playerY}`);

  const tile = map.getTilesWithin(playerX, playerY, 1, 1, [], layer);
  console.log(tile[0].properties);

  if (tile[0].properties.description) {
    scene.input.keyboard.on('keydown-X', closeTextbox, scene);

    textBox = scene.add
      .text(0, 0, tile[0].properties.description, {
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
