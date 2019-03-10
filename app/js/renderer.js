const {ipcRenderer} = require('electron');
const timer = require('./timer');
const data = require('../../data');

const linkSobre = document.querySelector('#link-sobre');
const playBottun = document.querySelector('.botao-play');
const timeDOM = document.querySelector('.tempo');
const courseName = document.querySelector('.curso');
const btnAddNewCourse = document.querySelector('.botao-adicionar');
const inputAddNewCourse = document.querySelector('.campo-adicionar');

window.onload = () => {
  data.getDataFromCourse(courseName.textContent)
      .then((data) => timeDOM.textContent = data.time);
};

linkSobre.addEventListener('click', () =>
  ipcRenderer.send('abrir-janela-sobre')
);

const imgsToogleButton = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;

playBottun.addEventListener('click', () => {
  imgsToogleButton.reverse();
  playBottun.src = imgsToogleButton[0];
  if (play) {
    timer.stop(courseName.textContent);
    new Notification('Alura Timer',
      {
        body: `Course ${courseName.textContent} was stopped!`,
        icon: 'img/stop-button.png'
      }
    );
    play = false;
  } else {
    timer.start(timeDOM);
    new Notification('Alura Timer',
      {
        body: `Course ${courseName.textContent} was started!`,
        icon: 'img/play-button.png'
      }
    );
    play = true;
  }
});

ipcRenderer.on('course-changed', (event, course) => {
  timer.stop(courseName.textContent)
  courseName.textContent = course;
  data.getDataFromCourse(course)
      .then((data) => timeDOM.textContent = data.time)
      .catch(err => timeDOM.textContent = '00:00:00')
});

btnAddNewCourse.addEventListener('click', () => {
  if (inputAddNewCourse.value == '') {
    console.log('err: input is empty');
    return;
  }
  const newCourseName = inputAddNewCourse.value;
  courseName.textContent = newCourseName;
  timeDOM.textContent = '00:00:00';
  inputAddNewCourse.value = null;
  ipcRenderer.send('addedCourse', newCourseName);
});