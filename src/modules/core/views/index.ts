import * as React from 'react'
import { Linking } from 'react-native'
import Package from 'src/../package.json'
import {
  GestureHandlerRootView,
  Row,
  SolidButton,
  Txt,
  View,
} from 'src/components'
import { named, namedConst } from 'src/components/hyperscript'
import { useState } from 'src/hooks/useState'
import { Colors } from 'src/services/Theme'
import { F } from 'src/utils/fp'
import { AppEvent } from '../events'
import { getAvailableUpdateForDownload } from '../events/version'

export const UIRoot = named('UIRoot')(() => {
  const updateAvailable = useState<{ version: string } | null>(() => null)
  // eslint-disable-next-line functional/no-expression-statements
  void React.useEffect(() => {
    // eslint-disable-next-line functional/no-expression-statements
    void getAvailableUpdateForDownload().then(
      r => r !== null && updateAvailable.set(r).pipe(F.runSync),
    )
  }, [])
  return GestureHandlerRootView([
    updateAvailable.value === null
      ? VersionScreen
      : UpdateScreen({
          version: updateAvailable.value.version,
          onClose: updateAvailable.set(null),
        }),
  ])
})

const VersionScreen = namedConst('Version')(() =>
  View({ p: 50, pt: 300 })([Txt({ size: 24 })(`Version: ${Package.version}`)]),
)

const UpdateScreen = named('Update')(
  (props: { version: string; onClose: AppEvent }) =>
    View({ p: 50, pt: 300, gap: 16 })([
      Txt({ size: 24 })(`New version available: ${props.version}`),
      Txt({ size: 24 })(`Install it to keep your app up to date`),
      Row({ gap: 8 })([
        SolidButton({ onPress: props.onClose, flex: 1, color: Colors.error })([
          Txt()('Postpone'),
        ]),
        SolidButton({
          onPress: F.all([
            props.onClose,
            F.tryPromise(() =>
              Linking.openURL(
                'https://github.com/matheuspuel/actions-test/releases/latest/download/application-android.apk',
              ),
            ).pipe(F.ignore),
          ]),
          flex: 1,
          color: Colors.success,
        })([Txt()('Download')]),
      ]),
    ]),
)
