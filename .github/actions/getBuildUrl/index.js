const version = require('../../../package.json').version
const core = require('@actions/core')

try {
  if (typeof version !== 'string') throw new Error('Version should be a string')

  const buildListJson = core.getInput('buildListJson')
  const buildList = JSON.stringify(buildListJson)

  console.log('Version:', version)

  /**
   * @param {unknown[]} buildList
   */
  const getBuildUrl = buildList => {
    return buildList.find(b => b.status === 'FINISHED')?.artifacts?.buildUrl
  }

  const buildUrl = getBuildUrl(buildList)
  if (buildUrl === undefined) throw new Error('Build not found')
  console.log('Build URL:', buildUrl)
  core.setOutput('buildUrl', buildUrl)
} catch (error) {
  core.setFailed(error.message)
}
