const {ipcRenderer, shell} = require('electron');

const btnClose = document.getElementById('close_window');
const linkGithub = document.getElementById('link-github');

linkGithub.addEventListener('click', () =>
  shell.openExternal('https://github.com/RafaelGoulartB')
);

btnClose.addEventListener('click', () =>
  ipcRenderer.send('close-about-window')
);
