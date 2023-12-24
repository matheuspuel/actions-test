import { createId } from '@paralleldrive/cuid2'
import { F, Layer } from 'fp'
import { Id } from 'src/utils/datatypes/Entity'
import { IdGeneratorEnv } from '.'

export const IdGeneratorLive = Layer.succeedContext(
  IdGeneratorEnv.context({
    generate: F.sync(() => Id(createId())),
  }),
)
