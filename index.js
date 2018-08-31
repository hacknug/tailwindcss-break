module.exports = function (variants) {
  return function ({ addUtilities }) {
    addUtilities(
      {
        // Box Decoration Break
        '.box-slice': { boxDecorationBreak: 'slice' },
        '.box-clone': { boxDecorationBreak: 'clone' },

        // Break Before: Generic Values
        '.bb-auto': { breakBefore: 'auto' },
        '.bb-avoid': { breakBefore: 'avoid' },

        // Break Before: Page Values
        '.bb-avoid-page': { breakBefore: 'avoid-page' },
        '.bb-page': { breakBefore: 'page' },
        '.bb-always': { breakBefore: 'always' },
        '.bb-left': { breakBefore: 'left' },
        '.bb-right': { breakBefore: 'right' },
        '.bb-recto': { breakBefore: 'recto' },
        '.bb-verso': { breakBefore: 'verso' },

        // Break Before: Column Values
        '.bb-avoid-column': { breakBefore: 'avoid-column' },
        '.bb-column': { breakBefore: 'column' },

        // Break Before: Region Values
        '.bb-avoid-region': { breakBefore: 'avoid-region' },
        '.bb-region': { breakBefore: 'region' },

        // Break After: Generic Values
        '.ba-auto': { breakAfter: 'auto' },
        '.ba-avoid': { breakAfter: 'avoid' },

        // Break After: Page Values
        '.ba-avoid-page': { breakAfter: 'avoid-page' },
        '.ba-page': { breakAfter: 'page' },
        '.ba-always': { breakAfter: 'always' },
        '.ba-left': { breakAfter: 'left' },
        '.ba-right': { breakAfter: 'right' },
        '.ba-recto': { breakAfter: 'recto' },
        '.ba-verso': { breakAfter: 'verso' },

        // Break After: Column Values
        '.ba-avoid-column': { breakAfter: 'avoid-column' },
        '.ba-column': { breakAfter: 'column' },

        // Break After: Region Values
        '.ba-avoid-region': { breakAfter: 'avoid-region' },
        '.ba-region': { breakAfter: 'region' },

        // Break Inside
        '.bi-auto': { breakInside: 'auto' },
        '.bi-avoid': { breakInside: 'avoid' },
        '.bi-avoid-page': { breakInside: 'avoid-page' },
        '.bi-avoid-column': { breakInside: 'avoid-column' },
        '.bi-avoid-region': { breakInside: 'avoid-region' },
      },
      variants
    )
  }
}
