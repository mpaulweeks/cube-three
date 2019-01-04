
// init
(function (){
  const elmTab = document.getElementById('tab');
  const elmModal = document.getElementById('modal');
  const elmUploadButton = document.getElementById('upload-button');
  const elmUploadInput = document.getElementById('upload-input');
  const elmUploadPreview = document.getElementById('upload-preview');
  const elmUploadConfirm = document.getElementById('upload-confirm');
  const elmModalClose = document.getElementById('modal-close');

  elmTab.addEventListener('click', evt => {
    elmModal.classList.remove('hidden');
  });

  elmModalClose.addEventListener('click', evt => {
    elmModal.classList.add('hidden');
  });

  let cropSession = undefined;
  elmUploadButton.addEventListener('click', e => {
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
    elmUploadButton.classList.add('hidden');
    elmUploadConfirm.classList.remove('hidden');

    cropSession = new Croppie(elmUploadPreview, {
      enableExif: true,
      viewport: {
        width: 200,
        height: 200,
        type: 'square'
      },
      boundary: {
        width: 300,
        height: 300,
      },
    });
    window.cropSession = cropSession;
  };
  elmUploadConfirm.addEventListener('click', () => {
    elmUploadButton.classList.remove('hidden');
    elmUploadConfirm.classList.add('hidden');

    // todo figure this step out
    cropSession.result().then(function(blob) {
      console.log(blob);
      textureCube = loader.load(
        [0,1,2,3,4,5].map(i => blob)
      );
    });
  })

})();
