import { A, O, Option } from 'fp'
import * as React from 'react'
import { Children, UIElement, UIElementInput } from './types'

export type ChildrenInput = ReadonlyArray<UIElement | Option<UIElement> | false>

const Nothing = React.createElement(React.Fragment)

export const elementFromInput = (elementInput: UIElementInput) =>
  elementInput === false
    ? Nothing
    : O.isOption(elementInput)
      ? O.getOrElse(elementInput, () => Nothing)
      : elementInput

export const childrenFromInput = (
  childrenInput: Children,
): ReadonlyArray<UIElement> =>
  A.filterMap(childrenInput, c =>
    c === false ? O.none() : O.isOption(c) ? c : O.some(c),
  )
