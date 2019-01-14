
const CubeSettings = (() => {
  class CS {
    constructor() {
      const self = this;
      this.settings = [
        {
          draft: "1.0",
          isNum: true,
          zeroOk: false,
          attr: 'size_x',
          id: 'settings-size-x',
        },
        {
          draft: "1.0",
          isNum: true,
          zeroOk: false,
          attr: 'size_y',
          id: 'settings-size-y',
        },
        {
          draft: "1.0",
          isNum: true,
          zeroOk: false,
          attr: 'size_z',
          id: 'settings-size-z',
        },
        {
          draft: "1.0",
          isNum: true,
          zeroOk: true,
          attr: 'rotation_x',
          id: 'settings-rotation-x',
        },
        {
          draft: "1.0",
          isNum: true,
          zeroOk: true,
          attr: 'rotation_y',
          id: 'settings-rotation-y',
        },
        {
          draft: "1.0",
          isNum: true,
          zeroOk: true,
          attr: 'rotation_z',
          id: 'settings-rotation-z',
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
        if (newValue || (newValue === 0 && s.zeroOk)) {
          s.value = newValue;
        }

        s.elm.value = s.draft;
        self[s.attr] = s.value;
      });
      if (window.SCENE){
        window.SCENE.children.forEach(mesh => {
          mesh.block.setSize(this.size_x, this.size_y, this.size_z);
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
