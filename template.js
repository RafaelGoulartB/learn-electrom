const data = require('./data');
const {ipcMain} = require('electron');

module.exports = {
  initalTemplate: null,

  getTrayMenu(window) {
    const template = [
      {label: 'Cursos'},
      {type: 'separator'},
    ];

    const coursesNames = data.getNameCourses();
    coursesNames.forEach((courseName) => template.push(
        {
          label: courseName,
          type: 'radio',
          click: () => {
            window.send('course-changed', courseName);
          },
        }
    ));
    this.initalTemplate = template;
    return template;
  },
  addCourseOnTray(newCourseName, window) {
    this.initalTemplate.push({
      label: newCourseName,
      type: 'radio',
      checked: true,
      click: () => {
        window.send('course-changed', newCourseName);
      },
    });
    return this.initalTemplate;
  },
  getMainMenu() {
    const menuTemplate = [
      {
        label: 'View',
        submenu: [{
          role: 'reload',
        },
        {
          role: 'toggledevtools',
        }],
      },
      {
        label: 'Window',
        submenu: [
          {
            role: 'minimize',
          },
          {
            role: 'close',
          },
        ],
      },
      {
        label: 'Sobre',
        submenu: [
          {
            label: 'Sobre o Alura Timer',
            click: () => {
              ipcMain.emit('open-about-window');
            },
            accelerator: 'CmdOrCtrl+I',
          },
        ],
      },
    ];
    // If is MAC
    if ( process.platform == 'darwin') {
      templateMenu.unshift(
          {
            label: app.getName(),
            submenu: [
              {
                label: 'Estou rodando no Mac!',
              },
            ],
          }
      );
    };
    return menuTemplate;
  },


};
