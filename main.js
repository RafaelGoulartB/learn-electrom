const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const data = require('./data');
const template = require('./template');

app.on('ready', () => {
  console.log('Hello World');
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  const menuTrayTemplate = template.getTrayMenu(mainWindow);
  const menuCoursesTray = Menu.buildFromTemplate(menuTrayTemplate);
  tray.setContextMenu(menuCoursesTray);
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

ipcMain.on('course-stoped', (event, courseName, studiedTime) => {
  data.saveDataCourse(courseName, studiedTime);
});
