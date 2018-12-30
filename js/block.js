function range(delta){
  return (Math.random() * 2 * delta) - delta;
}

class Block {
  constructor(scene, position, tickOffset, settings) {
    this.scene = scene;
    this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.translateX(position.x);
    this.model.translateY(position.y);
    this.model.translateZ(position.z);
    this.tickOffset = tickOffset;
    this.settings = settings;

    // setup
    this.scene.add(this.model);
  }
  rotate() {
    this.model.rotation.x += 0.01;
    this.model.rotation.y += 0.01;
  }
  paint(tick) {
    this.material.color = Rainbow.getColor(this.tickOffset + tick);
  }
  paintWhite() {
    this.material.color = {r: 1, g: 1, b: 1};
  }
  static original(scene) {
    return new Block(scene, {x: 0, y: 0, z: 0}, 0, {});
  }
  clone() {
    const positionSpread = 3;
    return new Block (
      this.scene,
      {
        x: this.model.position.x + range(positionSpread),
        y: this.model.position.y + range(positionSpread),
        z: this.model.position.z + range(positionSpread),
      },
      this.tickOffset + range(10),
      this.settings
    );
  }
}
