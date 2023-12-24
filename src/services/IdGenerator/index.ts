import { Context, Effect, F } from 'fp'
import { Id } from 'src/utils/datatypes/Entity'

export type IdGenerator = {
  generate: Effect<never, never, Id>
}

export const IdGeneratorEnv = Context.Tag<IdGenerator>('IdGenerator')

export const IdGenerator = {
  generate: F.flatMap(IdGeneratorEnv, env => env.generate),
}
