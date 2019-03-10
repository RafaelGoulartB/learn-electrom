const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const data = require('./data');
const template = require('./template');

let mainWindow;
app.on('ready', () => {
  console.log('Hello World');
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  const menuTrayTemplate = template.getTrayMenu(mainWindow);
  const menuCoursesTray = Menu.buildFromTemplate(menuTrayTemplate);
  tray.setContextMenu(menuCoursesTray);

  const menuTemplate = template.getMainMenu(app);
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
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

ipcMain.on('addedCourse', (event, newCourseName) => {
  let newMenuTrayTemplate = template.addCourseOnTray(newCourseName, mainWindow);
  const newMenuCoursesTray = Menu.buildFromTemplate(newMenuTrayTemplate);
  tray.setContextMenu(newMenuCoursesTray);
});