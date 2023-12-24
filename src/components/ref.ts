import * as React from 'react'
import { TextInput } from 'react-native'
import { F } from 'src/utils/fp'

export const focus = (inputRef: React.RefObject<TextInput>) =>
  F.sync(() => inputRef.current?.focus()).pipe(F.delay(1), F.forkDaemon)
