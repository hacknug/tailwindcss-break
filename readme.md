# Tailwind CSS Break Plugin

This plugin adds utilities to use break with Tailwind CSS.

## Installation

Add this plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-break

# Install using npm
npm install --save-dev tailwindcss-break

# Install using yarn
yarn add -D tailwindcss-break
```

## Usage

```js
// tailwind.config.js
{
  theme: { // defaults to these values
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
  },

  variants: { // all the following default to ['responsive']
    orphans: ['responsive'],
    widows: ['responsive'],
    boxDecorationBreak: ['responsive'],
    breakBefore: ['responsive'],
    breakAfter: ['responsive'],
    breakInside: ['responsive'],
  },

  plugins: [
    require('tailwindcss-break'), // no options to configure
  ],
}
```

```css
.orphans-1 { orphans: 1; }
.orphans-2 { orphans: 2; }
.orphans-3 { orphans: 3; }

.widows-1 { widows: 1; }
.widows-2 { widows: 2; }
.widows-3 { widows: 3; }

.box-slice { box-decoration-break: slice; }
.box-clone { box-decoration-break: clone; }

.bb-auto { break-before: auto; }
.bb-avoid { break-before: avoid; }
.bb-avoid-page { break-before: avoid-page; }
.bb-page { break-before: page; }
.bb-always { break-before: always; }
.bb-left { break-before: left; }
.bb-right { break-before: right; }
.bb-recto { break-before: recto; }
.bb-verso { break-before: verso; }
.bb-avoid-column { break-before: avoid-column; }
.bb-column { break-before: column; }
.bb-avoid-region { break-before: avoid-region; }
.bb-region { break-before: region; }

.ba-auto { break-after: auto; }
.ba-avoid { break-after: avoid; }
.ba-avoid-page { break-after: avoid-page; }
.ba-page { break-after: page; }
.ba-always { break-after: always; }
.ba-left { break-after: left; }
.ba-right { break-after: right; }
.ba-recto { break-after: recto; }
.ba-verso { break-after: verso; }
.ba-avoid-column { break-after: avoid-column; }
.ba-column { break-after: column; }
.ba-avoid-region { break-after: avoid-region; }
.ba-region { break-after: region; }

.bi-auto { break-inside: auto; }
.bi-avoid { break-inside: avoid; }
.bi-avoid-page { break-inside: avoid-page; }
.bi-avoid-column { break-inside: avoid-column; }
.bi-avoid-region { break-inside: avoid-region; }
```
