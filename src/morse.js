const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function decodeMorse(morseCode) {
  // Your code should go here.
  if (morseCode === "") { return "" }
  const trimmedMorseCode = morseCode.trim();
  var splitted = trimmedMorseCode.split(' ');
  return splitted.length > 1 ? decodeMultiple() : decode();

  function decodeMultiple() {
    var morseArr = splitted.map((val) => {
      if (val == ' ') return ' ';
      return MORSE_CODE[val];
    });

    var hasSpace = false;

    morseArr.forEach(function(item, i, array) {
      if (i > 0 && !array[i] && !array[i + 1]) {
        hasSpace = true;
      }
      if (!hasSpace && i === morseArr.length - 1) {
        morseArr = morseArr.join('');
      }
    })

    if (hasSpace) {
      morseArr.map(function(item, index, array) {
        if (!item) array[index] = 'a';
      })
      morseArr = morseArr.join('')
      morseArr = morseArr.replace(/[a][a]/g, ' ');
      return morseArr;
    }
    else {
      return morseArr;
    }
  }
  function decode() {
    return MORSE_CODE[splitted];
  }
}

module.exports = decodeMorse;
