let breakpoints

const getSize = (bp, type) => {
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
export const media = {
  /**
   * Maximum content width as a CSS dimension.
   *
   * @type {String}
   * @name media.maxWidth
   */
  maxWidth: breakpoints.width.desktop,
  /**
   * Set breakpoints.
   * @param {Object} def Breakpoint config.
   */
  setBreakpoints: def => {
    breakpoints = def
  },
  /**
   * Generate media query.
   * @param  {Object} m Parameters
   * @return {String}
   * @name media.when
   */
  when: m => {
    if (!breakpoints) {
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

      return `${k.substr(0, 3)}-${type}: ${getSize(v, type)}`
    })

    return `@media (${vals.join(') and (')})`
  },
}
