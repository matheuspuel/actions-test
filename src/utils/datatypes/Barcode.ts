import { S } from 'fp'
import { NonEmptyString } from './NonEmptyString'

export type Barcode = S.Schema.To<typeof Barcode_>
const Barcode_ = S.string.pipe(
  S.trim,
  S.compose(NonEmptyString),
  S.pattern(/\d*/),
  S.description('Barcode'),
  S.brand('Barcode'),
)
export const Barcode: S.BrandSchema<
  S.Schema.From<typeof Barcode_>,
  Barcode
> = Barcode_
