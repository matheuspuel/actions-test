import { Layer, O } from 'fp'
import { SafeAreaServiceEnv } from '.'

export const SafeAreaServiceLive = Layer.succeedContext(
  SafeAreaServiceEnv.context({
    initialMetrics: O.none(),
  }),
)
