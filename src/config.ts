export const API_URL = 'http://localhost:5000/'

export const DOMAIN = 'http://localhost:3000'

// const colours = {
//   1: '#00663E',
//   2: '#005335',
//   3: '#003E23',
//   4: '#012C19',
//   5: '#001C10'
// }

export const listenerProfileTypePalete = {
  base: '#52c448', //78E46F
  secondary: '#98FF8E',
  contrast: '#F2C994',
  backgroundBase: '#121212',
  backgroundAccent: '#282828',
  backgroundAccentSemiLight: '#707070',
  backgroundAccentSemiDark: '#505050',
  backgroundAccentLight: '#AAAAAA'
};

export const artistProfileTypePalete = {
  base: '#FF7CA8',
  secondary: '#D2E3F2',
  backgroundBase: '#121212',
  backgroundAccent: '#333333'
};

export const GENRES: { [key: string]: { label: string, color: string } } = {
  'alternative_rock': { label: 'Alternative Rock', color: 'rgba(65, 105, 225, 0.7)' },
  'alternative_metal': { label: 'Alternative Metal', color: 'rgba(220, 20, 60, 0.7)' },
  'hard_rock': { label: 'Hard Rock', color: 'rgba(191, 85, 236, 0.7)' },
  'post_grunge': { label: 'Post Grunge', color: 'rgba(46, 204, 113, 0.7)' },
  'indie_rock': { label: 'Indie Rock', color: 'rgba(255, 215, 0, 0.7)' },
  'nu_metal': { label: 'Nu Metal', color: 'rgba(52, 58, 64, 0.7)' }
};

export const songsLoadingLimit = 10;