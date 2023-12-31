import { ExpoConfig } from '@expo/config-types'
import packageJSON from './package.json'

const background = '#292929'

const getConfig = (): ExpoConfig => ({
  name:
    'Actions ' +
    matchEnv({
      production: '',
      staging: ' (staging)',
      preview: ' (preview)',
      development: ' (dev)',
    }),
  slug: 'actions',
  owner: 'matheuspuel',
  version: packageJSON.version,
  runtimeVersion: versionWithZeroPatch(packageJSON.version),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: background,
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: background,
  },
  backgroundColor: background,
  updates: {
    fallbackToCacheTimeout: 2000,
    url: 'https://u.expo.dev/a070db67-faf9-4b1b-952c-829bd3fe53c7',
  },
  assetBundlePatterns: ['**/*'],
  packagerOpts: { config: 'metro.config.js' },
  ios: {
    supportsTablet: true,
    bundleIdentifier:
      'dev.matheuspuel.actions' +
      matchEnv({
        production: '',
        staging: '.staging',
        preview: '.preview',
        development: '.development',
      }),
  },
  android: {
    package:
      'dev.matheuspuel.actions' +
      matchEnv({
        production: '',
        staging: '.staging',
        preview: '.preview',
        development: '.development',
      }),
    adaptiveIcon: {
      backgroundColor: background,
      foregroundImage:
        './assets/adaptive-icon' +
        matchEnv({
          production: '',
          staging: '-staging',
          preview: '-preview',
          development: '-dev',
        }) +
        '.png',
    },
  },
  web: { favicon: './assets/favicon.png' },
  extra: {
    envName,
    eas: { projectId: 'a070db67-faf9-4b1b-952c-829bd3fe53c7' },
  },
})

// Helpers

const fatal = (reason: string): never => {
  // eslint-disable-next-line functional/no-throw-statements
  throw new Error(reason)
}

const versionWithZeroPatch = (version: string) => {
  const parts = version.split('.')
  return parts.length === 3 && parts.every(p => p.match(/\d+/))
    ? `${parts[0]}.${parts[1]}.0`
    : fatal('invalid version string')
}

const APP_VARIANT = process.env.APP_VARIANT

const envName =
  APP_VARIANT === 'production'
    ? APP_VARIANT
    : APP_VARIANT === 'staging'
      ? APP_VARIANT
      : APP_VARIANT === 'preview'
        ? APP_VARIANT
        : APP_VARIANT === 'development'
          ? APP_VARIANT
          : APP_VARIANT === ''
            ? 'development'
            : APP_VARIANT === undefined
              ? 'development'
              : fatal('Unknown app environment: ' + APP_VARIANT)

const matchEnv = <D, PW, S, P>(cases: {
  development: D
  preview: PW
  staging: S
  production: P
}) => cases[envName]

export default getConfig()
