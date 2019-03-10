const data = require('./data');

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
    })
    return this.initalTemplate;
  },
};
