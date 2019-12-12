function waterTap(anims) {
  anims.create({
    key: 'pour',
    frames: anims.generateFrameNumbers('water', {
      start: 0,
      end: 3,
      zeroPad: 1,
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'cliff',
    frames: anims.generateFrameNumbers('water-cliff-angle', {
      start: 0,
      end: 1,
      zeroPad: 1,
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'tide',
    frames: anims.generateFrameNumbers('river-tide', {
      start: 0,
      end: 1,
      zeroPad: 1,
    }),
    frameRate: 1,
    repeat: -1,
  });
}

export { waterTap };
