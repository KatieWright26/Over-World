let direction = 'up';

const playerControls = (keys, player, speed, onGrass) => {
  if (keys.left.isDown) {
    player.body.setVelocityX(-speed);
    player.setFlipX(false);
  } else if (keys.right.isDown) {
    player.body.setVelocityX(speed);
    player.setFlipX(true);
  } else if (keys.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (keys.down.isDown) {
    player.body.setVelocityY(speed);
  } else {
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
  }

  // Prevent player speeding up when walking on diagonal.
  player.body.velocity.normalize().scale(speed);

  if (onGrass) {
    if (player.body.velocity.x !== 0) {
      direction = 'x';
      player.anims.play('player-x-walk-grass', true);
    } else if (keys.up.isDown) {
      direction = 'up';
      player.anims.play('player-up-walk-grass', true);
    } else if (keys.down.isDown) {
      direction = 'down';
      player.anims.play('player-down-walk-grass', true);
    } else {
      player.anims.play(`idle-${direction}-player-grass`, true);
    }
  } else if (player.body.velocity.x !== 0) {
    direction = 'x';
    player.anims.play('player-x-walk', true);
  } else if (keys.up.isDown) {
    direction = 'up';
    player.anims.play('player-up-walk', true);
  } else if (keys.down.isDown) {
    direction = 'down';
    player.anims.play('player-down-walk', true);
  } else {
    player.anims.play(`idle-${direction}-player`, true);
  }
};

export { playerControls };
