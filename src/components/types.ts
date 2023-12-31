import { Effect } from 'effect/Effect'
import { Option } from 'fp'
import React from 'react'
import { AppTheme } from 'src/services/Theme'
import { Color } from 'src/utils/datatypes'

export type Element = React.ReactElement

export type JSXElementsChildren = Element | ReadonlyArray<Element>

type Axis = 'x' | 'y'

type DirectionX = 'l' | 'r'

type DirectionY = 't' | 'b'

type Direction = DirectionX | DirectionY

type Spacing = number

type LineWidth = number

export type PaddingProps = {
  [k in `p${'' | Direction | Axis}`]?: Spacing
}

export type MarginProps = {
  [k in `m${'' | Direction | Axis}`]?: Spacing
}

export type BorderWidthProps = {
  [k in `borderWidth${Uppercase<'' | Direction | Axis>}`]?: LineWidth
}

export type RoundProps = {
  [k in `round${
    | ''
    | `${Uppercase<DirectionY>}${Uppercase<DirectionX>}`}`]?: number
} & (
  | ({
      [k in `round${Uppercase<DirectionX>}`]?: number
    } & {
      [k in `round${Uppercase<DirectionY>}`]?: never
    })
  | ({
      [k in `round${Uppercase<DirectionX>}`]?: never
    } & {
      [k in `round${Uppercase<DirectionY>}`]?: number
    })
)

export type GapProps = {
  [k in `gap${Uppercase<'' | Axis>}`]?: Spacing
}

export type FlexContainerProps = {
  direction?: 'row' | 'column'
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'start' | 'end' | 'center' | 'stretch'
}

export type FlexChildProps = {
  alignSelf?: 'start' | 'end' | 'center' | 'stretch'
  flex?: number
  flexGrow?: number
  flexShrink?: number
}

export type AbsolutePositionProps = {
  absolute?:
    | false
    | { left?: number; right?: number; top?: number; bottom?: number }
}

export type UIElement = Element

export type UIElementInput = UIElement | Option<UIElement> | false

export type Children = ReadonlyArray<UIElementInput>

export type UIColor = Effect<AppTheme, never, Color>
