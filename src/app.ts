import { Effect, F, pipe } from 'fp'
import { UI } from 'src/services/UI'

export type AppEnv = Effect.Context<typeof startApp>

export const startApp = pipe(
  F.unit,
  F.tap(() => UI.start),
  F.tap(() => F.logDebug('finished startApp')),
)
