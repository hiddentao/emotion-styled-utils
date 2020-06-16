import { Media } from './breakpoints'
import { font } from './fonts'

export class Themes {
  /**
   * Constructor
   * @param  {Object} def Default theme definition.
   */
  constructor (def, breakpoints) {
    this.themes = {
      default: def
    }
    this.media = new Media(breakpoints)
  }

  /**
   * Add a theme.
   * @param  {String} name Theme name.
   * @param  {Object} def Theme definition.
   */
  add (name, def) {
    this.themes[name] = def
  }

  /**
   * Get a theme.
   * @param  {String} name Theme name.
   * @return {Object} Theme definition (or default theme definition it not found)
   */
  get (name) {
    return {
      ...(this.themes[name] || this.themes.default),
      media: this.media,
      font,
    }
  }

  /**
   * Get names of themes.
   * @return {Array}
   */
  getNames () {
    return Object.keys(this.themes)
  }
}

