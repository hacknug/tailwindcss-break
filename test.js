const _ = require('lodash')

const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

// const defaultConfig = require('tailwindcss/defaultConfig')
const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
  const sandboxConfig = {
    theme: { screens: { 'sm': '640px' } },
    corePlugins: false,
    plugins: [ plugin(pluginOptions) ],
  }
  const postcssPlugins =[
    tailwindcss(_.merge(sandboxConfig, testConfig)),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
}

expect.extend({ toMatchCss: require('jest-matcher-css') })

test('generates default utilities and responsive variants', () => {
  const testConfig = {}
  const expectedCss = `
    .orphans-1 { orphans: 1 }
    .orphans-2 { orphans: 2 }
    .orphans-3 { orphans: 3 }

    .widows-1 { widows: 1 }
    .widows-2 { widows: 2 }
    .widows-3 { widows: 3 }

    .box-slice { box-decoration-break: slice }
    .box-clone { box-decoration-break: clone }

    .bb-auto { break-before: auto }
    .bb-avoid { break-before: avoid }
    .bb-avoid-page { break-before: avoid-page }
    .bb-page { break-before: page }
    .bb-always { break-before: always }
    .bb-left { break-before: left }
    .bb-right { break-before: right }
    .bb-recto { break-before: recto }
    .bb-verso { break-before: verso }
    .bb-avoid-column { break-before: avoid-column }
    .bb-column { break-before: column }
    .bb-avoid-region { break-before: avoid-region }
    .bb-region { break-before: region }

    .ba-auto { break-after: auto }
    .ba-avoid { break-after: avoid }
    .ba-avoid-page { break-after: avoid-page }
    .ba-page { break-after: page }
    .ba-always { break-after: always }
    .ba-left { break-after: left }
    .ba-right { break-after: right }
    .ba-recto { break-after: recto }
    .ba-verso { break-after: verso }
    .ba-avoid-column { break-after: avoid-column }
    .ba-column { break-after: column }
    .ba-avoid-region { break-after: avoid-region }
    .ba-region { break-after: region }

    .bi-auto { break-inside: auto }
    .bi-avoid { break-inside: avoid }
    .bi-avoid-page { break-inside: avoid-page }
    .bi-avoid-column { break-inside: avoid-column }
    .bi-avoid-region { break-inside: avoid-region }

    @media (min-width: 640px) {
      .sm\\:orphans-1 { orphans: 1 }
      .sm\\:orphans-2 { orphans: 2 }
      .sm\\:orphans-3 { orphans: 3 }

      .sm\\:widows-1 { widows: 1 }
      .sm\\:widows-2 { widows: 2 }
      .sm\\:widows-3 { widows: 3 }

      .sm\\:box-slice { box-decoration-break: slice }
      .sm\\:box-clone { box-decoration-break: clone }

      .sm\\:bb-auto { break-before: auto }
      .sm\\:bb-avoid { break-before: avoid }
      .sm\\:bb-avoid-page { break-before: avoid-page }
      .sm\\:bb-page { break-before: page }
      .sm\\:bb-always { break-before: always }
      .sm\\:bb-left { break-before: left }
      .sm\\:bb-right { break-before: right }
      .sm\\:bb-recto { break-before: recto }
      .sm\\:bb-verso { break-before: verso }
      .sm\\:bb-avoid-column { break-before: avoid-column }
      .sm\\:bb-column { break-before: column }
      .sm\\:bb-avoid-region { break-before: avoid-region }
      .sm\\:bb-region { break-before: region }

      .sm\\:ba-auto { break-after: auto }
      .sm\\:ba-avoid { break-after: avoid }
      .sm\\:ba-avoid-page { break-after: avoid-page }
      .sm\\:ba-page { break-after: page }
      .sm\\:ba-always { break-after: always }
      .sm\\:ba-left { break-after: left }
      .sm\\:ba-right { break-after: right }
      .sm\\:ba-recto { break-after: recto }
      .sm\\:ba-verso { break-after: verso }
      .sm\\:ba-avoid-column { break-after: avoid-column }
      .sm\\:ba-column { break-after: column }
      .sm\\:ba-avoid-region { break-after: avoid-region }
      .sm\\:ba-region { break-after: region }

      .sm\\:bi-auto { break-inside: auto }
      .sm\\:bi-avoid { break-inside: avoid }
      .sm\\:bi-avoid-page { break-inside: avoid-page }
      .sm\\:bi-avoid-column { break-inside: avoid-column }
      .sm\\:bi-avoid-region { break-inside: avoid-region }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    variants: {
      orphans: [ 'hover' ],
      widows: [ 'focus' ],
      boxDecorationBreak: [ 'active' ],
      breakBefore: [ 'responsive' ],
      breakAfter: [ 'responsive' ],
      breakInside: [ 'responsive' ],
    },
  }
  const expectedCss = `
    .orphans-1 { orphans: 1 }
    .orphans-2 { orphans: 2 }
    .orphans-3 { orphans: 3 }

    .hover\\:orphans-1:hover { orphans: 1 }
    .hover\\:orphans-2:hover { orphans: 2 }
    .hover\\:orphans-3:hover { orphans: 3 }

    .widows-1 { widows: 1 }
    .widows-2 { widows: 2 }
    .widows-3 { widows: 3 }

    .focus\\:widows-1:focus { widows: 1 }
    .focus\\:widows-2:focus { widows: 2 }
    .focus\\:widows-3:focus { widows: 3 }

    .box-slice { box-decoration-break: slice }
    .box-clone { box-decoration-break: clone }

    .active\\:box-slice:active { box-decoration-break: slice }
    .active\\:box-clone:active { box-decoration-break: clone }

    .bb-auto { break-before: auto }
    .bb-avoid { break-before: avoid }
    .bb-avoid-page { break-before: avoid-page }
    .bb-page { break-before: page }
    .bb-always { break-before: always }
    .bb-left { break-before: left }
    .bb-right { break-before: right }
    .bb-recto { break-before: recto }
    .bb-verso { break-before: verso }
    .bb-avoid-column { break-before: avoid-column }
    .bb-column { break-before: column }
    .bb-avoid-region { break-before: avoid-region }
    .bb-region { break-before: region }

    .ba-auto { break-after: auto }
    .ba-avoid { break-after: avoid }
    .ba-avoid-page { break-after: avoid-page }
    .ba-page { break-after: page }
    .ba-always { break-after: always }
    .ba-left { break-after: left }
    .ba-right { break-after: right }
    .ba-recto { break-after: recto }
    .ba-verso { break-after: verso }
    .ba-avoid-column { break-after: avoid-column }
    .ba-column { break-after: column }
    .ba-avoid-region { break-after: avoid-region }
    .ba-region { break-after: region }

    .bi-auto { break-inside: auto }
    .bi-avoid { break-inside: avoid }
    .bi-avoid-page { break-inside: avoid-page }
    .bi-avoid-column { break-inside: avoid-column }
    .bi-avoid-region { break-inside: avoid-region }

    @media (min-width: 640px) {
      .sm\\:bb-auto { break-before: auto }
      .sm\\:bb-avoid { break-before: avoid }
      .sm\\:bb-avoid-page { break-before: avoid-page }
      .sm\\:bb-page { break-before: page }
      .sm\\:bb-always { break-before: always }
      .sm\\:bb-left { break-before: left }
      .sm\\:bb-right { break-before: right }
      .sm\\:bb-recto { break-before: recto }
      .sm\\:bb-verso { break-before: verso }
      .sm\\:bb-avoid-column { break-before: avoid-column }
      .sm\\:bb-column { break-before: column }
      .sm\\:bb-avoid-region { break-before: avoid-region }
      .sm\\:bb-region { break-before: region }

      .sm\\:ba-auto { break-after: auto }
      .sm\\:ba-avoid { break-after: avoid }
      .sm\\:ba-avoid-page { break-after: avoid-page }
      .sm\\:ba-page { break-after: page }
      .sm\\:ba-always { break-after: always }
      .sm\\:ba-left { break-after: left }
      .sm\\:ba-right { break-after: right }
      .sm\\:ba-recto { break-after: recto }
      .sm\\:ba-verso { break-after: verso }
      .sm\\:ba-avoid-column { break-after: avoid-column }
      .sm\\:ba-column { break-after: column }
      .sm\\:ba-avoid-region { break-after: avoid-region }
      .sm\\:ba-region { break-after: region }

      .sm\\:bi-auto { break-inside: auto }
      .sm\\:bi-avoid { break-inside: avoid }
      .sm\\:bi-avoid-page { break-inside: avoid-page }
      .sm\\:bi-avoid-column { break-inside: avoid-column }
      .sm\\:bi-avoid-region { break-inside: avoid-region }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
