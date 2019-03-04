const {ipcRenderer} = require('electron');

const btnAbout = document.getElementById('link-about');

btnAbout.addEventListener('click', () => {
  ipcRenderer.send('open-about-window');
});
