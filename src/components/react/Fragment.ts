import React from 'react'
import { Children, UIElement } from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'

export const Fragment = (children: Children): UIElement =>
  React.createElement(React.Fragment, null, ...childrenFromInput(children))
