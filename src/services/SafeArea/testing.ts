import { Layer, O } from 'fp'
import { SafeAreaServiceEnv } from '.'

export const SafeAreaServiceTest = Layer.succeedContext(
  SafeAreaServiceEnv.context({
    initialMetrics: O.some({
      frame: {
        width: 320,
        height: 640,
        x: 0,
        y: 0,
      },
      insets: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
    }),
  }),
)
