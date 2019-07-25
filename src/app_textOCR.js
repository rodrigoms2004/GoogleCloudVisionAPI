require('dotenv/config');
const path = require('path');
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

const {
  readFolder
} = require('./util')

const getCarPlate = async (fileName) => {
  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  
  return detections;
}

// run code 
(async () => {

  const regexPlate = /^[A-Z|a-z]{3,3}((\d+)|(\ \d+))/gm
  
  
  // get filenames 
  const platesFilePath = await readFolder( path.resolve(__dirname, 'images') );
  
  platesFilePath.forEach(async plate => {

    // get plate info
    const results = await getCarPlate( path.resolve(__dirname, 'images', plate) );
      
    const allPlatesFound = results
      .map( result => String( result.description.match(regexPlate) )
                        .trim()
                        .replace(' ', '') )
      .filter( result => result !== 'null' )

    // remove any duplicates
    const plateFound = [... new Set(allPlatesFound)][0]

    console.log(plateFound);
    
  })

})();





