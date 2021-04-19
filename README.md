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

const sortedItems = sort(["Z", "a", "A", "z", "ś"], "asc", "pl-PL"); // returns ["a", "A", "ś", "z", "Z"]
const formattedNumber = formatNumber(12486.4529, { maxPrecision: 2 }, "de-DE"); // returns "12.486,45"
const localformattedNumber = formatNumber(12486.4529); // returns "12 486,4529" using local brower culture (in this case 'pl-PL'); any culture can be supported out of the box
```

#### Module system
Library supports `esm` modules tree shaking by default.

#### Testing in Jest
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
See full details in the `DOCUMENTATION.md` file.

#### Number formatting/parsing
`formatInteger()`, `formatMoney()`, `formatNumber()`, `formatNumberToFixed()`, `parseNumber()`, `transformToInputNumericString()`

#### Datetime formatting
`formatDate()`, `formatDateToISO()`, `formatRelativeTime()`, `formatTime()`, `getDateFnsFormat()`, `getMomentFormat()`

#### Sorting/comaprison
`compareBooleans()`, `compareDates()`, `compareNumbers()`, `compareNumbersAlike()`, `compareStrings()`, `compareStringsFactory()`, `sort()`, `sortBy()`, `sortByInplace()`, `sortInplace()`

#### String formating/utils
`capitalizeFirstLetter()`, `formatString()`, `lowercaseFirstLetter()`, `normalizeForSearching()`, `plural()`

#### Others
`formatIban()`, `getDecimalSeparator()`, `getMinusSign()`, `getSystemLocaleName()`, `getThousandsSeparator()`, `roundUsingBankersMethod()`

## 6. Changelog
See the `CHANGELOG.md` file.