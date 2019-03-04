const {app, BrowserWindow, ipcMain} = require('electron');

app.on('ready', () => {
  console.log('Hello World');
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => app.quit());

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
  if (!aboutWindow) {
    aboutWindow = new BrowserWindow({
      width: 300,
      height: 200,
      alwaysOnTop: true,
      frame: false,
    });
    aboutWindow.on('closed', () => {
      aboutWindow = null;
    });
  }
  aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-about-window', () => {
  aboutWindow.close();
});
