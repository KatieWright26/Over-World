// this is a test automated animation, to be edited at future date

function waveAnimation(anims) {
  anims.create({
    key: "wave",
    frames: anims.generateFrameNumbers("worm", {
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 8,
    repeat: -1
  });
}

export { waveAnimation };