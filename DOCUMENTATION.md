# Documentation

## 1. Basic documentation
Follow TypeScript definitions. Check out examples in unit tests (`__tests__` folder).

### 1.1. Supported modules
Only functions, types etc. that are directly included in `@dnvgl/i18n` module are officially supported. For example, `@dnvgl/i18n/internal` may change in the future without any release notes.

### 1.2. Locale
Most of the functions accepts `locale` parameter which allow us to choose the correct locale for our needs:
- provided: uses specific locale (examples: `'en'`, `'en-GB'`)
- `undefined` (or omitted): uses local browser locale
- more info: [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

## 2. More detailed documentation (alphabetically)

### capitalizeFirstLetter()
```typescript
import { capitalizeFirstLetter } from '@dnvgl/i18n';

capitalizeFirstLetter("abc"); // returns "Abc"
capitalizeFirstLetter("abC"); // returns "AbC"
capitalizeFirstLetter("ABC"); // returns "ABC"
capitalizeFirstLetter("italya", "tr"); // returns "İtalya"
```

### compareBooleans()
Simplified `compareNumbersAlike()` function.\
Order (pseudo code): `undefined` < `null` < `false` < `true`

```typescript
import { compareBooleans } from '@dnvgl/i18n';

compareBooleans(true, false); // returns 1
compareBooleans(true, true); // returns 0
compareBooleans(false, true); // returns -1
```

### compareDates()
Order (pseudo code): `undefined` < `null` < `Invalid Date` < `new Date("2018-05-05")` < `new Date("2018-05-10")`

```typescript
import { compareDates } from '@dnvgl/i18n';

compareDates(new Date("2018-05-10"), new Date("2018-05-05")); // returns 1
compareDates("2021-04-13T15:10:00.000Z", "2021-04-13T07:00:50.000Z"); // returns 1
compareDates("2018-05-05", "2018-05-10"); // returns -1
compareDates(new Date("2018-05-10"), null); // returns 1
```

### compareNumbers()
Simplified `compareNumbersAlike()` function.\
Order (pseudo code): `undefined` < `null` < `NaN` < `-Infinity` < `1` < `100` < `Infinity`

```typescript
import { compareNumbers } from '@dnvgl/i18n';

compareNumbers(5, 1); // returns 1
compareNumbers(-Infinity, 1); // returns -1
```

### compareNumbersAlike()

Compares two values for the following types: `number`, `boolean`, `Date`.

```typescript
import { compareNumbersAlike } from '@dnvgl/i18n';

compareNumbersAlike(5, 1); // returns 1
compareNumbersAlike(new Date("2018-05-05"), new Date("2018-05-10")); // returns -1
compareNumbersAlike(true, true); // returns 0
```

### compareStrings()
```typescript
import { compareStrings } from '@dnvgl/i18n';

compareStrings("A", "a"); // returns 1 (locale depends on client's machine)
compareStrings("Ą", "z", "pl-PL"); // returns -1
```

### compareStringsFactory()
Use this function over `compareStrings()` when comparison is called multiple times (better performance).

```typescript
import { compareStringsFactory } from '@dnvgl/i18n';

const compare = compareStringsFactory("pl-PL");
compare("A", "a"); // returns 1
compare("Ą", "z"); // returns -1
```

**Performance**
```typescript
compareStrings("a", "b");
compareStrings("a", "b");
...

vs

const compare = compareStringsFactory();
compare("a", "b");
compare("a", "b");
...
```

| times | compareStrings | compareStringsFactory |
| -- | -- | -- |
| 1000 | 5.6 ms | 0.2 ms |
| 10000 | 52.3 ms | 1.8 ms |
| 100000 | 519.8 ms | 11.8 ms |

i7-10810U (laptop)

### createNumberFormat()
Creates options for valid number formatting. Use it together with [`formatNumber()`](DOCUMENTATION.md#formatNumber) for best performance.

arguments (overload #1):
- options (optional):
  - minPrecision (number): default `undefined`
  - maxPrecision (number): default `10`
  - thousandsSeparator (boolean): default `true`
  - useBankersRounding (boolean): default `false` (Intl default: [`Round half away from zero`](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) algorithm)
  - negativeZero (boolean): default `true` (current Intl default behavior)
  - currency (string): currency ISO Alpha 3 code (e.g. `"USD"`), default `undefined`
  - currencyDisplay (string): `"symbol" | "narrowSymbol" | "code" | "name"`; default `"symbol"` when `currency` is provided; see more info in the `Intl` documentation
  - currencySign (string): `"standard" | "accounting"`; default `"standard"` when `currency` is provided; see more info in the `Intl` documentation
- locale (optional, default: browser locale): BCP47 language tag/tags (`string` or `string[]`) or `Intl.Collator`

```typescript
import { createNumberFormat } from '@dnvgl/i18n';

createNumberFormat({ thousandsSeparator: false }, "de");
```

### findIso3166Country()
Returns specific country information. Please check [`getIso3166Countries()`](DOCUMENTATION.md#getIso3166Countries) to learn more about the country list.

```typescript
import { findIso3166Country } from '@dnvgl/i18n';

findIso3166Country("PL"); // returns { countryName: "Poland", officialStateName: "The Republic of Poland", alpha2Code: "PL", alpha3Code: "POL", numericCode: 616 }
findIso3166Country("POL"); // returns { countryName: "Poland"... }
findIso3166Country(616); // returns { countryName: "Poland"... }
findIso3166Country("pl"); // returns undefined
findIso3166Country("XX"); // returns undefined
```

### findIso4217Currency()
Returns specific currency information. Please check [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies) to learn more about the list of currencies.

```typescript
import { findIso4217Currency } from '@dnvgl/i18n';

findIso4217Currency("PLN"); // returns { alpha3Code: "PLN", currencyName: "Zloty", numericCode: 985, minorUnit: 2 }
findIso4217Currency(985); // returns { alpha3Code: "PLN"... }
findIso4217Currency("USN"); // returns { alpha3Code: "USN", currencyName: "US Dollar (Next day)", numericCode: 997, minorUnit: 2, isFund: true }
findIso4217Currency("pl"); // returns undefined
findIso4217Currency("XX"); // returns undefined
```

### formatCountry()
Function returns translated currency name by `Iso3166Alpha2Code` (e.g. `"PL"`) or `Iso4217Alpha3Code` (e.g. `"POL"`) or `Iso4217NumericCode` (e.g. `616`) argument value.\
Not supported in Safari browser v14.0 (v14.1 and newer are supported) -> the function returns ISO country name (in english) instead.\
When the country code is invalid then the same `string` is returned (for invalid numeric code empty string is returned).

```typescript
import { formatCountry } from '@dnvgl/i18n';

formatCountry("PL", "en"); // returns "Poland"
formatCountry("POL", "en"); // returns "Poland"
formatCountry(616, "en"); // returns "Poland"
formatCountry("DE", "pl"); // returns "Niemcy"
formatCountry("DE"); // returns "Niemcy", current locale: pl-PL
formatCountry("DE"); // returns "Germany", current locale: en-GB
formatCountry("xx"); // returns "xx", invalid country code
formatCountry("__"); // returns "__", invalid country code
formatCountry(1000); // returns "", invalid country code
formatCountry(""); // returns "", invalid country code
```

### formatCurrency()
Function returns translated currency name by `Iso4217Alpha3Code` (e.g. `"PLN"`) or `Iso4217NumericCode` (e.g. `985`) argument value.\
Not supported in Safari browser v14.0 (v14.1 and newer are supported) -> the function returns ISO currency name (in english) instead.\
When the currency code is invalid then the same `string` is returned (for invalid numeric code empty string is returned).

```typescript
import { formatCurrency } from '@dnvgl/i18n';

formatCurrency("PLN", "pl"); // returns "złoty polski"
formatCurrency("PLN", "en"); // returns "Polish Zloty"
formatCurrency(985, "en"); // returns "Polish Zloty"
formatCurrency("USD", "pl"); // returns "dolar amerykański"
formatCurrency("USD", "en"); // returns "US Dollar"
formatCurrency("USD"); // returns "US-Dollar", example when current locale: de
formatCurrency("xx"); // returns "xx", invalid currency code
formatCurrency("__"); // returns "__", invalid currency code
formatCurrency(1000); // returns "", invalid currency code
formatCurrency(""); // returns "", invalid currency code
```

### formatDate()
```typescript
import { formatDate } from '@dnvgl/i18n';

formatDate(new Date("2018-07-08"), "days", "en-US"); // returns "7/8/2018"
formatDate("2020-03-30T14:46:27+02:00", "days", "en-GB"); // returns "30/03/2020"
formatDate("2018-07-08 14:15:24", "seconds", "en-US"); // returns "7/8/2018, 2:15:24 PM"
```

### formatDatePart()
```typescript
import { formatDatePart } from '@dnvgl/i18n';

formatDatePart(new Date("2018-07-08"), "year", "en-US"); // returns "2018"
formatDatePart("2020-03-30T14:46:27+02:00", "month", "en-GB"); // returns "3"
formatDatePart("2018-07-08 14:15:24", "day", "en-US"); // returns "8"
formatDatePart("2018-07-08 14:15:24", "hour", "en-US"); // returns "2 PM"
```

### formatDateToISO()
arguments:
- value (`Date` or `string` ISO format only)
- includeTime (`boolean`, optional, default: `false`)

```typescript
import { formatDateToISO } from '@dnvgl/i18n';

formatDateToISO(new Date(2020, 5, 10, 22, 15, 7), true); // returns "2020-06-10T20:15:07.000Z"
formatDateToISO("2020-06-10T10:15:07.000Z", false); // returns "2020-06-10"
```

### formatIban()
arguments:
- value (`string`)
- separator (`string`, optional, default: `" "`)

```typescript
import { formatIban } from '@dnvgl/i18n';

formatIban("SE3550000000054910000003"); // returns "SE35 5000 0000 0549 1000 0003"
formatIban("SE35 5000 0000 0549 1000 0003", ""); // returns "SE3550000000054910000003"
formatIban("  SE35 5000 0000 0549 1000 0003  ", ""); // returns "SE3550000000054910000003"
```

### formatInteger()
Simplified `formatNumber()` function

```typescript
import { formatInteger } from '@dnvgl/i18n';

formatInteger(12486.4529, "de-DE"); // returns "12.486"
formatInteger(1000000, "pl-PL"); // returns "1 000 000"
formatInteger(1000000, "en-GB"); // returns "1,000,000"
```

### formatMoney()
Simplified [`formatNumber()`](DOCUMENTATION.md#formatNumber) function with fixed precision (`minPrecision = maxPrecision`) and number rounding using [`banker's algorithm`](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even) (`useBankersRounding = true`).

```typescript
import { formatMoney } from '@dnvgl/i18n';

formatMoney(1.05, 1, "en"); // returns "1.0"
formatMoney(1.15, 1, "en"); // returns "1.2"
formatMoney(1.25, 1, "en"); // returns "1.2"
formatMoney(1.535, 2, "en"); // returns "1.54"
formatMoney(1.53588, { precision: 3, currency: "USD" }, "en"); // returns "$1.536"
formatMoney(1.53588, { precision: 3, currency: "USD", currencyDisplay: "code" }, "en"); // returns "USD 1.536"
formatMoney(1.532, { precision: 2, currency: "PLN" }, "pl-PL"); // returns "1,53 zł"
formatMoney(1.532, { precision: 2, currency: "USD" }, "pl-PL"); // returns "1,53 USD"
formatMoney(1.532, { precision: 2, currency: "CAD" }, "en-US"); // returns "CA$1.53"
formatMoney(1.532, { precision: 2, currency: "CAD", currencyDisplay: "narrowSymbol" }, "en-US"); // returns "$1.53"
formatMoney(-1.53588, { precision: 3, currency: "USD", currencySign: "accounting" }, "en"); // returns "($1.536)"
```

### formatMonth()
```typescript
import { formatMonth } from '@dnvgl/i18n';

formatMonth("2022-01-20", "2-digit", "en"); // returns "01"
formatMonth("2022-01-20", "short", "en"); // returns "Jan"
formatMonth(0, "short", "en"); // returns "Jan"
formatMonth("2022-01-20", "long", "pl-PL"); // returns "styczeń"
formatMonth("2022-01-20", "numeric", "pl-PL"); // returns "1"
formatMonth("2022-01-20", "narrow", "pl-PL"); // returns "S"
formatMonth(11, "narrow", "en"); // returns "D"
```

### formatNumber()

Formats a number according to given parameters. For best performance, it is best to create parameters once ([`createNumberFormat()`](DOCUMENTATION.md#createNumberFormat)) and use them multiple times (see examples).

arguments (overload #1):
- value: number
- options (optional):
  - minPrecision (number): default `undefined`
  - maxPrecision (number): default `10`
  - thousandsSeparator (boolean): default `true`
  - useBankersRounding (boolean): default `false` (Intl default: [`Round half away from zero`](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) algorithm)
  - negativeZero (boolean): default `true` (current Intl default behavior)
  - currency (string): currency ISO Alpha 3 code (e.g. `"USD"`), default `undefined`
  - currencyDisplay (string): `"symbol" | "narrowSymbol" | "code" | "name"`; default `"symbol"` when `currency` is provided; see more info in the `Intl` documentation
  - currencySign (string): `"standard" | "accounting"`; default `"standard"` when `currency` is provided; see more info in the `Intl` documentation
- locale (optional, default: browser locale): BCP47 language tag/tags (`string` or `string[]`) or `Intl.Collator`

arguments (overload #2):
- value: number
- options (`NumberFormatIntl`): create using [`createNumberFormat()`](DOCUMENTATION.md#createNumberFormat), see options above (overload #1)

```typescript
import { formatNumber, createNumberFormat } from '@dnvgl/i18n';

formatNumber(12486.4529, { maxPrecision: 2 }, "de-DE"); // returns "12.486,45"
formatNumber(12486.4529, { thousandsSeparator: false }, "de-DE"); // returns "12486,4529"
formatNumber(-0.001, { maxPrecision: 2 }, "en-US"); // returns "-0"
formatNumber(-0.001, { maxPrecision: 2, negativeZero: false }, "en-US"); // returns "0"

const options = createNumberFormat({ thousandsSeparator: false }, "de");
formatNumber(12486.4, options); // returns "12486,4"
formatNumber(1486.1, options); // returns "1486,1"
```

**Performance #1** (local culture, default options)
```typescript
formatNumber(num1);
formatNumber(num2);
...

vs

const numberFormat = createNumberFormat();
formatNumber(num1, numberFormat);
formatNumber(num2, numberFormat);
...
```

| times | formatNumber | formatNumber + createNumberFormat |
| -- | -- | -- |
| 100 | 1.5 ms | 0.1 ms |
| 1000 | 15.8 ms | 0.6 ms |
| 10000 | 160.1 ms | 5.9 ms |
| 40000 | 618.8 ms | 26.7 ms |

i7-10810U (laptop)

**Performance #2** (specific culture, USD currency)
```typescript
formatNumber(num1, { currency: "USD" }, "en-US");
formatNumber(num2, { currency: "USD" }, "en-US");
...

vs

const numberFormat = createNumberFormat({ currency: "USD" }, "en-US");
formatNumber(num1, numberFormat);
formatNumber(num2, numberFormat);
...
```

| times | formatNumber  | formatNumber + createNumberFormat |
| -- | -- | -- |
| 100 | 3.2 ms | 0.1 ms |
| 1000 | 28 ms | 0.6 ms |
| 10000 | 270.1 ms | 6.9 ms |
| 40000 | 1093.5 ms | 23.0 ms |

i7-10810U (laptop)

### formatNumberToFixed()
Simplified [`formatNumber()`](DOCUMENTATION.md#formatNumber) function with fixed precision (`minPrecision = maxPrecision`).

```typescript
import { formatNumberToFixed } from '@dnvgl/i18n';

formatNumberToFixed(123.454, 2, "en-US"); // returns "123.45"
formatNumberToFixed(123.454, 1, "en-US"); // returns "123.4"
formatNumberToFixed(123.454, 5, "en-US"); // returns "123.45400"
```

### formatRelativeTime()
```typescript
import { formatRelativeTime } from '@dnvgl/i18n';

formatRelativeTime(5, "day", { style: "narrow" }, "en"); // returns "in 5 days"
formatRelativeTime(-1, "day", { style: "long" }, "en"); // returns "1 day ago"
formatRelativeTime(-1, "day", { style: "short", numeric: "auto" }, "en"); // returns "yesterday"
```

### formatString()
Replaces placeholders (string pattern) by provided values.
```typescript
import { formatString } from '@dnvgl/i18n';

formatString("some test {0}, ok?", "abc"); // returns "some test abc, ok?"
formatString("some test {0} a {0} {1} {3} {2}", 1, "test", 5, 100); // returns "some test 1 a 1 test 100 5"
```

### getCountryCodeFromBic()
Returns valid `Iso3166Alpha2Code` (can be used in [`Country utils`](README.md#country-utils)) or `"XK"` ([`Wikipedia`](https://en.wikipedia.org/wiki/ISO_9362): *"SWIFT has assigned the code XK to Republic of Kosovo, which does not have an ISO 3166-1 country code"*) only when [`BIC structure (simplified rules)`](https://en.wikipedia.org/wiki/ISO_9362#Structure) is valid.

```typescript
import { getCountryCodeFromBic } from '@dnvgl/i18n';

getCountryCodeFromBic("BNPAFRPP"); // returns "FR"
getCountryCodeFromBic("BNPAFRP"); // returns undefined (invalid BIC length)
getCountryCodeFromBic("BNPAXXPP"); // returns undefined ("XX" is not a valid ISO3166-1 country code)
getCountryCodeFromBic("BNPAFrPP"); // returns undefined (country code is not uppercase)
getCountryCodeFromBic("1234FRPP"); // returns undefined (invalid structure, institution or bank code cannot contains digits)
getCountryCodeFromBic("  BNPAFRPP"); // returns undefined (invalid BIC structure)
getCountryCodeFromBic("BNPAFR"); // returns undefined (BIC is too short)
```

### getCountryCodeFromIban()
Returns valid `Iso3166Alpha2Code` (can be used in [`Country utils`](README.md#country-utils)) or `"XK"` (XK = Republic of Kosovo, which does not have an ISO 3166-1 country code) only when [`IBAN structure (simplified rules)`](https://en.wikipedia.org/wiki/International_Bank_Account_Number#Structure) is valid. Country specific rules are not checked, only characters (letters/digits) and length (range of 15-34) in general. IBAN structure validation can be ignored using options.\
\
arguments:
- value (`string`)
- options (`object`, optional):
  - removeWhitespaces (boolean): default `false`
  - validateStructure (boolean): default `true`

```typescript
import { getCountryCodeFromIban } from '@dnvgl/i18n';

getCountryCodeFromIban("BE71096123456769"); // returns "BE"
getCountryCodeFromIban("BE71 0961 2345 6769"); // returns undefined (whitespace is not allowed)
getCountryCodeFromIban("BE71 0961 2345 6769", { removeWhitespaces: true }); // returns "BE"
getCountryCodeFromIban("be71096123456769"); // returns undefined (country code is not uppercase)
getCountryCodeFromIban("XX71096123456769"); // returns undefined ("XX" is not a valid ISO3166-1 country code)
getCountryCodeFromIban("  BE71096123456769"); // returns returns undefined ("  " is not a valid country code)
getCountryCodeFromIban("  BE71096123456769", { removeWhitespaces: true }); // returns "BE"
getCountryCodeFromIban("BE", { validateStructure: false }); // returns "BE"
getCountryCodeFromIban("BE...", { validateStructure: false }); // returns "BE"
```

### getCurrencySymbol()
```typescript
import { getCurrencySymbol } from '@dnvgl/i18n';

getCurrencySymbol("USD", "en-US"); // returns "$"
getCurrencySymbol(840, "en-US"); // returns "$" (where 840 is the USD numeric code)
getCurrencySymbol({ currency: "CAD" }, "en-US"); // returns "CA$"
getCurrencySymbol({ currency: "CAD", currencyDisplay: "narrowSymbol" }, "en-US"); // returns "$"
```

### formatTime()
```typescript
import { formatTime } from '@dnvgl/i18n';

formatTime("2018-07-08 14:15:24", "en-US"); // returns "2:15:24 PM"
```

### getDateFnsFormat()
Converts to [`date-fns`](https://date-fns.org/) format.
```typescript
import { getDateFnsFormat } from '@dnvgl/i18n';

getDateFnsFormat("en-GB", "seconds"); // returns "dd'/'MM'/'yyyy', 'HH':'mm':'ss"
```
Example integration with [`AntDesign` calendar](https://ant.design/components/date-picker/) (when [integrated](https://ant.design/docs/react/replace-moment) with `date-fns`):
```tsx
import { DatePicker } from 'your_module_with_custom_date_picker';

<DatePicker format={getDateFnsFormat("days")} />
```

### getDecimalSeparator()
```typescript
import { getDecimalSeparator } from '@dnvgl/i18n';

getDecimalSeparator(); // returns ",", current locale: pl-PL (depends on client's machine)
getDecimalSeparator("en-GB"); // returns "."
getDecimalSeparator("de"); // returns ","
```

### getIso3166Countries()
Source: [`ISO 3166 countries (timestamp: 2018-09-18)`](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)\
To get `countryName` in your local culture please use [`formatCountry()`](DOCUMENTATION.md#formatCountry).

```typescript
import { getIso3166Countries } from '@dnvgl/i18n';

getIso3166Countries(); // returns [{ countryName: "Afghanistan", officialStateName: "The Islamic Republic of Afghanistan", alpha2Code: "AF", alpha3Code: "AFG", numericCode: 4 }, { countryName...}]
```
Example integration with [`formatCountry()`](DOCUMENTATION.md#formatCountry):
```typescript
import { formatCountry, getIso3166Countries } from '@dnvgl/i18n';

getIso3166Countries().map(x => ({ ...x, translatedCountryName: formatCountry(x.alpha2Code) }));
```

### getIso4217Currencies()
Sources: [`ISO 4217 countries (timestamp: 2021-10-01)`](https://en.wikipedia.org/wiki/ISO_4217), [`SIX - XML database (timestamp: 2022-04-01)`](https://www.six-group.com/en/products-services/financial-information/data-standards.html)\
To get `currencyName` in your local culture please use [`formatCurrency()`](DOCUMENTATION.md#formatCurrency).

```typescript
import { getIso4217Currencies } from '@dnvgl/i18n';

getIso4217Currencies(); // returns [{ alpha3Code: "AED", currencyName: "UAE Dirham", numericCode: 784, minorUnit: 2 }, { alpha3Code: "AFN",...}]
getIso4217Currencies("2023-01-01"); // e.g. Kuna (HRK) currency is not on the list
getIso4217Currencies(new Date("2022-12-31")); // e.g. Kuna (HRK) currency is on the list
```
Example integration with [`formatCurrency()`](DOCUMENTATION.md#formatCurrency):
```typescript
import { formatCurrency, getIso4217Currencies } from '@dnvgl/i18n';

getIso4217Currencies().map(x => ({ ...x, translatedCurrencyName: formatCurrency(x.alpha3Code) }));
```

### getMinusSign()
```typescript
import { getMinusSign } from '@dnvgl/i18n';

getMinusSign(); // returns "-", current locale: pl-PL (depends on client's machine)
getMinusSign("en-GB"); // returns "-"
```

### getMomentFormat()
Converts to [`moment.js`](https://momentjs.com/) format.
```typescript
import { getMomentFormat } from '@dnvgl/i18n';

getMomentFormat("seconds", "en-GB"); // returns "DD[/]MM[/]YYYY[, ]HH[:]mm[:]ss"
```
Example integration with [`AntDesign` calendar](https://ant.design/components/date-picker/):
```tsx
import { DatePicker } from 'antd';

<DatePicker format={getMomentFormat("days")} />
```

### getStatesOfUsa()
Source: [`List of states of the United States`](https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States)
```typescript
import { getStatesOfUsa } from '@dnvgl/i18n';

getStatesOfUsa(); // returns [{ name: "Alabama", alpha2Code: "AL" }, { name: "Alaska", alpha2Code: "AK" }, { na...]
```

### getSystemLocaleName()
```typescript
import { getSystemLocaleName } from '@dnvgl/i18n';

getSystemLocaleName(); // returns "pl-PL", current locale: pl-PL (depends on client's machine)
```

### getThousandsSeparator()
```typescript
import { getThousandsSeparator } from '@dnvgl/i18n';

getThousandsSeparator(); // returns " ", current locale: pl-PL (depends on client's machine)
getThousandsSeparator("en-GB"); // returns ","
getThousandsSeparator("de"); // returns "."
```

### isBrowserCompatible()
Checks whether browser supports all necessary features. Based on browser features, not `userAgent`. In practice it returns `false` for all Internet Explorer versions, old Edge browser (12-18), Safari 13 and other old browsers. Example: https://caniuse.com/?search=Intl.RelativeTimeFormat

```typescript
import { isBrowserCompatible } from '@dnvgl/i18n';

isBrowserCompatible(); // returns true, newest Chrome browser
isBrowserCompatible(); // returns false, Internet Explorer 11
```

### isEuropeanUnionMember()
```typescript
import { isEuropeanUnionMember } from '@dnvgl/i18n';

isEuropeanUnionMember("PL"); // returns true
isEuropeanUnionMember("POL"); // returns true
isEuropeanUnionMember(616); // returns true
isEuropeanUnionMember("IT"); // returns true
isEuropeanUnionMember("pl"); // returns false (invalid country code)
isEuropeanUnionMember("GB"); // returns false (not a member of EU)
isEuropeanUnionMember("USA"); // returns false (not a member of EU)
```

### isValidIso3166Code()
Checks whether code has valid length and country exists (active code only).
```typescript
import { isValidIso3166Code } from '@dnvgl/i18n';

isValidIso3166Code("PL"); // returns true
isValidIso3166Code("POL"); // returns true
isValidIso3166Code(616); // returns true
isValidIso3166Code("pl"); // returns false
isValidIso3166Code("XX"); // returns false
isValidIso3166Code(1000); // returns false
```

### isValidIso4217Code()
Checks whether code has valid length and currency exists (active code only).
```typescript
import { isValidIso4217Code } from '@dnvgl/i18n';

isValidIso4217Code("PLN"); // returns true
isValidIso4217Code("USD"); // returns true
isValidIso4217Code(985); // returns true
isValidIso4217Code("pl"); // returns false
isValidIso4217Code("XX"); // returns false
isValidIso4217Code(1000); // returns false
```

### lowercaseFirstLetter()
```typescript
import { lowercaseFirstLetter } from '@dnvgl/i18n';

lowercaseFirstLetter("abc"); // returns "abc"
lowercaseFirstLetter("Abc"); // returns "abc"
lowercaseFirstLetter("ABC"); // returns "aBC"
```

### normalizeForSearching()
```typescript
import { normalizeForSearching } from '@dnvgl/i18n';

normalizeForSearching("   Gdańsk  123 ", "en"); // returns "gdansk 123"

const words = ["Congrès", "congres", "Assemblée", "poisson"];
const s = "congres";
words.filter(w => normalizeForSearching(w, "fr").includes(s)); // returns ["Congrès", "congres"]
```

### parseNumber()
arguments:
- value (`string`)
- strictMode (`boolean`): `false` tries to parse despite invalid characters; `true` only valid characters

```typescript
import { parseNumber } from '@dnvgl/i18n';

parseNumber("1,623.454", true, "en-GB"); // returns 1623.454
parseNumber("-1,62-sd3.454", false, "en-GB"); // returns -162
parseNumber("-1,62-sd3.454", true, "en-GB"); // returns undefined
```

### plural()
String pattern as array or separated by character (default: `|`, can be customized by `separator` argument)
```typescript
import { plural } from '@dnvgl/i18n';

plural(["cat", "cats"], "en", 0); // returns "cats"
plural(["cat", "cats"], "en", 1); // returns "cat"
plural(["cat", "cats"], "en", 10); // returns "cats"
plural("pies|psy|psów", "pl", 10); // returns "psów"
```

### roundUsingHalfAwayFromZero()
[`Round half away from zero`](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero) algorithm. The same algorithm is used by Intl default rounding implementation.\
Allowed `precision`: value from 0 to 15 or `Infinity` (otherwise `RangeError` will be thrown). Decimal `precision` will be converted to integer (using `Math.trunc`).

```typescript
import { roundUsingHalfAwayFromZero } from '@dnvgl/i18n';

roundUsingHalfAwayFromZero(1.35, 1); // returns 1.4
roundUsingHalfAwayFromZero(1.449, 1); // returns 1.4
roundUsingHalfAwayFromZero(1.45, 1); // returns 1.5
roundUsingHalfAwayFromZero(1.46, 1); // returns 1.5
roundUsingHalfAwayFromZero(1.55, 1); // returns 1.6
roundUsingHalfAwayFromZero(1.005, 2); // returns 1.01
roundUsingHalfAwayFromZero(10.075, 2); // returns 10.08
roundUsingHalfAwayFromZero(-23.5, 1); // returns -24
roundUsingHalfAwayFromZero(-1.005, 2); // returns -1.01
```

Common mistakes/algorithms (let's take the rounding to 2 decimal places as an example):
```typescript
Math.round(1.005 * 100) / 100; // (actual: 1, expected: 1.01)
Math.round((519.805 + Number.EPSILON) * 100) / 100; // (actual: 519.8, expected: 519.81)
parseFloat(1.005.toFixed(2)); // (actual: 1, expected: 1.01)
Number(1.005.toFixed(2)); // (actual: 1, expected: 1.01)
+1.005.toFixed(2); // (actual: 1, expected: 1.01)
_.round(-1.005, 2); // lodash library uses "Round half up" algorithm that rounds negative numbers differently (result: -1)
+(Math.round(1.19e-7 + "e+2")  + "e-2"); // (actual: NaN, expected: 0), also uses "Round half up" algorithm that rounds negative numbers differently
```

### roundUsingBankersMethod()

[`Round half to even`](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even) algorithm, also called bankers' rounding. Part of [`formatNumber()`](DOCUMENTATION.md#formatNumber) function when using `useBankersRounding` option.\
Allowed `precision`: value >= 0 or `Infinity` (otherwise `RangeError` will be thrown). Decimal `precision` will be converted to integer (using `Math.trunc`).

```typescript
import { roundUsingBankersMethod } from '@dnvgl/i18n';

roundUsingBankersMethod(1.35, 1); // returns 1.4
roundUsingBankersMethod(1.45, 1); // returns 1.4
roundUsingBankersMethod(1.55, 1); // returns 1.6
roundUsingBankersMethod(23.5, 0); // returns 24
roundUsingBankersMethod(24.5, 0); // returns 24
```

### sort(), sortInplace()

arguments:
- source: array (`string`, `number`, `Date`, `boolean`), all elements must be of the same type
- order (optional, default: `"asc"`): ascending: `"asc"` or `"ascend"`, descending: `"desc"` or `"descend"`
- locale (optional, default: browser locale): BCP47 language tag/tags (`string` or `string[]`) or `Intl.Collator`

examples:
```typescript
import { sort } from '@dnvgl/i18n';

sort(["Z", "a", "A", "z", "ś"]); // returns ["a", "A", "ś", "z", "Z"], current browser locale pl-PL
sort(["Z", "a", "A", "z", "ś"], 'asc', 'pl-PL'); // returns ["a", "A", "ś", "z", "Z"]
sort(['己', '孔', '乙'], "asc", "zh-CN"); // returns ['己', '孔', '乙']
sort(['己', '孔', '乙'], "asc", "zh-TW"); // returns ['乙', '己', '孔']
```

additional information:
- `sortInplace()` mutates input array, `sort()` return always new array (new reference)
- ascending order: `undefined` -> `null` -> `NaN` or `Invalid Date` -> `-Infinity` -> `1` -> `100` -> `Infinity`
- descending order: reverted ascending order

common mistakes:
- native `Array.prototype.sort()`: doesn't support internationalization; `undefined` goes always to the end (both ascending and descending order); mutates the array
- native `Array.prototype.sort()` + `String.prototype.localeCompare()`: poor performance

### sortBy(), sortByInplace()

arguments:
- source: array, all elements must be of the same generic type
- selector: (function or array of functions); selector should return the same type (`string` or `number` or `Date` or `boolean`)
- order (optional, default: `"asc"`): ascending: `"asc"` or `"ascend"`, descending: `"desc"` or `"descend"` for each selector
- locale (optional, default: browser locale): BCP47 language tag/tags (`string` or `string[]`) or `Intl.Collator`

examples:
```typescript
import { sortBy } from '@dnvgl/i18n';

const users = [
  { id: 1, name: 'fred',   age: 48 },
  { id: 2, name: 'barney', age: 34 },
  { id: 3, name: 'fred',   age: 40 },
  { id: 4, name: 'barney', age: 36 }
];

const result = sortBy(users, [x => x.name, x => x.age], ["asc", "desc"], "en");
/* returns
[
  { id: 4, name: 'barney', age: 36 },
  { id: 2, name: 'barney', age: 34 },
  { id: 1, name: 'fred',   age: 48 },
  { id: 3, name: 'fred',   age: 40 }  
]; */
```

additional information:
- `sortByInplace()` mutates input array, `sortBy()` return always new array (new reference)
- source elements (before selector) cannot be `null` or `undefined`

common mistakes:
- see `sort()`/`sortInplace()` section
- lodash `_.orderBy()`: doesn't support internationalization

### transformToInputNumericString()
Useful when implementing custom input component which doesn't allow to type invalid characters (transformation can be done during onChange event).
```typescript
import { transformToInputNumericString } from '@dnvgl/i18n';

transformToInputNumericString("  $-102,234,567.89123 - ", "en-US"); // returns "-102234567.89123"
```