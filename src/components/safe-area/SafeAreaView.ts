/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as React from 'react'
import { SafeAreaView as RNSACSafeAreaView_ } from 'react-native-safe-area-context'
import { Children, JSXElementsChildren, UIElement } from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'

export type SafeAreaViewProps = {
  flex?: number
  edges: {
    left?: boolean
    right?: boolean
    top?: boolean
    bottom?: boolean
  }
}

export type SafeAreaViewArgs = {
  x: SafeAreaViewProps
  children?: JSXElementsChildren
}

const getRawProps = ({
  x: props,
  children,
}: SafeAreaViewArgs): React.ComponentProps<typeof RNSACSafeAreaView_> & {
  key?: string
} => ({
  children: children,
  edges: [
    ...(props.edges.left ? ['left' as const] : []),
    ...(props.edges.right ? ['right' as const] : []),
    ...(props.edges.top ? ['top' as const] : []),
    ...(props.edges.bottom ? ['bottom' as const] : []),
  ],
  style: { flex: props.flex },
})

const SafeAreaView_ = (args: SafeAreaViewArgs) =>
  React.createElement(RNSACSafeAreaView_, getRawProps(args))

export const SafeAreaView =
  (props: SafeAreaViewProps) =>
  // eslint-disable-next-line react/display-name
  (children: Children): UIElement =>
    React.createElement(
      SafeAreaView_,
      { x: props },
      ...childrenFromInput(children),
    )

//spell-checker:words RNSAC
