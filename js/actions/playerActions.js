function playerActions(anims) {
  // Direction actions
  anims.create({
    key: 'player-x-walk',
    frames: anims.generateFrameNumbers('player', {
      start: 0,
      end: 3,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-down-walk',
    frames: anims.generateFrameNumbers('player', {
      start: 4,
      end: 7,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-up-walk',
    frames: anims.generateFrameNumbers('player', {
      start: 8,
      end: 11,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // --------------------------
  // Direction actions in grass
  // --------------------------
  anims.create({
    key: 'player-x-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 12,
      end: 15,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-down-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 16,
      end: 19,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-up-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 20,
      end: 23,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // --------------------------
  // Idle - up - player actions
  // --------------------------

  anims.create({
    key: 'idle-up-player',
    frames: anims.generateFrameNumbers('player', {
      start: 8,
      end: 8,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
  anims.create({
    key: 'idle-up-player-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 20,
      end: 20,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });

  // --------------------------
  // Idle - down - player actions
  // --------------------------

  anims.create({
    key: 'idle-down-player',
    frames: anims.generateFrameNumbers('player', {
      start: 24,
      end: 31,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
  anims.create({
    key: 'idle-down-player-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 32,
      end: 39,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });

  // --------------------------
  // Idle - x- player actions
  // --------------------------

  anims.create({
    key: 'idle-x-player',
    frames: anims.generateFrameNumbers('player', {
      start: 0,
      end: 0,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
  anims.create({
    key: 'idle-x-player-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 12,
      end: 12,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
}

export { playerActions };
