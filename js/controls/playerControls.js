const playerControls = (cursors, player, controls, speed, delta, isOnGrass) => {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  player.body.velocity.normalize().scale(speed);

  if(isOnGrass) {
    if (cursors.right.isDown) {
      player.anims.play("player-right-walk-grass", true);
    } else if (cursors.left.isDown) {
      player.anims.play("player-left-walk-grass", true);
    } else if (cursors.up.isDown) {
      player.anims.play("player-up-walk-grass", true);
    } else if (cursors.down.isDown) {
      player.anims.play("player-down-walk-grass", true);
    } else if (cursors.space.isDown) {
      console.log("active");
    } else {
      player.anims.stop();
    }
  } else {
    if (cursors.right.isDown) {
      player.anims.play("player-right-walk", true);
    } else if (cursors.left.isDown) {
      player.anims.play("player-left-walk", true);
    } else if (cursors.up.isDown) {
      player.anims.play("player-up-walk", true);
    } else if (cursors.down.isDown) {
      player.anims.play("player-down-walk", true);
    } else if (cursors.space.isDown) {
      console.log('active')
    } else {
      player.anims.stop();
    }
  }
  controls.update(delta);
};

export { playerControls };
