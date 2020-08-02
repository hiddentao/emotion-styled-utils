import FontFaceObserver from 'fontfaceobserver'

const DEFAULT_FONT = {
  name: 'Arial',
  weights: {
    thin: 100,
    regular: 400,
    bold: 700,
  },
  styles: {
    normal: 'normal',
  }
}

const userFonts = {}

/**
 * Set fonts.
 *
 * Use this instead of `loadFonts()` when you want to load the fonts yourself.
 *
 * @param  {FontsConfig} cfg Configuration.
 */
export const setFonts = (cfg) => {
  Object.keys(cfg).forEach(id => {
    userFonts[id] = cfg[id]
    const { name } = cfg[id]
    console.log(`Setting font: ${name} as ${id}`)
  })
}


/**
 * Load fonts.
 *
 * @param  {FontsConfig} cfg Configuration.
 * @param  {Document} doc The `window.document` object.
 * @return {Promise}
 */
export const loadFonts = (cfg, doc) => {
  const ret = Promise.all(Object.keys(cfg).map(id => {
    userFonts[id] = cfg[id]

    const { name } = cfg[id]

    console.log(`Loading font ${name} as ${id}`)

    const obs = new FontFaceObserver(name)

    return obs.load().then(() => {
      console.log(`Font loaded: ${name}`)
    }, err => {
      console.warn(`Error observing loading of font ${name}: ${err.message}`)
    })
  }))

  if (doc) {
    const l = doc.createElement('link')
    const fw = Object.values(cfg).reduce((m, v) => {
      const vw = Object.values(v.weights)
      const vwi = vw.map(vwv => `${vwv}i`)
      m.push(
        `${encodeURIComponent(v.name)}:${vw.join(',')},${vwi.join(',')}`
      )
      return m
    }, [])
    l.href = `https://fonts.googleapis.com/css?family=${fw.join('|')}`
    l.rel = 'stylesheet'
    doc.head.appendChild(l)
  }

  return ret
}

export const font = (id, weight = 'regular', style = 'normal') => {
  const f = userFonts[id] || DEFAULT_FONT

  return `
    font-family: '${f.name}', Arial, sans-serif;
    font-weight: ${f.weights[weight]};
    font-style: ${style};
  `
}

/**
 * @typedef {Object} FontWeights
 * @property {Number} [thin] Thin weight.
 * @property {Number} [regular] Regular weight.
 * @property {Number} [bold] Bold weight.
 */

/**
 * @typedef {Object} FontConfig
 * @property {String} name Font name
 * @property {FontWeights} weights Font weights
 */

/**
 * @typedef {Object} FontsConfig
 * @property {FontConfig} body
 * @property {FontConfig} header
*/
