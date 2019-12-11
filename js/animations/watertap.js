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
}

export { waterTap };
