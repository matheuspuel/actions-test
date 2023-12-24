import { Runtime, constant, pipe } from 'fp'
import React from 'react'
import { FlatList as RNFlatList_ } from 'react-native'
import {
  FlexContainerProps,
  GapProps,
  PaddingProps,
  UIElementInput,
} from 'src/components/types'
import { useRuntime } from 'src/contexts/Runtime'
import { AppEvent } from 'src/modules/core/events'
import { AppRuntime } from 'src/runtime'
import { named } from '../hyperscript'
import { elementFromInput } from '../utils'

export type FlatListContainerStyleProps = PaddingProps &
  GapProps & {
    flex?: number
    flexGrow?: number
    flexShrink?: number
    justify?: FlexContainerProps['justify']
    align?: FlexContainerProps['align']
  }

export type FlatListProps<A> = {
  data: ReadonlyArray<A>
  renderItem: (item: A, index: number) => UIElementInput
  Empty: UIElementInput
  Footer?: UIElementInput
  Separator?: UIElementInput
  keyExtractor?: (item: A, index: number) => string
  getItemLayout?: (
    data: Array<A>,
    index: number,
  ) => {
    length: number
    offset: number
    index: number
  }
  onRefresh?: AppEvent
  onEndReached?: AppEvent
  refreshing?: boolean
  onEndReachedThreshold?: number
  numColumns?: number
  direction?: 'row' | 'column'
  showsScrollIndicator?: boolean
  removeClippedSubviews?: boolean
  initialNumToRender?: number
  maxToRenderPerBatch?: number
  updateCellsBatchingPeriod?: number
  windowSize?: number
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
  content?: FlatListContainerStyleProps
}

export type FlatListArgs<A> = {
  x: FlatListProps<A>
  runtime: AppRuntime
}

const getRawProps = <A>({
  x: props,
  runtime,
}: FlatListArgs<A>): React.ComponentProps<typeof RNFlatList_<A>> => ({
  data: props.data,
  renderItem: ({ item, index }) =>
    elementFromInput(props.renderItem(item, index)),
  ListEmptyComponent: elementFromInput(props.Empty),
  ListFooterComponent: elementFromInput(props.Footer ?? false),
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  ItemSeparatorComponent: props.Separator
    ? constant(elementFromInput(props.Separator))
    : undefined,
  keyExtractor: props.keyExtractor,
  getItemLayout: pipe(props.getItemLayout, f =>
    f ? (data, index) => f(data ? (data as Array<A>) : [], index) : undefined,
  ),
  onRefresh: props.onRefresh
    ? () => props.onRefresh && Runtime.runPromise(runtime)(props.onRefresh)
    : undefined,
  onEndReached: props.onEndReached
    ? () =>
        props.onEndReached && Runtime.runPromise(runtime)(props.onEndReached)
    : undefined,
  refreshing: props.refreshing,
  onEndReachedThreshold: props.onEndReachedThreshold,
  numColumns: props.numColumns,
  horizontal: props.direction === 'row',
  showsVerticalScrollIndicator: props.showsScrollIndicator,
  showsHorizontalScrollIndicator: props.showsScrollIndicator,
  removeClippedSubviews: props.removeClippedSubviews,
  initialNumToRender: props.initialNumToRender,
  maxToRenderPerBatch: props.maxToRenderPerBatch,
  updateCellsBatchingPeriod: props.updateCellsBatchingPeriod,
  windowSize: props.windowSize,
  keyboardShouldPersistTaps: props.keyboardShouldPersistTaps,
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
    flexShrink: props.content?.flexShrink,
    justifyContent:
      props.content?.justify === 'start'
        ? 'flex-start'
        : props.content?.justify === 'end'
          ? 'flex-end'
          : props.content?.justify,
    alignItems:
      props.content?.align === 'start'
        ? 'flex-start'
        : props.content?.align === 'end'
          ? 'flex-end'
          : props.content?.align,
  },
})

const FlatList_ = <A>(args: FlatListArgs<A>) =>
  React.createElement(RNFlatList_<A>, getRawProps(args))

export const FlatList = named('FlatList')(<A>(props: FlatListProps<A>) => {
  const runtime = useRuntime()
  return React.createElement(FlatList_<A>, { x: props, runtime })
})
