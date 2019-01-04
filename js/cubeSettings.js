
const CubeSettings = (() => {
  class CS {
    constructor() {
      const self = this;
      this.settings = [
        {
          default: 1.0,
          attr: 'sizeX',
          id: 'settings-x',
        },
        {
          default: 1.0,
          attr: 'sizeY',
          id: 'settings-y',
        },
        {
          default: 1.0,
          attr: 'sizeZ',
          id: 'settings-z',
        },
      ].map(s => {
        self[s.attr] = s.default;
        s.draft = s.default;
        s.elm = document.getElementById(s.id);
        s.elm.addEventListener('input', evt => {
          let newValue = s.elm.value;
          self.setAttr(s.attr, newValue);
        })
        return s;
      });

      // pre-fill inputs
      this.updateExisting();
    }
    updateExisting() {
      const self = this;
      this.settings.forEach(s => {
        let newValue = s.draft;
        if (!isNaN(s.default)){
          newValue = parseFloat(newValue);
        }
        if (newValue) {
          s.value = newValue;
        }

        s.elm.value = s.draft;
        self[s.attr] = s.value;
      });
      if (window.scene){
        window.scene.children.forEach(mesh => {
          mesh.scale.x = this.sizeX;
          mesh.scale.y = this.sizeY;
          mesh.scale.z = this.sizeZ;
        });
      }
    }
    setAttr(attr, newValue) {
      this.settings.forEach(s => {
        if (s.attr === attr){
          s.draft = newValue;
        }
      });
      this.updateExisting();
    }
  }
  return new CS();
})();
