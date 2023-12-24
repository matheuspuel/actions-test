import Icons_ from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { TextStyleContext, useTextStyle } from 'src/contexts/TextStyle'
import { useThemeGetRawColor } from 'src/contexts/Theme'
import { named } from '../hyperscript'
import { UIColor } from '../types'

export type IconProps = {
  name: React.ComponentProps<typeof Icons_>['name']
  color?: UIColor
  size: number
  align?: 'left' | 'right' | 'center'
}

export type IconArgs = {
  x: IconProps
  textStyle: TextStyleContext
  getRawColor: (color: UIColor) => string
}

const getRawProps = ({
  x: props,
  textStyle,
  getRawColor,
}: IconArgs): React.ComponentProps<typeof Icons_> => ({
  name: props.name,
  size: props.size,
  color: getRawColor(props.color ?? textStyle.color),
  style: { textAlign: props.align },
})

const MaterialCommunityIcons_ = (args: IconArgs) =>
  React.createElement(Icons_, getRawProps(args))

export const MaterialCommunityIcons = named('MaterialCommunityIcons')((
  props: IconProps,
) => {
  const textStyle = useTextStyle()
  const getRawColor = useThemeGetRawColor()
  return React.createElement(MaterialCommunityIcons_, {
    x: props,
    textStyle,
    getRawColor,
  })
})
