function dustMitesAnimation(anims) {
  anims.create({
    key: 'hover',
    frames: anims.generateFrameNumbers('mites', {
      start: 0,
      end: 1,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
  anims.create({
    key: 'hover--small',
    frames: anims.generateFrameNumbers('mites--small', {
      start: 0,
      end: 2,
      zeroPad: 1,
    }),
    frameRate: 3,
    repeat: -1,
  });
}

export { dustMitesAnimation };
