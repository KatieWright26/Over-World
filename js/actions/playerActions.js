function playerActions(anims) {
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
    key: 'player-x-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 16,
      end: 19,
      zeroPad: 19,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-up-walk',
    frames: anims.generateFrameNumbers('player', {
      start: 12,
      end: 15,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-up-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 28,
      end: 31,
      zeroPad: 31,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-down-walk',
    frames: anims.generateFrameNumbers('player', {
      start: 8,
      end: 11,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'player-down-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 24,
      end: 27,
      zeroPad: 27,
    }),
    frameRate: 10,
    repeat: -1,
  });
}

export { playerActions };
