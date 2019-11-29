function playerActions(anims) {
  anims.create({
    key: "player-right-walk",
    frames: anims.generateFrameNumbers("player", {
      start: 4,
      end: 7,
      zeroPad: 7
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "player-left-walk",
    frames: anims.generateFrameNumbers("player", {
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "player-up-walk",
    frames: anims.generateFrameNumbers("player", {
      start: 12,
      end: 15,
      zeroPad: 15
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "player-down-walk",
    frames: anims.generateFrameNumbers("player", {
      start: 8,
      end: 11,
      zeroPad: 1
    }),
    frameRate: 10,
    repeat: -1
  });
}

export default playerActions;
