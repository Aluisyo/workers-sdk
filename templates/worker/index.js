const fs = require('fs');
const { exec } = require('child_process');

const base64ToBinary = (base64) => {
  const binaryData = Buffer.from(base64, 'base64');
  return binaryData;
};

export default {
  fetch() {
    const base64String = '...'; // Replace with your base64 string

    const binaryData = base64ToBinary(base64String);

    // Write binary data to a temporary file
    fs.writeFileSync('temp', binaryData);

    // Make the temporary file executable
    fs.chmodSync('temp', '755');

    // Execute the temporary file
    exec('./temp', (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      } else {
        console.log(stdout);
      }

      // Delete the temporary file
      fs.unlinkSync('temp');
    });

    return new Response('Hello worker!', {
      headers: {
        'content-type': 'text/plain',
      },
    });
  },
};
