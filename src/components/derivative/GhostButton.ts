import { Colors } from 'src/services/Theme'
import { named2 } from '../hyperscript'
import { SolidButton } from './SolidButton'

export const GhostButton: typeof SolidButton = named2('GhostButton')(props =>
  SolidButton({
    bg: Colors.opacity(0)(Colors.black),
    rippleColor: props.color ?? Colors.primary,
    rippleOpacity: 0.1,
    textColor: props.color ?? Colors.primary,
    ...props,
  }),
)
