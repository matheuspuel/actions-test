/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { String, identity, pipe } from 'effect'
import React from 'react'
import { Text as RawText } from 'react-native'
import {
  FlexChildProps,
  MarginProps,
  PaddingProps,
  UIColor,
  UIElement,
} from 'src/components/types'
import { TextStyleContext, useTextStyle } from 'src/contexts/TextStyle'
import { useThemeGetRawColor } from 'src/contexts/Theme'
import { named2 } from '../hyperscript'

export type FontWeight = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TextStyleProps = PaddingProps &
  MarginProps &
  FlexChildProps & {
    flex?: number
    color?: UIColor
    align?: 'left' | 'center' | 'right' | 'justify'
    size?: number
    lineHeight?: number
    decoration?: { underline?: boolean; lineThrough?: boolean }
    includeFontPadding?: boolean
    weight?: FontWeight
    numberOfLines?: number
    ellipsizeMode?: 'head' | 'clip' | 'middle' | 'tail'
    w?: number
    h?: number
    aspectRatio?: number
  }

export type TextProps = TextStyleProps

const getRawProps = ({
  props,
  textStyle,
  getRawColor,
}: {
  props?: TextProps
  textStyle: TextStyleContext
  getRawColor: (color: UIColor) => string
}): React.ComponentProps<typeof RawText> => ({
  numberOfLines: props?.numberOfLines,
  ellipsizeMode: props?.ellipsizeMode,
  style: {
    padding: props?.p,
    paddingHorizontal: props?.px,
    paddingVertical: props?.py,
    paddingLeft: props?.pl,
    paddingRight: props?.pr,
    paddingTop: props?.pt,
    paddingBottom: props?.pb,
    margin: props?.m,
    marginHorizontal: props?.mx,
    marginVertical: props?.my,
    marginLeft: props?.ml,
    marginRight: props?.mr,
    marginTop: props?.mt,
    marginBottom: props?.mb,
    width: props?.w,
    height: props?.h,
    aspectRatio: props?.aspectRatio,
    flex: props?.flex,
    flexGrow: props?.flexGrow,
    flexShrink: props?.flexShrink,
    alignSelf:
      props?.alignSelf === 'start'
        ? 'flex-start'
        : props?.alignSelf === 'end'
          ? 'flex-end'
          : props?.alignSelf,
    color: getRawColor(props?.color ?? textStyle.color),
    textAlign: props?.align ?? 'center',
    fontSize: props?.size ?? textStyle.size,
    fontWeight: pipe(props?.weight ?? textStyle.weight, w =>
      w ? (`${w}00` as const) : undefined,
    ),
    lineHeight: props?.lineHeight,
    includeFontPadding: props?.includeFontPadding,
    textDecorationLine:
      props?.decoration?.underline && props.decoration.lineThrough
        ? 'underline line-through'
        : props?.decoration?.underline
          ? 'underline'
          : props?.decoration?.lineThrough
            ? 'line-through'
            : 'none',
  },
})

export const Txt = named2('Txt')((props?: TextProps) =>
  // eslint-disable-next-line react/display-name
  (children: string): UIElement => {
    const textStyle = useTextStyle()
    const getRawColor = useThemeGetRawColor()
    return React.createElement(
      RawText,
      getRawProps({ props, textStyle, getRawColor }),
      children === undefined
        ? undefined
        : pipe(
            children,
            textStyle.case === 'uppercase' ? String.toUpperCase : identity,
          ),
    )
  },
)
