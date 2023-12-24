const version = require('../package.json').version

if (typeof version !== 'string') throw new Error('Invalid version')

const getIsPatch = (version: string) => {
  const parts = version.split('.')
  return (
    parts.length === 3 && parts.every(p => p.match(/\d+/)) && parts[2] !== '0'
  )
}

const isPatch = getIsPatch(version)

console.log(isPatch)
