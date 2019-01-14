
// init
(function (){
  const elmTab = document.getElementById('tab');
  const elmModalContainer = document.getElementById('modal');
  const elmModalCustomize = document.getElementById('modal-customize');
  const elmUploadButton = document.getElementById('upload-button');
  const elmModalUpload = document.getElementById('modal-upload');
  const elmUploadInput = document.getElementById('upload-input');
  const elmUploadPreview = document.getElementById('upload-preview');
  const elmUploadConfirm = document.getElementById('upload-confirm');
  const elmFullScreenOn = document.getElementById('fullscreen-on');
  const elmFullScreenOff = document.getElementById('fullscreen-off');
  const elmFullScreenOnButton = document.getElementById('fullscreen-on-button');
  const elmFullScreenOffButton = document.getElementById('fullscreen-off-button');
  const elmModalCustomizeClose = document.getElementById('modal-exit');
  const elmModalUploadCancel = document.getElementById('modal-upload-cancel');
  const elmModalMobileContainer = document.getElementById('modal-mobile');
  const elmModalMobileClose = document.getElementById('modal-mobile-close');
  let isCustomizeOpen = false;
  let isFullScreen = false;
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
    isCustomizeOpen = true;
    elmModalContainer.classList.remove('hidden');
    elmTab.classList.remove('always-show');
  });
  elmModalCustomizeClose.addEventListener('click', evt => {
    isCustomizeOpen = false;
    elmModalContainer.classList.add('hidden');
    if (!isFullScreen){
      elmTab.classList.add('always-show');
    }
  });
  elmModalUploadCancel.addEventListener('click', evt => {
    closeUploadMenu();
  });
  elmModalMobileClose.addEventListener('click', evt => {
    elmModalMobileContainer.classList.add('hidden');
  });

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
      showZoomer: true,
      enableExif: true,
      viewport: {
        type: 'square',
        width: side,
        height: side,
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

  // on fullscreen
  elmFullScreenOnButton.addEventListener('click', () => {
    const elm = document.documentElement;
    if (elm.requestFullScreen) {
      elm.requestFullScreen();
    } else if(elm.webkitRequestFullScreen) {
      elm.webkitRequestFullScreen();
    } else if(elm.mozRequestFullScreen) {
      elm.mozRequestFullScreen();
    } else if(elm.msRequestFullScreen) {
      elm.msRequestFullScreen();
    }
  });
  elmFullScreenOffButton.addEventListener('click', () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  });
  function onFullScreen(){
    if (document.fullscreenElement) {
      isFullScreen = true;
      elmFullScreenOn.classList.add('hidden');
      elmFullScreenOff.classList.remove('hidden');
      elmTab.classList.remove('always-show');
    } else {
      isFullScreen = false;
      elmFullScreenOn.classList.remove('hidden');
      elmFullScreenOff.classList.add('hidden');
      if (!isCustomizeOpen) {
        elmTab.classList.add('always-show');
      }
    }
  }
  document.addEventListener('fullscreenchange', onFullScreen);
  document.addEventListener('webkitfullscreenchange', onFullScreen);
  document.addEventListener('mozfullscreenchange', onFullScreen);

})();
