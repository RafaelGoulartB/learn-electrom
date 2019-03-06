const {ipcRenderer} = require('electron');
const timer = require('./timer');
const data = require('../../data');

const linkSobre = document.querySelector('#link-sobre');
const playBottun = document.querySelector('.botao-play');
const timeDOM = document.querySelector('.tempo');
const courseName = document.querySelector('.curso');

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
    play = false;
  } else {
    timer.start(timeDOM);
    play = true;
  }
});

ipcRenderer.on('course-changed', (event, course) => {
  courseName.textContent = course;

  data.getDataFromCourse(course)
      .then((data) => timeDOM.textContent = data.time);
});
