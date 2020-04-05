const getSize = (breakpoints, bp, type) => {
  const size = Object.keys(breakpoints[type]).find(k => k === bp)

  if (!size) {
    throw new Error(`Invalid ${type} breakpoint: ${bp}`)
  }

  return breakpoints[type][size]
}

/**
 * Responsive layout utilities
 * @type {Object}
 */
export class Media {
  /**
   * Constructor
   * @param {Object} def Breakpoint config.
   */
  constructor (def) {
    this.breakpoints = def
  }

  /**
   * Generate media query.
   * @param  {Object} m Parameters
   * @return {String}
   * @name media.when
   */
  when (m) {
    if (!this.breakpoints) {
      throw new Error('Breakpoints not yet set')
    }

    const vals = Object.entries(m).map(([ k, v ]) => {
      let type

      if (k.endsWith('W')) {
        type = 'width'
      } else if (k.endsWith('H')) {
        type = 'height'
      } else {
        throw new Error(`Bad suffix: ${k}`)
      }

      return `${k.substr(0, 3)}-${type}: ${getSize(this.breakpoints, v, type)}`
    })

    return `@media (${vals.join(') and (')})`
  }
}
