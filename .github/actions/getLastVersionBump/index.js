const version = require('../../../package.json').version
const core = require('@actions/core')

try {
  if (typeof version !== 'string') throw new Error('Version should be a string')

  console.log('Version:', version)

  /**
   * @param {string} version
   */
  const getLastVersionBump = version => {
    const parts = version.split('.')
    if (!(parts.length === 3 && parts.every(p => p.match(/\d+/))))
      throw new Error('Invalid version')
    return parts[2] !== '0' ? 'patch' : parts[1] !== '0' ? 'minor' : 'major'
  }

  const lastVersionBump = getLastVersionBump(version)
  console.log('Last version bump:', lastVersionBump)
  core.setOutput('lastVersionBump', lastVersionBump)
} catch (error) {
  core.setFailed(error.message)
}
