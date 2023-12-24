import * as SplashScreen_ from 'expo-splash-screen'
import { F, Layer, pipe } from 'fp'
import { SplashScreenEnv } from '.'

export const SplashScreenLive = Layer.succeedContext(
  SplashScreenEnv.context({
    preventAutoHide: pipe(
      F.tryPromise(() => SplashScreen_.preventAutoHideAsync()),
      F.ignore,
    ),
    hide: pipe(
      F.tryPromise(() => SplashScreen_.hideAsync()),
      F.ignore,
    ),
  }),
)
