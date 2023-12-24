import * as React from 'react'
import { named2 } from 'src/components/hyperscript'
import { FontWeight } from 'src/components/react-native/Txt'
import { Children, UIColor } from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'
import { Colors } from 'src/services/Theme'

export type TextStyleContext = {
  color: UIColor
  size: number
  weight: FontWeight
  case: 'uppercase' | 'normal'
}

export const TextStyleContext = React.createContext<TextStyleContext>({
  color: Colors.text.normal,
  size: 14,
  weight: 4,
  case: 'normal',
})

export const useTextStyle = () => React.useContext(TextStyleContext)

export const TextStyleProvider = named2('TextStyleProvider')(
  // eslint-disable-next-line react/display-name
  (value: TextStyleContext) => (children: Children) =>
    React.createElement(
      TextStyleContext.Provider,
      { value },
      ...childrenFromInput(children),
    ),
)

export const TextStyleUpdater = named2('TextStyleUpdater')(
  (updater: (previous: TextStyleContext) => TextStyleContext) =>
    (children: Children) => {
      const textStyle = useTextStyle()
      return TextStyleProvider(updater(textStyle))(children)
    },
)
