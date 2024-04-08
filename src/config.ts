export const API_URL = 'http://localhost:5000'

export const DOMAIN = 'http://localhost:3000'

// const colours = {
//   1: '#00663E',
//   2: '#005335',
//   3: '#003E23',
//   4: '#012C19',
//   5: '#001C10'
// }

export const months: { [key: string]: string } = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

export const countries = {
  'Albania': 'Albania',
  'Algeria': 'Algeria',
  'Andorra': 'Andorra',
  'Argentina': 'Argentina',
  'Armenia': 'Armenia',
  'Australia': 'Australia',
  'Austria': 'Austria',
  'Azerbaijan': 'Azerbaijan',
  'Belgium': 'Belgium',
  'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
  'Brazil': 'Brazil',
  'Bulgaria': 'Bulgaria',
  'Cameroon': 'Cameroon',
  'Canada': 'Canada',
  'Central African Republic': 'Central African Republic',
  'Chile': 'Chile',
  'Colombia': 'Colombia',
  'Costa Rica': 'Costa Rica',
  'Croatia': 'Croatia',
  'Cyprus': 'Cyprus',
  'Czech Republic': 'Czech Republic',
  'Denmark': 'Denmark',
  'Ecuador': 'Ecuador',
  'Egypt': 'Egypt',
  'Estonia': 'Estonia',
  'Finland': 'Finland',
  'France': 'France',
  'Georgia': 'Georgia',
  'Germany': 'Germany',
  'Ghana': 'Ghana',
  'Greece': 'Greece',
  'Iceland': 'Iceland',
  'India': 'India',
  'Indonesia': 'Indonesia',
  'Ireland': 'Ireland',
  'Italy': 'Italy',
  'Japan': 'Japan',
  'Latvia': 'Latvia',
  'Liechtenstein': 'Liechtenstein',
  'Lithuania': 'Lithuania',
  'Luxembourg': 'Luxembourg',
  'Madagascar': 'Madagascar',
  'Malta': 'Malta',
  'Mexico': 'Mexico',
  'Moldova': 'Moldova',
  'Monaco': 'Monaco',
  'Morocco': 'Morocco',
  'Netherlands': 'Netherlands',
  'New Zealand': 'New Zealand',
  'Niger': 'Niger',
  'Nigeria': 'Nigeria',
  'Norway': 'Norway',
  'Poland': 'Poland',
  'Portugal': 'Portugal',
  'Qatar': 'Qatar',
  'Romania': 'Romania',
  'San Marino': 'San Marino',
  'Slovakia': 'Slovakia',
  'Slovenia': 'Slovenia',
  'South Africa': 'South Africa',
  'Spain': 'Spain',
  'Sweden': 'Sweden',
  'Switzerland': 'Switzerland',
  'Turkey': 'Turkey',
  'Ukraine': 'Ukraine',
  'United Kingdom': 'United Kingdom',
  'United States': 'United States',
  'Uruguay': 'Uruguay'
}

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
  contrast: '#',
  backgroundBase: '#121212',
  backgroundAccent: '#282828',
  backgroundAccentSemiLight: '#707070',
  backgroundAccentSemiDark: '#505050',
  backgroundAccentLight: '#AAAAAA'
};

export const GENRES: { [key: string]: { label: string, color: string } } = {
  'alternative_rock': { label: 'Alternative Rock', color: 'rgba(65, 105, 225, 0.7)' },
  'alternative_metal': { label: 'Alternative Metal', color: 'rgba(220, 20, 60, 0.7)' },
  'hard_rock': { label: 'Hard Rock', color: 'rgba(191, 85, 236, 0.7)' },
  'post_grunge': { label: 'Post Grunge', color: 'rgba(46, 204, 113, 0.7)' },
  'indie_rock': { label: 'Indie Rock', color: 'rgba(255, 215, 0, 0.7)' },
  'nu_metal': { label: 'Nu Metal', color: 'rgba(52, 58, 64, 0.7)' },
  'pop_rock': { label: 'Pop Rock', color: 'rgba(143, 78, 179, 0.7)' },
  'patriotic_rock': { label: 'Patriotic Rock', color: 'rgba(128, 0, 128, 0.7)' },
  'rock': { label: 'Rock', color: 'rgba(102, 0, 51, 0.7)' },
  'pop': { label: 'Pop', color: 'rgba(255, 102, 153, 0.7)' },
  'pop_ballad': { label: 'Pop Ballad', color: 'rgba(102, 179, 221, 0.7)' },
};

export const songsLoadingLimit = 10;