var _ = require('lodash')
var flatten = require('flat')


const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }
const getName = name => name.split('-default').join('')


module.exports = function () {
  return function ({
    addUtilities, addComponents, addBase, addVariant,
    e, prefix, theme, variants, config,
  }) {
    const buildConfig = (themeKey, ...fallbackKeys) => {
      return buildConfigFromTheme(themeKey, ...fallbackKeys) || buildConfigFromArray(themeKey)
    }
    const buildConfigFromTheme = (themeKey, ...fallbackKeys) => {
      const buildObject = ([ modifier, value ]) => [ modifier, { [themeKey]: value } ]
      const getThemeSettings = (themeKey, fallbackKeys) => {
        const [newThemeKey, ...newFallbackKeys] = fallbackKeys || []
        return theme(themeKey, false) || (fallbackKeys.length && getThemeSettings(newThemeKey, [...newFallbackKeys]))
      }

      const themeSettings = getThemeSettings(themeKey, fallbackKeys)
      const themeObject = _.isArray(themeSettings) ? _.zipObject(themeSettings, themeSettings) : themeSettings
      const themeEntries = themeSettings && Object
        .entries(flatten(themeObject, FLATTEN_CONFIG))
        .map(entry => buildObject(entry))

      return themeSettings ? _.fromPairs(themeEntries) : false
    }
    const buildConfigFromArray = (property) => {
      const defaultSettings = defaultValues[property]
      const defaultEntries = defaultSettings && defaultSettings
        .map((value) => ([value, { [property]: value }]))

      return defaultSettings ? _.fromPairs(defaultEntries) : false
    }

    const defaultValues = {
      orphans: [ 1, 2, 3 ],
      widows: [ 1, 2, 3 ],
      boxDecorationBreak: [ 'slice', 'clone' ],
      breakBefore: [
        'auto', 'avoid', 'avoid-page', 'page', 'always', 'left', 'right',
        'recto', 'verso', 'avoid-column', 'column', 'avoid-region', 'region',
      ],
      breakAfter: [
        'auto', 'avoid', 'avoid-page', 'page', 'always', 'left', 'right',
        'recto', 'verso', 'avoid-column', 'column', 'avoid-region', 'region',
      ],
      breakInside: [ 'auto', 'avoid', 'avoid-page', 'avoid-column', 'avoid-region' ],
    }

    const pluginUtilities = {
      'orphans': buildConfig('orphans'),
      'widows': buildConfig('widows'),
      'box': buildConfig('boxDecorationBreak'),
      'bb': buildConfig('breakBefore'),
      'ba': buildConfig('breakAfter'),
      'bi': buildConfig('breakInside'),
    }

    Object.entries(pluginUtilities)
      .filter(([ modifier, values ]) => !_.isEmpty(values))
      .forEach(([ modifier, values ]) => {
        const className = _.kebabCase(modifier)
        const variantName = Object.keys(Object.entries(values)[0][1])[0]
        const utilities = flatten({ [`.${e(`${className}`)}`]: values }, FLATTEN_CONFIG)

        addUtilities(
          _.mapKeys(utilities, (value, key) => getName(key)),
          variants(variantName, ['responsive'])
        )
      })
  }
}
