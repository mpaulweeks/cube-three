function plusOrMinus(delta){
  return (Math.random() * 2 * delta) - delta;
}

class Block {
  constructor(position, rotationOffset, tickOffset, settings) {
    const geometry = new THREE.BoxBufferGeometry(
      CubeSettings.sizeX,
      CubeSettings.sizeY,
      CubeSettings.sizeZ
    );

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: TEXTURE.envMap,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.translateX(position.x);
    this.mesh.translateY(position.y);
    this.mesh.translateZ(position.z);

    // https://stackoverflow.com/a/31541369
    const geo = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
    const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    const wireframe = new THREE.LineSegments( geo, mat );
    // todo option for border
    // this.mesh.add( wireframe );

    this.tickOffset = tickOffset;
    this.settings = settings;

    // setup
    this.mesh.block = this;
    SCENE.add(this.mesh);

    this.rotateTimes(rotationOffset);
  }
  rotate() {
    this.rotateTimes(1);
  }
  rotateTimes(n) {
    this.mesh.rotation.x += 0.004 * n;
    this.mesh.rotation.y += 0.004 * n;
    this.mesh.rotation.z += 0.004 * n;
  }
  paint(tick) {
    this.material.color = Rainbow.getColor(this.tickOffset + tick, this.settings);
  }
  paintWhite() {
    this.material.color = {r: 1, g: 1, b: 1};
  }
  static original() {
    return new Block(
      {
        x: 0,
        y: 0,
        z: 0,
      },
      0,
      0,
      {
        colorFreq: 0,
        phaseDelta: 0,
        colorRange: 1,
        colorFloor: 1,
      }
    );
  }
  static spawnAt(coord, rotationOffset, tickOffset) {
    return new Block(
      {
        x: coord.x,
        y: coord.y,
        z: 0,
      },
      rotationOffset,
      tickOffset,
      {
        colorFreq: 0,
        phaseDelta: 0,
        colorRange: 1,
        colorFloor: 1,
      }
    );
  }
  clone() {
    const positionSpread = 1;
    return new Block (
      {
        x: this.mesh.position.x + plusOrMinus(positionSpread),
        y: this.mesh.position.y + plusOrMinus(positionSpread),
        z: this.mesh.position.z + plusOrMinus(positionSpread / 10),
      },
      0,
      this.tickOffset,
      // this.tickOffset + plusOrMinus(10),
      mutate(this.settings)
    );
  }
}
