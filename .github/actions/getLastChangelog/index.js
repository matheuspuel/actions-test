const core = require('@actions/core')
const fs = require('fs')

try {
  const getLastChangelog = () => {
    const entire = fs.readFileSync('./CHANGELOG.md').toString()
    const rows = entire.split('\n')
    const tail = rows.slice(6, rows.length)
    const endIndex = tail.findIndex(r => r.startsWith('## '))
    return tail
      .slice(0, endIndex === -1 ? tail.length : endIndex)
      .filter(
        r =>
          r !== '' &&
          r !== '### Minor Changes' &&
          r !== '### Patch Changes' &&
          r !== '### Major Changes',
      )
      .join('\n')
  }

  const lastChangelog = getLastChangelog()
  if (lastChangelog === undefined) throw new Error('Build not found')
  console.log('Last changelog:')
  console.log(lastChangelog)
  core.setOutput('lastChangelog', lastChangelog)
} catch (error) {
  core.setFailed(error.message)
}
