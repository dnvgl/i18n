# General information

`@dnvgl/i18n` is a set of functions to support multiple languages/cultures in a browser or Node.js. There is no dependency on other libraries (exception: TypeScript when using definitions). It's built on the ECMAScript native solutions like for example `Intl` API.

The purpose of this library is to provide all needed functionalities to support multiple languages/cultures in the web application. All functions have been designed to be simple and easy to use, that is why some native API are wrapped. This library was in use two years (commercial use by DNV company) before its open-source release ([`2021-04-13`](CHANGELOG.md#v010)).

The biggest advantage about the library is that it supports any language, using the culture of the browser.

## 1. Supported environments

### Browsers:
- Chrome (+ mobile): last 2 versions
- Firefox (+ mobile): last 2 versions
- Safari (+ mobile): v14* or newer
- Edge: last 2 versions

There is a build-in function to check it: [`isBrowserCompatible()`](DOCUMENTATION.md#isBrowserCompatible).

\* - [`formatCountry()`](DOCUMENTATION.md#formatCountry) and [`formatCurrency()`](DOCUMENTATION.md#formatCurrency) require Safari 14.1 (desktop) or 14.5 (mobile)

### Node.js:
- v14 or newer

## 2. Installation

Using npm:
```bash
npm install @dnvgl/i18n
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
const numberFormattedInSpecificCulture = formatNumber(12486.4529, { maxPrecision: 2 }, "de-DE"); // returns "12.486,45"
const numberFormattedInLocalCulture = formatNumber(12486.4529); // returns "12 486,4529" using local browser culture (in this case 'pl-PL'); any culture can be supported out of the box
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

When there is another package that requires ES6 only then the pattern is:\
`"/node_modules/(?!(PACKAGE_1|PACKAGE_2))"`, e.g. `"/node_modules/(?!(@dnvgl/i18n|another-package))"`

#### TypeScript
Library provides a built-in ts definition.

## 4. Contributing
See the [`CONTRIBUTING.md`](CONTRIBUTING.md) file.

## 5. Documentation
See full details in the [`DOCUMENTATION.md`](DOCUMENTATION.md) file.

#### Number formatting/parsing/utils
[`formatInteger()`](DOCUMENTATION.md#formatInteger), [`formatNumber()`](DOCUMENTATION.md#formatnumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed), [`parseNumber()`](DOCUMENTATION.md#parseNumber), [`transformToInputNumericString()`](DOCUMENTATION.md#transformToInputNumericString), [`roundUsingHalfAwayFromZero()`](DOCUMENTATION.md#roundUsingHalfAwayFromZero), [`getDecimalSeparator()`](DOCUMENTATION.md#getDecimalSeparator), [`getMinusSign()`](DOCUMENTATION.md#getMinusSign), [`getThousandsSeparator()`](DOCUMENTATION.md#getThousandsSeparator), [`createNumberFormat()`](DOCUMENTATION.md#createNumberFormat)

#### Datetime formatting
[`formatDate()`](DOCUMENTATION.md#formatDate), [`formatDatePart()`](DOCUMENTATION.md#formatDatePart), [`formatDateToISO()`](DOCUMENTATION.md#formatDateToISO), [`formatRelativeTime()`](DOCUMENTATION.md#formatRelativeTime), [`formatMonth()`](DOCUMENTATION.md#formatMonth), [`formatTime()`](DOCUMENTATION.md#formatTime), [`getDateFnsFormat()`](DOCUMENTATION.md#getDateFnsFormat), [`getDayJsFormat()`](DOCUMENTATION.md#getDayJsFormat), [`getMomentFormat()`](DOCUMENTATION.md#getMomentFormat)

#### Sorting/comparison
[`compareBooleans()`](DOCUMENTATION.md#compareBooleans), [`compareDates()`](DOCUMENTATION.md#compareDates), [`compareNumbers()`](DOCUMENTATION.md#compareNumbers), [`compareNumbersAlike()`](DOCUMENTATION.md#compareNumbersAlike), [`compareStrings()`](DOCUMENTATION.md#compareStrings), [`compareStringsFactory()`](DOCUMENTATION.md#compareStringsFactory), [`sort()`](DOCUMENTATION.md#sort-sortinplace), [`sortBy()`](DOCUMENTATION.md#sortby-sortbyinplace), [`sortByInplace()`](DOCUMENTATION.md#sortby-sortbyinplace), [`sortInplace()`](DOCUMENTATION.md#sort-sortinplace)

#### String formatting/utils
[`capitalizeFirstLetter()`](DOCUMENTATION.md#capitalizeFirstLetter), [`formatString()`](DOCUMENTATION.md#formatString), [`lowercaseFirstLetter()`](DOCUMENTATION.md#lowercaseFirstLetter), [`normalizeForSearching()`](DOCUMENTATION.md#normalizeForSearching), [`plural()`](DOCUMENTATION.md#plural)

#### Country utils
[`findIso3166Country()`](DOCUMENTATION.md#findIso3166Country), [`formatCountry()`](DOCUMENTATION.md#formatCountry), [`getIso3166Countries()`](DOCUMENTATION.md#getIso3166Countries), [`getStatesOfUsa()`](DOCUMENTATION.md#getStatesOfUsa), [`isEuropeanUnionMember()`](DOCUMENTATION.md#isEuropeanUnionMember), [`isValidIso3166Code()`](DOCUMENTATION.md#isValidIso3166Code)

#### Currency utils
[`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency), [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country), [`formatCurrency()`](DOCUMENTATION.md#formatCurrency), [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies), [`getCurrencySymbol()`](DOCUMENTATION.md#getCurrencySymbol), [`isValidIso4217Code()`](DOCUMENTATION.md#isValidIso4217Code)

#### Financial utils
[`formatMoney()`](DOCUMENTATION.md#formatMoney), [`formatIban()`](DOCUMENTATION.md#formatIban), [`getCountryCodeFromBic()`](DOCUMENTATION.md#getCountryCodeFromBic), [`getCountryCodeFromIban()`](DOCUMENTATION.md#getCountryCodeFromIban), [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod)

#### Others
[`getSystemLocaleName()`](DOCUMENTATION.md#getSystemLocaleName), [`isBrowserCompatible()`](DOCUMENTATION.md#isBrowserCompatible)

## 6. Changelog
See the [`CHANGELOG.md`](CHANGELOG.md) file.