const fs = require('fs');
const { Transform } = require('stream');

const readStream = fs.createReadStream('./input.txt', { highWaterMark: 30 }, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

let counterWords = 0;

const capitalizeTransform = new Transform({
    transform(chunk, encoding, callback) {
        const chunkStr = chunk.toString(); 
        const words = chunkStr.split(/\b/); 
        for (let i = 0; i < words.length; i++) {
            if (/\b[\w'-]+\b/.test(words[i])) { 
                counterWords++;
                if (counterWords % 3 === 0) { 
                    this.push(words[i].toUpperCase());
                } else {
                    this.push(words[i]);
                }
            } else {
                this.push(words[i]);
            }
        }
        callback();
    }
});

readStream.pipe(capitalizeTransform).pipe(writeStream);

capitalizeTransform.on('error', (err) => {
    console.error('Error occurred during transform:', err);
});

writeStream.on('finish', () => {
    console.log('File has been written successfully.');
});

readStream.on('error', (err) => {
    console.error('Error occurred while reading the file:', err);
});
