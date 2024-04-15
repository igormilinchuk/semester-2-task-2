const fs = require('fs');
const { Transform } = require('stream');

class UpperCaseEveryThirdWord extends Transform {
  constructor(options) {
    super(options);
    this.wordsCount = 0;
  }

  _transform(chunk, encoding, callback) {
    const words = chunk.toString().split(' ');

    const modifiedWords = words.map((word, index) => {
      if ((this.wordsCount + index + 1) % 3 === 0) {
        return word.toUpperCase();
      } else {
        return word;
      }
    });

    this.wordsCount += words.length;

    const modifiedChunk = modifiedWords.join(' ');

    callback(null, modifiedChunk);
  }
}

const inputFile = 'input.txt';

const inputStream = fs.createReadStream(inputFile);

const upperCaseStream = new UpperCaseEveryThirdWord();

const outputStream = process.stdout;

inputStream.pipe(upperCaseStream).pipe(outputStream);
