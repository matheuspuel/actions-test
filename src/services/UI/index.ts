import { Context, Effect, F } from 'fp'

export type UI = {
  start: Effect<never, never, void>
}

export const UIServiceEnv = Context.Tag<UI>('UI')

export const UI = {
  start: F.flatMap(UIServiceEnv, env => env.start),
}
