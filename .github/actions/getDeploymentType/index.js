const version = require('../../../package.json').version
const core = require('@actions/core')

try {
  if (typeof version !== 'string') throw new Error('Invalid version')

  /**
   * @param {string} version
   */
  const getIsPatch = version => {
    const parts = version.split('.')
    return (
      parts.length === 3 && parts.every(p => p.match(/\d+/)) && parts[2] !== '0'
    )
  }

  const isPatch = getIsPatch(version)
  console.log(isPatch)
  core.setOutput('isUpdate', isPatch)
} catch (error) {
  core.setFailed(error.message)
}
