
const CubeSettings = (() => {
  class CS {
    constructor() {
      const self = this;
      this.settings = [
        {
          draft: "1.0",
          isNum: true,
          attr: 'sizeX',
          id: 'settings-x',
        },
        {
          draft: "1.0",
          isNum: true,
          attr: 'sizeY',
          id: 'settings-y',
        },
        {
          draft: "1.0",
          isNum: true,
          attr: 'sizeZ',
          id: 'settings-z',
        },
      ].map(s => {
        s.elm = document.getElementById(s.id);
        s.elm.addEventListener('input', evt => {
          let newDraft = s.elm.value;
          self.setAttr(s.attr, newDraft);
        });
        return s;
      });

      // pre-fill inputs
      this.updateExisting();
    }
    updateExisting() {
      const self = this;
      this.settings.forEach(s => {
        let newValue = s.draft;
        if (s.isNum){
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
    setAttr(attr, newDraft) {
      this.settings.forEach(s => {
        if (s.attr === attr){
          s.draft = newDraft;
        }
      });
      this.updateExisting();
    }
  }
  return new CS();
})();
