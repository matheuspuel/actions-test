import { HttpClient } from '@effect/platform'
import { F, Layer, LogLevel, Logger, pipe } from 'fp'
import { SafeAreaServiceLive } from './services/SafeArea/live'
import { SplashScreenLive } from './services/SplashScreen/live'
import { envName } from './utils/Metadata'

const DEV_MINIMUM_LOG_LEVEL: LogLevel.LogLevel = LogLevel.Debug

const MainLayer = pipe(
  Logger.minimumLogLevel(
    envName === 'development' ? DEV_MINIMUM_LOG_LEVEL : LogLevel.Info,
  ),
  Layer.provideMerge(SafeAreaServiceLive),
  Layer.provideMerge(SplashScreenLive),
  Layer.provideMerge(HttpClient.client.layer),
)

export type AppRuntime = typeof runtime

export const runtime = pipe(
  Layer.toRuntime(MainLayer),
  F.scoped,
  F.cached,
  F.flatten,
  F.runSync,
)
