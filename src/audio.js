import { translate } from '@vitalets/google-translate-api';

const { text } = await translate('Hi, How are you?', { to: 'hi' });

console.log(text) // => 'Hello World! How are you?'