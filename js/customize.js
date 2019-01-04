
// init
(function (){
  const elmTab = document.getElementById('tab');
  const elmModal = document.getElementById('modal');
  const elmModalClose = document.getElementById('modal-close');

  elmTab.addEventListener('click', evt => {
    elmModal.classList.remove('hidden');
  });

  elmModalClose.addEventListener('click', evt => {
    elmModal.classList.add('hidden');
  });

})();
