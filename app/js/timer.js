const moment = require('moment');
const {ipcRenderer} = require('electron');
let timeAsSec;
let runingTimer;

module.exports = {
  start(element) {
    const time = moment.duration(element.textContent);
    timeAsSec = time.asSeconds();

    clearInterval(runingTimer);
    runingTimer = setInterval(() => {
      timeAsSec++;
      element.textContent = this.secondsToTime(timeAsSec);
    }, 1000);
  },
  stop(courseName) {
    clearInterval(runingTimer);
    const studiedTime = this.secondsToTime(timeAsSec);

    ipcRenderer.send('course-stoped', courseName, studiedTime);
  },
  secondsToTime(seconds) {
    return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
  },
};
