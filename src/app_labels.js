require('dotenv/config');
const path = require('path');

const fileName = path.resolve(__dirname, 'images', 'carplate.jpg');

const quickstart = async (fileName) => {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection(fileName);
  const labels = result.labelAnnotations;
  console.log('Labels:', labels);
  labels.forEach(label => console.log(label.description));

}

quickstart(fileName);