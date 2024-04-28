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
  'January': '1',
  'February': '2',
  'March': '3',
  'April': '4',
  'May': '5',
  'June': '6',
  'July': '7',
  'August': '8',
  'September': '9',
  'October': '10',
  'November': '11',
  'December': '12'
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
};

export const songLanguages: { [key: string]: { label: string, color: string } } = {
  'ukrainian': { label: 'Ukrainian', color: 'rgba(255, 215, 0, 0.7)' }, // Gold
  'english': { label: 'English', color: 'rgba(220, 53, 69, 0.7)' }, // Red
};

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

export const songGenres: { [key: string]: { label: string, color: string } } = {
  'alternative_rock': { label: 'Alternative Rock', color: 'rgba(65, 105, 225, 0.7)' }, // Deep Azure
  'alternative_metal': { label: 'Alternative Metal', color: 'rgba(220, 20, 60, 0.7)' }, // Crimson
  'hard_rock': { label: 'Hard Rock', color: 'rgba(191, 85, 236, 0.7)' }, // Lavender Blush
  'post_grunge': { label: 'Post Grunge', color: 'rgba(46, 204, 113, 0.7)' }, /// Green
  'indie_rock': { label: 'Indie Rock', color: 'rgba(255, 215, 0, 0.7)' }, // Gold
  'nu_metal': { label: 'Nu Metal', color: 'rgba(52, 58, 64, 0.7)' }, // Dark Gray
  'pop_rock': { label: 'Pop Rock', color: 'rgba(143, 78, 179, 0.7)' }, // Medium Purple
  'patriotic_rock': { label: 'Patriotic Rock', color: 'rgba(128, 0, 128, 0.7)' }, // Purple
  'rock': { label: 'Rock', color: 'rgba(102, 0, 51, 0.7)' }, // Maroon
  'pop': { label: 'Pop', color: 'rgba(255, 102, 153, 0.7)' }, // Pink
  'pop_ballad': { label: 'Pop Ballad', color: 'rgba(102, 179, 221, 0.7)' }, // Light Steel Blue
  'heavy_metal': { label: 'Heavy Metal', color: 'rgba(153, 0, 0, 0.7)' },  // Dark red
  'emo': { label: 'Emo', color: 'rgba(128, 0, 128, 0.7)' },  // Dark purple
  'post_metal': { label: 'Post Metal', color: 'rgba(0, 128, 128, 0.7)' },  // Teal
  'rock_ballad': { label: 'Rock Ballad', color: 'rgba(179, 102, 249, 0.7)' },  // Light purple
  'folk_rock': { label: 'Folk Rock', color: 'rgba(144, 238, 144, 0.7)' },  // Light green
  'emo_pop': { label: 'Emo Pop', color: 'rgba(204, 0, 102, 0.7)' },  // Cherry red
  'grunge': { label: 'Grunge', color: 'rgba(34, 139, 34, 0.7)' },  // Forest green
  'electropop': { label: 'Electropop', color: 'rgba(0, 255, 255, 0.7)' },  // Cyan
  'alternative_pop': { label: 'Alternative Pop', color: 'rgba(102, 204, 0, 0.7)' },  // Lime green
  'classic_rock': { label: 'Classic Rock', color: 'rgba(189, 183, 107, 0.7)' },  // Light brown
  'hardcore_punk': { label: 'Hardcore Punk', color: 'rgba(255, 0, 0, 0.7)' },  // Red
  'dance_pop': { label: 'Dance Pop', color: 'rgba(255, 204, 0, 0.7)' },  // Gold
  'post_punk': { label: 'Post Punk', color: 'rgba(128, 128, 128, 0.7)' },  // Gray
  'teen_pop': { label: 'Teen Pop', color: 'rgba(255, 165, 0, 0.7)' },  // Orange
  'groove_metal': { label: 'Groove Metal', color: 'rgba(139, 69, 19, 0.7)' },  // Dark orange
  'goth_rock': { label: 'Goth Rock', color: 'rgba(85, 107, 147, 0.7)' },  // Blueish gray
  'folk_pop': { label: 'Folk Pop', color: 'rgba(238, 238, 149, 0.7)' },  // Light yellow
  'industrial_metal': { label: 'Industrial Metal', color: 'rgba(0, 0, 128, 0.7)' },  // Dark blue
  'power_pop': { label: 'Power Pop', color: 'rgba(255, 128, 179, 0.7)' },  // Light pink
  'indie_pop': { label: 'Indie Pop', color: 'rgba(204, 255, 0, 0.7)' },  // Lime yellow
  'post_rock': { label: 'Post Rock', color: 'rgba(0, 102, 204, 0.7)' },  // Dark blue
  'punk_rock': { label: 'Punk Rock', color: 'rgba(255, 140, 0, 0.7)' },  // Deep orange
};

export const songsLoadingLimit = 10;

export const songGuesserDifficulties: {
  [key: string]: {
    label: string,
    seconds: number,
    color: string
  }
} = {
  'NEW_TO_MUSIC': {
    label: 'New To Music',
    seconds: 15,
    color: listenerProfileTypePalete.base
  },
  'FREQUENT_LISTENER': {
    label: 'Frequent Listener',
    seconds: 10,
    color: 'rgb(52, 137, 48)'
  },
  'TRUE_FAN': {
    label: 'True Fan',
    seconds: 5,
    color: 'rgb(37, 108, 32)'
  }
}
