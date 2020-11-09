import { font } from './fonts'

/**
 * Generate flexbox CSS.
 *
 * @param  {Object} p Parameters.
 * @param  {String} [p.direction='column'] flex-direction.
 * @param  {String} [p.justify='center'] justify-content.
 * @param  {String} [p.align='center'] align-items.
 * @param  {String} [p.basis='auto'] flex-basis.
 * @param  {String} [p.wrap='nowrap'] flex-wrap.
 * @return {String}
 */
export const flex = ({ direction = 'column', justify = 'center', align = 'center', basis = 'auto', wrap = 'nowrap' } = {}) => `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  flex: ${basis};
`

/**
 * Generate CSS to fully cover parent.
 * @return {String}
 */
export const absoluteCover = () => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

/**
 * Generate CSS for child anchors.
 * @param {Object} p Parameters
 * @return {String}
 */
export const childAnchors = ({
  textColor,
  bgColor = 'transparent',
  hoverTextColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  borderType = 'border-bottom',
  inHoverState,
  extraStyles = '',
}) => `
  a {
    color: ${inHoverState ? hoverTextColor : textColor};
    background-color: ${inHoverState ? (hoverBgColor || textColor) : bgColor};
    border-color: ${inHoverState ? (hoverBorderColor || hoverTextColor) : (borderColor || textColor)};

    &:visited, &:link {
      color: ${inHoverState ? hoverTextColor : textColor};
      background-color: ${inHoverState ? (hoverBgColor || textColor) : bgColor};
      border-color: ${inHoverState ? (hoverBorderColor || hoverTextColor) : (borderColor || textColor)};
    }

    &:hover, &:active {
      color: ${hoverTextColor};
      background-color: ${hoverBgColor || textColor};
      border-color: ${hoverBorderColor || textColor};
    }

    ${borderType}-style: solid;
    border-width: 1px;

    ${extraStyles};
  }
`

/**
 * Generate CSS for smooth animations.
 * @return {String}
 */
export const smoothTransitions = ({ duration = '0.3s' } = {}) => `
  transition: all ${duration} linear
`

/**
 * Generate CSS for box shadow.
 * @param {Object} p Parameters
 * @param {String} p.color Shadow color.
 * @return {String}
 */
export const boxShadow = ({ color }) => `
  box-shadow: 0px 0px 10px 2px ${color}
`

/**
 * Generate CSS for button styles.
 * @param {Object} p Parameters
 * @return {String}
 */
export const buttonStyles = ({
  inDisabledState,
  disabledBgColor,
  disabledTextColor,
  disabledBorderColor,
  bgColor,
  textColor,
  borderColor,
  hoverBgColor,
  hoverTextColor,
  hoverBorderColor,
  shadowColor,
}) => `
  cursor: pointer;
  border-color: ${(inDisabledState ? disabledBorderColor : borderColor)};
  background-color: ${(inDisabledState ? disabledBgColor : bgColor)};
  color: ${(inDisabledState ? disabledTextColor : textColor)};
  outline: none;
  border-style: solid;
  border-width: 1px;
  ${(inDisabledState ? '' : `
    &:hover {
      border-color: ${hoverBorderColor};
      background-color: ${hoverBgColor};
      color: ${hoverTextColor};
      ${boxShadow({ color: shadowColor })};
    }
  `)}
`
