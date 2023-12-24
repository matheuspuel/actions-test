import React from 'react'
import { ScrollView as RNScrollView_ } from 'react-native'
import {
  Children,
  GapProps,
  JSXElementsChildren,
  PaddingProps,
} from 'src/components/types'
import { childrenFromInput } from 'src/components/utils'

export type ScrollViewStyleProps = object

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ScrollViewContainerStyleProps = PaddingProps &
  GapProps & { flex?: number; flexGrow?: number }

export type ScrollViewProps = ScrollViewStyleProps & {
  removeClippedSubviews?: boolean
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
  content?: ScrollViewContainerStyleProps
}

export type ScrollViewArgs = {
  x: ScrollViewProps
  children?: JSXElementsChildren
}

const getRawProps = ({
  x: props,
  children,
}: ScrollViewArgs): React.ComponentProps<typeof RNScrollView_> => ({
  children: children,
  removeClippedSubviews: props.removeClippedSubviews,
  keyboardShouldPersistTaps: props.keyboardShouldPersistTaps ?? 'handled',
  contentContainerStyle: {
    padding: props.content?.p,
    paddingHorizontal: props.content?.px,
    paddingVertical: props.content?.py,
    paddingLeft: props.content?.pl,
    paddingRight: props.content?.pr,
    paddingTop: props.content?.pt,
    paddingBottom: props.content?.pb,
    gap: props.content?.gap,
    rowGap: props.content?.gapX,
    columnGap: props.content?.gapY,
    flex: props.content?.flex,
    flexGrow: props.content?.flexGrow ?? 1,
  },
})

const ScrollView_ = (args: ScrollViewArgs) =>
  React.createElement(RNScrollView_, getRawProps(args))

export const ScrollView =
  (props: ScrollViewProps = {}) =>
  // eslint-disable-next-line react/display-name
  (children: Children) =>
    React.createElement(
      ScrollView_,
      { x: props },
      ...childrenFromInput(children),
    )
