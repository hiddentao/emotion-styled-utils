import ColorLib from 'color'

/**
 * Set alpha value of given colour.
 *
 * @param  {String|Color} c Color
 * @param  {Number} a Alpha value between 0 and 1
 * @return {String}   New colour
 */
export const opacify = (c, a) => ColorLib(c).alpha(a).toString()

export const Color = ColorLib
