let log
const logs = []
const columns = [
  'iteration',
  'collectionName',
  'requestName',
  'method',
  'url',
  'status',
  'code',
  'responseTime',
  'responseSize',
  'executed',
  'failed',
  'skipped'
]

const CSV = {
  stringify: (str) => {
    return `"${str.replace(/"/g, '""')}"`
  }
}

/**
 * Reporter that outputs basic logs to CSV (default: newman-run-report.csv).
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @returns {*}
 */
module.exports = function CustomNewmanReporter(newman, options) {
  newman.on('beforeItem', (err, e) => {
    if (err) return

    log = {}
  })

  newman.on('beforeRequest', (err, e) => {
    if (err) return
    const { cursor, item, request } = e

    Object.assign(log, {
      collectionName: newman.summary.collection.name,
      iteration: cursor.iteration + 1,
      requestName: item.name,
      method: request.method,
      url: request.url.toString()
    })
  })

  newman.on('request', (err, e) => {
    if (err) return
    const { status, code, responseTime, responseSize } = e.response
    Object.assign(log, { status, code, responseTime, responseSize })
  })

  newman.on('assertion', (err, e) => {
    const { assertion } = e
    const key = err ? 'failed' : e.skipped ? 'skipped' : 'executed'

    log[key] = log[key] || []
    log[key].push(assertion)
  })

  newman.on('item', (err, e) => {
    if (err) return

    logs.push(log)
  })

  newman.on('beforeDone', (err, e) => {
    if (err) return

console.log(getResults());
  })
}

function getResults () {
  const results = logs.map((log) => {
    let row = []

    Object.keys(log).forEach((key) => {
      const val = log[key]
      const index = columns.indexOf(key)
      const rowValue = Array.isArray(val)
        ? val.join(', ')
        : String(val)

      row[index] = CSV.stringify(rowValue)
    })

    return row.join('|')
  })

  return results.join('\n')
}
