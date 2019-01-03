function range(delta){
  return (Math.random() * 2 * delta) - delta;
}

const loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/' );
const textureCube = loader.load(
  [0,1,2,3,4,5].map(i => 'pabloCube.png')
);

class Block {
  constructor(scene, position, tickOffset, settings) {
    this.scene = scene;
    const cubeSide = 1;
    const geometry = new THREE.BoxBufferGeometry(cubeSide, cubeSide, cubeSide);

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: textureCube,
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
    this.scene.add(this.mesh);
  }
  rotate() {
    this.mesh.rotation.x += 0.004;
    this.mesh.rotation.y += 0.004;
    this.mesh.rotation.z += 0.004;
  }
  paint(tick) {
    this.material.color = Rainbow.getColor(this.tickOffset + tick, this.settings);
  }
  paintWhite() {
    this.material.color = {r: 1, g: 1, b: 1};
  }
  static original(scene) {
    return new Block(
      scene,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      0,
      {
        colorFreq: 0,
        phaseDelta: 0,
        colorRange: 1,
        colorFloor: 1,
      }
    );
  }
  static spawnAt(scene, coord, tickOffset) {
    return new Block(
      scene,
      {
        x: coord.x,
        y: coord.y,
        z: 0,
      },
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
      this.scene,
      {
        x: this.mesh.position.x + range(positionSpread),
        y: this.mesh.position.y + range(positionSpread),
        z: this.mesh.position.z + range(positionSpread / 10),
      },
      this.tickOffset,
      // this.tickOffset + range(10),
      mutate(this.settings)
    );
  }
}
