const version = require('../../../package.json').version
const core = require('@actions/core')
const { execSync } = require('child_process')

try {
  if (typeof version !== 'string') throw new Error('Version should be a string')

  const platform = core.getInput('platform')
  const profile = core.getInput('profile')

  console.log('Version:', version)

  /**
   * @param {string} platform
   * @param {profile} profile
   */
  const getBuildUrl = (platform, profile) => {
    const command = `eas build:list --non-interactive --json --buildProfile ${profile} --platform ${platform}`
    const buildListJson = execSync(command).toString()
    const buildList = JSON.parse(buildListJson)
    return buildList.find(b => b.status === 'FINISHED')?.artifacts?.buildUrl
  }

  const buildUrl = getBuildUrl(platform, profile)
  if (buildUrl === undefined) throw new Error('Build not found')
  console.log('Build URL:', buildUrl)
  core.setOutput('buildUrl', buildUrl)
} catch (error) {
  core.setFailed(error.message)
}
