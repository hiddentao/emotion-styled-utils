import { font } from './fonts'

const themes = {}


/**
 * Add a theme.
 * @param  {String} name Theme name.
 * @param  {Object} def Theme definition.
 * @return {Object} Theme object.
 */
export const addTheme = (name, def) => {
  themes[name] = def
}


/**
 * Get a theme.
 * @param  {Number} [s] Theme number (default is latest version theme).
 * @return {Object} Theme object.
 */
export const getTheme = (s = themes.length - 1) => {
  if (!themes[s]) {
    s = themes.length - 1
  }

  return {
    ...themes[s],
    font,
  }
}


/**
 * Get names of themes.
 * @return {Array}
 */
export const getThemeNames = () => Object.keys(themes)
