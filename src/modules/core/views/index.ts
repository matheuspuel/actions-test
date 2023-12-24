import Package from 'src/../package.json'
import { Txt, View } from 'src/components'
import { named } from 'src/components/hyperscript'

export const UIRoot = named('UIRoot')(() =>
  View({ p: 50, pt: 300 })([Txt({ size: 24 })(`Version: ${Package.version}`)]),
)
