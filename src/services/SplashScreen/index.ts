import { Context, Effect, F } from 'fp'

export type SplashScreen = {
  preventAutoHide: Effect<never, never, void>
  hide: Effect<never, never, void>
}

export const SplashScreenEnv = Context.Tag<SplashScreen>('SplashScreen')

export const SplashScreen = {
  preventAutoHide: F.flatMap(SplashScreenEnv, env => env.preventAutoHide),
  hide: F.flatMap(SplashScreenEnv, env => env.hide),
}
