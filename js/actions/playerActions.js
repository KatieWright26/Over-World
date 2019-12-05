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
      start: 12,
      end: 15,
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
    key: 'player-down-walk-grass',
    frames: anims.generateFrameNumbers('player', {
      start: 16,
      end: 19,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
}

export { playerActions };
