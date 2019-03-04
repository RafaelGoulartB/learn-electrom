const {ipcRenderer} = require('electron');

const linkSobre = document.querySelector('#link-sobre');


linkSobre.addEventListener('click', function() {
  ipcRenderer.send('abrir-janela-sobre');
});
