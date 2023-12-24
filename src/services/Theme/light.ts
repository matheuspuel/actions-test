import { Color } from 'src/utils/datatypes'
import { S } from 'src/utils/fp'
import { darkTheme } from './dark'

const hex = S.decodeSync(Color.FromHex)

export const lightTheme: typeof darkTheme = {
  type: 'light',
  colors: {
    background: hex('#e7e7e7'),
    card: hex('#ffffff'),
    cardSecondary: hex('#ffffff'),
    header: hex('#6d6d6d'),
    text: {
      light: hex('#ffffff'),
      dark: hex('#1e1e1e'),
      secondary: hex('#707070'),
      gray: hex('#999999'),
    },
    white: hex('#ffffff'),
    black: hex('#000000'),
    primary: hex('#4d4d4d'),
    secondary: hex('#4e6a80'),
    success: hex('#4f9537'),
    error: hex('#b94545'),
    warning: hex('#caa82f'),
    info: hex('#488ec0'),
    gray: hex('#52525b'),
  },
}
