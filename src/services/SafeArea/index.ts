import { Context, F, Option } from 'fp'
import { Metrics } from 'react-native-safe-area-context'

export type SafeAreaService = { initialMetrics: Option<Metrics> }

export const SafeAreaServiceEnv = Context.Tag<SafeAreaService>('SafeArea')

export const SafeAreaService = {
  initialMetrics: F.map(SafeAreaServiceEnv, env => env.initialMetrics),
}
