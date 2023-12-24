import { LazyArg } from 'effect/Function'
import Constants from 'expo-constants'
import packageJSON from 'src/../package.json'
import { fatal } from './Error'

const envName_: unknown = Constants.expoConfig?.extra?.envName

export const envName =
  envName_ === 'production'
    ? envName_
    : envName_ === 'staging'
      ? envName_
      : envName_ === 'preview'
        ? envName_
        : envName_ === 'development'
          ? envName_
          : fatal('Unknown app environment')

export const matchEnv = <D, PW, S, P>(cases: {
  development: LazyArg<D>
  preview: LazyArg<PW>
  staging: LazyArg<S>
  production: LazyArg<P>
}) => cases[envName]()

export const matchDevelopment = <D, R>(cases: {
  development: LazyArg<D>
  rest: LazyArg<R>
}) =>
  matchEnv({
    development: cases.rest,
    preview: cases.rest,
    staging: cases.rest,
    production: cases.rest,
  })

export const appVersion = packageJSON.version

export const appVersionName =
  'v' +
  appVersion +
  matchEnv({
    production: () => '',
    staging: () => ' (STAGING)',
    preview: () => ' (PREVIEW)',
    development: () => ' (DEV)',
  })
