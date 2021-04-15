# General information

`@dnvgl/i18n` is a set of functions to support multiple languages/cultures in a browser. There is no dependency on other libraries (exception: TypeScript when using definitions). It's built on the browsers native solutions like for example `Intl` API.

## 1. Supported browsers

- Chrome (+ mobile): last 2 versions
- Firefox (+ mobile): last 2 versions
- Safari (+ mobile): v14 or newer
- Edge: last 2 versions

## 2. Installation

Using npm:
```bash
npm install @dnvgl/i18n --save
```

Using yarn:
```bash
yarn add @dnvgl/i18n
```

## 3. Usage

Import functions or types from `@dnvgl/i18n`, example:
```typescript
import { sort, formatNumber } from '@dnvgl/i18n';

const sortedItems = sort(["Z", "a", "A", "z", "ś"], 'asc', 'pl-PL'); // returns ["a", "A", "ś", "z", "Z"]
const formattedNumber = formatNumber(12486.4529, { maxPrecision: 2 }, "de-DE"); // returns '12.486,45'
```

Most of the functions accepts `locale` parameter which allow us to choose the correct locale for our needs:
- provided: uses specific locale (examples: `'en'`, `'en-GB'`)
- `undefined` (or omitted): uses local browser locale
- more info: [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

#### Module system
Library supports `esm` modules tree shaking by default.

#### Testing
[Jest](https://jestjs.io/) does not support `esm` modules, and `@dnvgl/i18n` uses them. In order to test your application with Jest you have to add the following to your `package.json`:
```json
"jest": {
  "transformIgnorePatterns": [
    "/node_modules/(?!@dnvgl/i18n)"
  ]
}
```

#### TypeScript
Library provides a built-in ts definition.

## 4. Contributing
See the `CONTRIBUTING.md` file.

## 5. Documentation
See the `DOCUMENTATION.md` file.

## 6. Changelog
See the `CHANGELOG.md` file.