import { registerRootComponent } from 'expo'
import { Effect, F } from 'fp'
import { Element } from 'src/components/types'
import { LiveUIRoot } from './liveRoot'

const startReactNativeUI = (rootElement: Element): Effect<never, never, void> =>
  F.sync(() => registerRootComponent(() => rootElement))

export const liveUI = () => ({
  start: startReactNativeUI(LiveUIRoot()),
})
