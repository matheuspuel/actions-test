import { named2 } from 'src/components/hyperscript'
import { Children } from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'
import { View } from '../react-native/View'
import { FormError } from './FormError'
import { Label } from './Label'

export const FormField = named2('FormField')(
  (props: {
    key?: string
    title: string
    errors?: Array<string>
    flex?: number
  }) =>
    (children: Children) =>
      View({ key: props.key, gap: 4, flex: props.flex })([
        Label()(props.title),
        ...childrenFromInput(children),
        ...(props.errors?.map(FormError) ?? []),
      ]),
)
