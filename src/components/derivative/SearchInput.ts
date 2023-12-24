import { Input, MaterialIcons, Row, View } from 'src/components'
import { AppEvent } from 'src/modules/core/events'
import { Colors } from 'src/services/Theme'

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => AppEvent
}) =>
  Row({ shadow: 1, bg: Colors.white })([
    Input({
      onChange,
      value,
      placeholder: 'Buscar',
      flex: 1,
      pr: 50,
      round: 0,
    }),
    View({ w: 50, ml: -50, justify: 'center', align: 'center' })([
      MaterialIcons({
        name: 'search',
        size: 32,
        color: Colors.text.gray,
      }),
    ]),
  ])
