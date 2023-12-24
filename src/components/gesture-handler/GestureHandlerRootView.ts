import React from 'react'
import { GestureHandlerRootView as GestureHandlerRootView_ } from 'react-native-gesture-handler'
import { Children } from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'

export const GestureHandlerRootView = (children: Children) =>
  React.createElement(
    GestureHandlerRootView_,
    { style: { flex: 1 } },
    ...childrenFromInput(children),
  )
