import strings from './en.json';

export default function translate(stringToTranslate) {
  const isStringTranslated = Object.keys(strings).indexOf(stringToTranslate) >= 0;

  if (!isStringTranslated) {
    if (stringToTranslate.includes('_')) {
      const collectionOfWord = stringToTranslate.split('_');
      const newWord = collectionOfWord.map((single) => {
        return single.substring(0, 1).toUpperCase() + single.substring(1);;
      });

      return newWord.join(' ');
    }

    return stringToTranslate.substring(0, 1).toUpperCase() + stringToTranslate.substring(1);;
  }

  return strings[stringToTranslate];
}
