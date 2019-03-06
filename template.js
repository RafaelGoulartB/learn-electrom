const data = require('./data');

module.exports = {
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
    return template;
  },
};
