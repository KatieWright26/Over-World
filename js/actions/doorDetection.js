const detectDoor = (oldScene, newScene, x, y) => () =>
  oldScene.scene.start(newScene, { xTile: x, yTile: y });

export { detectDoor };
