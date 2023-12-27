import { S } from 'fp'
import { Color } from 'src/utils/datatypes'

const hex = S.decodeSync(Color.FromHex)

export const darkTheme = {
  type: 'dark' as 'dark' | 'light',
  colors: {
    background: hex('#292929'),
    card: hex('#4d4d4d'),
    cardSecondary: hex('#4d4d4d'),
    header: hex('#4d4d4d'),
    text: {
      light: hex('#ffffff'),
      dark: hex('#000000'),
      secondary: hex('#606060'),
      gray: hex('#909090'),
    },
    white: hex('#ffffff'),
    black: hex('#000000'),
    primary: hex('#488ec0'),
    secondary: hex('#a5d6fa'),
    success: hex('#4f9537'),
    error: hex('#b94545'),
    warning: hex('#caa82f'),
    info: hex('#488ec0'),
    gray: hex('#525252'),
  },
}
