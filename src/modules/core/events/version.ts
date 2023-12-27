import packageJSON from 'src/../package.json'
import { PositiveIntOrZero } from 'src/utils/datatypes'
import { Number, Ord, S, pipe } from 'src/utils/fp'

const getLastVersion = () =>
  fetch(
    'https://api.github.com/repos/matheuspuel/actions-test/releases/latest',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        // Authorization: 'Bearer <YOUR-TOKEN>',
      },
    },
  )
    .then(r => r.json())
    .then(v => S.parseSync(S.struct({ name: S.string.pipe(S.nonEmpty()) }))(v))
    .then(v => v.name)

type VersionParts = S.Schema.To<typeof VersionParts>
const VersionParts = pipe(
  S.split('.')(S.nonEmpty()(S.string)),
  S.compose(
    S.tuple(
      S.fromNumberString(PositiveIntOrZero),
      S.fromNumberString(PositiveIntOrZero),
      S.fromNumberString(PositiveIntOrZero),
    ),
    { strict: false },
  ),
)

const VersionOrder = Ord.combineAll<VersionParts>([
  Ord.mapInput(Number.Order, v => v[0]),
  Ord.mapInput(Number.Order, v => v[1]),
  Ord.mapInput(Number.Order, v => v[2]),
])

export const getAvailableUpdateForDownload = () =>
  getLastVersion().then(v =>
    Ord.greaterThan(VersionOrder)(
      S.decodeSync(VersionParts)(v.substring(1)),
      S.decodeSync(VersionParts)(packageJSON.version),
    )
      ? { version: v }
      : null,
  )
