import { Match, pipe, Runtime } from 'fp'
import React from 'react'
import { TextInput as RNTextInput_ } from 'react-native-gesture-handler'
import { TextInputProps as TextInputProps_ } from 'react-native/types'
import {
  BorderWidthProps,
  FlexChildProps,
  MarginProps,
  PaddingProps,
  RoundProps,
  UIColor,
  UIElement,
} from 'src/components/types'
import { useRuntime } from 'src/contexts/Runtime'
import { useThemeGetRawColor } from 'src/contexts/Theme'
import { AppEvent } from 'src/modules/core/events'
import { named } from '../hyperscript'
import { FontWeight } from './Txt'

export type TextInputStyleProps = PaddingProps &
  MarginProps &
  BorderWidthProps &
  RoundProps &
  FlexChildProps & {
    w?: number
    h?: number
    bg?: UIColor
    borderColor?: UIColor
    fontColor?: UIColor
    fontSize?: number
    fontWeight?: FontWeight
    align?: 'left' | 'right' | 'center'
    isEnabled?: boolean
  }

export type TextInputProps = TextInputStyleProps & {
  ref?: React.RefObject<RNTextInput_>
  value: string
  onChange: (value: string) => AppEvent
  onFocus?: AppEvent
  onBlur?: AppEvent
  onSubmit?: AppEvent
  keyboardType?: 'numeric' | 'email-address' | 'url'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoComplete?: TextInputProps_['autoComplete']
  secureTextEntry?: boolean
  autoFocus?: boolean
  showSoftInputOnFocus?: 'never' | 'always' | 'whenFocused'
  selectTextOnFocus?: boolean
  blurOnSubmit?: boolean
  align?: 'left' | 'center' | 'right' | 'justify' | 'auto'
  placeholder?: string
  placeholderTextColor?: UIColor
  cursorColor?: UIColor
  focused?: {
    bg?: UIColor
    borderColor?: UIColor
  }
}

export const TextInput = named('TextInput')((
  props: TextInputProps,
): UIElement => {
  const runtime = useRuntime()
  const getRawColor = useThemeGetRawColor()
  const [isFocused, setIsFocused] = React.useState(false)
  return React.createElement(RNTextInput_, {
    ref: props.ref,
    value: props.value,
    onChangeText: t => void Runtime.runSync(runtime)(props.onChange(t)),
    onFocus: () => {
      // eslint-disable-next-line functional/no-expression-statements
      setIsFocused(true)
      // eslint-disable-next-line functional/no-expression-statements
      props.onFocus
        ? void Runtime.runPromise(runtime)(props.onFocus)
        : undefined
    },
    onBlur: () => {
      // eslint-disable-next-line functional/no-expression-statements
      setIsFocused(false)
      // eslint-disable-next-line functional/no-expression-statements
      props.onBlur ? void Runtime.runPromise(runtime)(props.onBlur) : undefined
    },
    onSubmitEditing: props.onSubmit
      ? () => props.onSubmit && Runtime.runPromise(runtime)(props.onSubmit)
      : undefined,
    editable: props.isEnabled,
    textAlign: props.align,
    keyboardType: props.keyboardType,
    autoCapitalize: props.autoCapitalize,
    autoComplete: props.autoComplete,
    secureTextEntry: props.secureTextEntry,
    autoFocus: props.autoFocus,
    showSoftInputOnFocus:
      props.showSoftInputOnFocus &&
      pipe(
        props.showSoftInputOnFocus,
        Match.valueString({
          always: () => true,
          never: () => false,
          whenFocused: () => isFocused,
        }),
      ),
    selectTextOnFocus: props.selectTextOnFocus,
    blurOnSubmit: props.blurOnSubmit,
    placeholder: props.placeholder,
    placeholderTextColor: props.placeholderTextColor
      ? getRawColor(props.placeholderTextColor)
      : undefined,
    cursorColor: props.cursorColor ? getRawColor(props.cursorColor) : undefined,
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
      borderWidth: props?.borderWidth,
      borderLeftWidth: props?.borderWidthL ?? props?.borderWidthX,
      borderRightWidth: props?.borderWidthR ?? props?.borderWidthX,
      borderTopWidth: props?.borderWidthT ?? props?.borderWidthY,
      borderBottomWidth: props?.borderWidthB ?? props?.borderWidthY,
      borderRadius: props?.round,
      borderTopLeftRadius: props?.roundTL ?? props?.roundT ?? props?.roundL,
      borderTopRightRadius: props?.roundTR ?? props?.roundT ?? props?.roundR,
      borderBottomLeftRadius: props?.roundBL ?? props?.roundB ?? props?.roundL,
      borderBottomRightRadius: props?.roundBR ?? props?.roundB ?? props?.roundR,
      width: props?.w,
      height: props?.h,
      flex: props?.flex,
      flexGrow: props?.flexGrow,
      flexShrink: props?.flexShrink,
      fontSize: props.fontSize,
      fontWeight: pipe(props?.fontWeight, w =>
        w ? (`${w}00` as const) : undefined,
      ),
      color: props.fontColor ? getRawColor(props.fontColor) : undefined,
      backgroundColor: pipe(
        (isFocused && props.focused?.bg) || props.bg,
        c => c && getRawColor(c),
      ),
      borderColor: pipe(
        (isFocused && props.focused?.borderColor) || props.borderColor,
        c => c && getRawColor(c),
      ),
      textAlign: props.align,
      alignSelf:
        props?.alignSelf === 'start'
          ? 'flex-start'
          : props?.alignSelf === 'end'
            ? 'flex-end'
            : props?.alignSelf,
    },
  })
})
