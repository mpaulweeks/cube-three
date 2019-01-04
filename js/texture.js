
const TEXTURE = (() => {
  class T {
    constructor() {
      this.loadExternalImage();
    }
    updateExisting(){
      document.getElementById('texture-preview').src = this.envMap.image[0].src;

      if (window.scene){
        window.scene.children.forEach(mesh => {
          mesh.material.envMap = this.envMap;
        });
      }
    }
    loadExternalImage(src){
      const loader = new THREE.CubeTextureLoader();
      loader.setPath( 'textures/' );
      this.envMap = loader.load(
        [0,1,2,3,4,5].map(i => 'pabloCube.png'),
        () => this.updateExisting()
      );
    }
    loadUploadedImage(blob){
      const loader = new THREE.CubeTextureLoader();
      this.envMap = loader.load(
        [0,1,2,3,4,5].map(i => blob),
        () => this.updateExisting()
      );
    }
  }
  return new T();
})();
