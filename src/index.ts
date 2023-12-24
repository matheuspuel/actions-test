import 'fast-text-encoding'
import 'react-native-url-polyfill/auto'

import { F, Layer, Runtime, pipe } from 'fp'
import { startApp } from 'src/app'
import { runtime } from './runtime'
import { UIServiceEnv } from './services/UI'
import { liveUI } from './services/UI/live'


const appRuntime = pipe(
  Layer.succeedContext(runtime.context),
  Layer.provideMerge(Layer.succeed(UIServiceEnv, liveUI())),
  Layer.toRuntime,
  F.scoped,
  F.cached,
  F.flatten,
  F.runSync,
)

// eslint-disable-next-line functional/no-expression-statements
void Runtime.runPromise(appRuntime)(startApp)
