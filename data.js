const jsonfile = require('jsonfile-promised');
const fs = require('fs')

module.exports = {

  saveDataCourse(courseName, studiedTime) {
    const filePath = __dirname + '/data/' + courseName + '.json';
    if (fs.existsSync(filePath)) {
      this.addTimeOnCourse(filePath, studiedTime);
    } else {
      this.createCourseFile(courseName, {})
        .then(() => this.addTimeOnCourse(filePath, studiedTime))
    }
  },
  addTimeOnCourse(fileCourse, studiedTime) {
    const contentFileCourse = {
      lastStudy: new Date().toString(),
      time: studiedTime
    }
    jsonfile.writeFile(fileCourse, contentFileCourse, {spaces: 2})
      .then(() => console.log('Time Added'))
      .catch(err => console.log(err))
  },
  createCourseFile(nameFile, contentFile) {
    return jsonfile.writeFile(nameFile, contentFile)
      .then(() => console.log('File Created'))
      .catch(err => console.log);
  },
  getDataFromCourse(courseName) {
    const filePath = __dirname + '/data/' + courseName + '.json';
    return jsonfile.readFile(filePath)
  }
}