const fs = require('fs');

const readFolder = folder => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    })
  })
}

module.exports = {
  readFolder
};