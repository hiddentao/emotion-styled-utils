# emotion-styled-utils

[![NPM module](https://badge.fury.io/js/emotion-styled-utils.svg)](https://badge.fury.io/js/emotion-styled-utils)

Styling utilities for use with [emotion](https://emotion.sh/).

* Theme management utils, for use with [emotion-theming](https://emotion.sh/docs/theming).
* Layout utilities, including responsive breakpoints.
* Font loading and management.
* Styling fragments for use within [styled components](https://emotion.sh/docs/styled).

## Installation

```shell
npm install emotion-styled-utils
```

It is recommended that you also install the following packages:

```shell
npm install @emotion/core @emotion/styled emotion-theming
```

## Usage

**Using reset styles, themes and font-loading:**

```js
const React = require('react')
const styled = require('@emotion/styled')
const { Global } = require('@emotion/core')
const { ThemeProvider } = require('emotion-theming')
const { loadFonts, addTheme, getTheme, resetStyles } = require('emotion-styled-utils')

const CustomDiv = styled.div`
  ${({ theme }) => theme.font('body')};
  color: ${({ theme  }) => theme.bodyTextColor};
`

addTheme('default', {
  bodyTextColor: '#000'
})

export default class MyApp extends React.Component {
  componentDidMount () {
    if (typeof window !== 'undefined' && !!window.document) {
      loadFonts({
        body: {
          name: 'Roboto',
          weights: {
            thin: 100,
            regular: 400,
            bold: 700,
          },
        },
      }, window.document).then(
        () => this.forceUpdate(),
        err => console.error(err)
      )
    }
  }

  render () {
    return (
      <ThemProvider theme={getTheme('default')}>
        <Global styles={resetStyles} />
        <CustomDiv>hello world!</CustomDiv>
      </ThemeProvider>
    )
  }
}
```

**Using style fragments:**

```js
const React = require('react')
const styled = require('@emotion/styled')
import { ThemeProvider } from 'emotion-theming'
const { flex, smoothTransitions } = require('emotion-styled-utils')

const CustomDiv = styled.div`
  ${flex({ direction: 'column' })};
  ${smoothTransitions()};
`

export default class MyApp extends React.Component {
  render () {
    return (
      <CustomDiv>hello world!</CustomDiv>
    )
  }
}
```

See `fragments.js` for full list of available style fragments.

**Using media queries:**

```js
const React = require('react')
const styled = require('@emotion/styled')
import { ThemeProvider } from 'emotion-theming'
const { media } = require('emotion-styled-utils')

// NOTE: this sets the breakpoints globally
media.setBreakpoints({
  width: {
    mobile: '950px',
    desktop: '1280px',
  },
  height: {
    tall: '800px',
  }
})

const HideOnMobileDiv = styled.div`
  display: none;

  ${media.when({ minW: 'mobile' })} {
    display: block;
  }
`

const HideOnDesktopDiv = styled.div`
  display: block;

  ${media.when({ maxW: 'mobile' })} {
    display: none;
  }
`

export default class MyApp extends React.Component {
  render () {
    return (
      <HideOnMobileDiv>hello desktop user!</HideOnMobileDiv>
      <HideOnDesktopDiv>hello mobile user!</HideOnDesktopDiv>
    )
  }
}
```


## License

[MIT](LICENSE.md)
