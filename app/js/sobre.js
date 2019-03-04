const {ipcRenderer, shell} = require('electron');
const process = require('process');

const linkFechar = document.querySelector('#link-fechar');
const linkTwitter = document.querySelector('#link-twitter');
const versaoElectron = document.querySelector('#versao-electron');

window.onload = function() {
  versaoElectron.textContent = process.versions.electron;
};

linkFechar.addEventListener('click', function() {
  ipcRenderer.send('fechar-janela-sobre');
});

linkTwitter.addEventListener('click', function() {
  shell.openExternal('https://www.twitter.com/dquintanilhas');
});
