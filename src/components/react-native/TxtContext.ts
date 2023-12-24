import React from 'react'
import { Text as RNText_ } from 'react-native'
import {
  Children,
  JSXElementsChildren,
  UIColor,
  UIElement,
} from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'
import { TextStyleUpdater } from 'src/contexts/TextStyle'
import { useThemeGetRawColor } from 'src/contexts/Theme'
import { named2 } from '../hyperscript'
import { TextProps } from './Txt'

export type TxtContextArgs = {
  x?: TextProps
  children?: JSXElementsChildren
  getRawColor: (color: UIColor) => string
}

const getRawProps = ({
  x: props,
  children,
  getRawColor,
}: TxtContextArgs): React.ComponentProps<typeof RNText_> => ({
  children: children,
  numberOfLines: props?.numberOfLines,
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
    flex: props?.flex,
    color: props?.color ? getRawColor(props.color) : undefined,
    textAlign: props?.align ?? 'center',
    fontSize: props?.size,
    fontWeight: props?.weight ? `${props.weight}00` : undefined,
    lineHeight: props?.lineHeight,
  },
})

const TxtContext_ = (args: TxtContextArgs) =>
  React.createElement(RNText_, getRawProps(args))

export const TxtContext = named2('TxtContext')((props: TextProps = {}) =>
  // eslint-disable-next-line react/display-name
  (children: Children): UIElement => {
    const getRawColor = useThemeGetRawColor()
    const element = React.createElement(
      TxtContext_,
      { x: props, getRawColor },
      ...childrenFromInput(children),
    )
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return props.color ?? props.weight ?? 1 ?? props.size
      ? TextStyleUpdater(_ => ({
          ..._,
          color: props.color ?? _.color,
          size: props.size ?? _.size,
          weight: props.weight ?? _.weight,
        }))([element])
      : element
  },
)
