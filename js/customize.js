
// init
(function (){
  const elmTab = document.getElementById('tab');
  const elmModalContainer = document.getElementById('modal');
  const elmModalCustomize = document.getElementById('modal-customize');
  const elmClearButton = document.getElementById('clear-button');
  const elmUploadButton = document.getElementById('upload-button');
  const elmModalUpload = document.getElementById('modal-upload');
  const elmUploadInput = document.getElementById('upload-input');
  const elmUploadPreview = document.getElementById('upload-preview');
  const elmUploadConfirm = document.getElementById('upload-confirm');
  const elmModalCustomizeClose = document.getElementById('modal-exit');
  const elmModalUploadCancel = document.getElementById('modal-upload-cancel');
  let cropSession = undefined;

  // helpers sub-menu for upload
  function openUploadMenu(){
    elmModalCustomize.classList.add('hidden');
    elmModalUpload.classList.remove('hidden');
  }
  function closeUploadMenu(){
    elmModalCustomize.classList.remove('hidden');
    elmModalUpload.classList.add('hidden');
    elmUploadInput.value = '';
    cropSession && cropSession.destroy();
  }

  // open/close modal
  elmTab.addEventListener('click', evt => {
    elmModalContainer.classList.remove('hidden');
  });
  elmModalCustomizeClose.addEventListener('click', evt => {
    elmModalContainer.classList.add('hidden');
  });
  elmModalUploadCancel.addEventListener('click', evt => {
    closeUploadMenu();
  });

  // misc buttons
  elmClearButton.addEventListener('click', evt => {
    SCENE.children.concat().forEach(c => {
      SCENE.remove(c);
    });
  })

  // upload listeners
  elmUploadButton.addEventListener('click', evt => {
    elmUploadInput.click();
  });
  elmUploadInput.addEventListener('change', e1 => {
    const reader = new FileReader;
    reader.onload = e2 => {
      const source = e2.target.result;
      elmUploadPreview.src = source;
    };
    reader.readAsDataURL(e1.target.files[0]);
  }, false);
  elmUploadPreview.onload = () => {
    openUploadMenu();
    const side = (windowHeight - 100) * 0.4; // to match CSS
    cropSession = new Croppie(elmUploadPreview, {
      enableExif: true,
      viewport: {
        width: side,
        height: side,
        type: 'square'
      },
      boundary: {
        width: side * 1.2,
        height: side * 1.2,
      },
    });
    window.cropSession = cropSession;
  };
  elmUploadConfirm.addEventListener('click', () => {
    // todo figure this step out
    cropSession.result({
      format: 'jpeg',
      quality: 1,
    }).then(function(blob) {
      // set global textureCube
      TEXTURE.loadUploadedImage(blob);
      closeUploadMenu();
    });
  });

})();
