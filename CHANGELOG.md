# Changelog
Strictly follows [Semantic Versioning 2.0.0.](https://semver.org/)

## v1.20.0
`2025-09-23`\
\
🚀 Features:
- [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies), [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency), [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country) - from `2026-01-01` Bulgarian Lev (BGN) currency will be treated as historical because Bulgaria joins the euro.
```typescript
  {
    alpha3Code: "BGN",
    currencyName: "Bulgarian Lev",
    numericCode: 975,
    minorUnit: 2,
    historicalFrom: "2026-01-01" // CHANGED (before: undefined)
  },
```

🔧 Internal:
- TypeScript upgrade `5.8.3` -> `5.9.2`

## v1.19.0
`2025-05-12`\
\
🐛 Bug fixes:
- `UYW` currency should be marked as a fund currency: [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency) and [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies). This currency could be used so far if someone filtered by `!x.isFund`, so for some library clients this might be a breaking change. Therefore, instead of increasing the patch version, we are increasing the minor version during this release.

```typescript
  {
    alpha3Code: "UYW",
    currencyName: "Unidad Previsional",
    numericCode: 927,
    minorUnit: 4,
    isFund: true // CHANGED (before: undefined)
  },
```

## v1.18.0
`2025-05-05`\
\
🚀 Features:
- support for `XAD` fund currency: [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency) and [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies)

```typescript
  {
    alpha3Code: "XAD", // NEW
    currencyName: "Arab Accounting Dinar", // NEW
    numericCode: 396, // NEW
    minorUnit: 2, // NEW
    isFund: true, // NEW
    introducedIn: "2025-05-12" // NEW
  },
```

🔧 Internal:
- TypeScript upgrade `5.7.3` -> `5.8.3`

## v1.17.1
`2025-02-26`\
\
🐛 Bug fixes:
- [`formatCountry()`](DOCUMENTATION.md#formatCountry) circular dependency fix; `vite` build log example:\
\
`Export "formatCountry" of module "node_modules/@dnvgl/i18n/lib/formatCountry.js" was reexported through module "node_modules/@dnvgl/i18n/lib/index.js" while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.`

## v1.17.0
`2025-02-05`\
\
🚀 Features:
- `CUC` currency treated as historical: [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency), [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies). This currency was withdrawn in `2021`, but because ISO update was released on `2025-02-04` we will use the second date. We don't want to introduce any breaking change when using `statusForTheDay` feature.

```typescript
  {
    alpha3Code: "CUC",
    currencyName: "Peso Convertible",
    numericCode: 931,
    minorUnit: 2,
    historicalFrom: "2025-02-04" // CHANGED (before: undefined)
  }
```

🔧 Internal:
- TypeScript upgrade `5.5.2` -> `5.7.3`

## v1.16.1
`2024-09-17`\
\
🐛 Bug fixes:
- `ZWG` currency should be returned from `2024-09-01` for Zimbabwe (`ZWL` currency was returned instead) [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country)

🔧 Internal:
- TypeScript upgrade `5.5.2` -> `5.6.2`

## v1.16.0
`2024-06-26`\
\
🚀 Features:
- support for `ZWG` currency: [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency) and [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country)

```typescript
  {
    alpha3Code: "ZWG", // NEW
    currencyName: "Zimbabwe Gold", // NEW
    numericCode: 924, // NEW
    minorUnit: 2, // NEW
    introducedIn: "2024-06-25" // NEW
  },
  {
    alpha3Code: "ZWL",
    currencyName: "Zimbabwe Dollar",
    numericCode: 932,
    minorUnit: 2,
    historicalFrom: "2024-09-01" // CHANGED (before: undefined)
  }
```

🔧 Internal:
- TypeScript upgrade `5.4.5` -> `5.5.2`

## v1.15.0
`2024-05-10`\
\
🚀 Features:
- TypeScript `5.4.x` support
```typescript
// before
export type Locale = Intl.BCP47LanguageTag | Intl.BCP47LanguageTag[]; // TS 5.3.x
// new:
export type Locale = Intl.LocalesArgument; // TS 5.4.x
```

🔧 Internal:
- TypeScript upgrade `5.3.2` -> `5.4.5`

## v1.14.0
`2023-12-11`\
\
🚀 Features:
- support for `XCG` currency (future replacement for `ANG`): [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency) and [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country)

```typescript
  {
    alpha3Code: "ANG",
    currencyName: "Netherlands Antillean Guilder",
    numericCode: 532,
    minorUnit: 2,
    historicalFrom: "2025-03-31" // CHANGED (before: undefined)
  },
  // ... other currencies
  {
    alpha3Code: "XCG", // NEW
    currencyName: "Caribbean Guilder", // NEW
    numericCode: 532, // NEW
    minorUnit: 2, // NEW
    introducedIn: "2025-03-31" // NEW
  },
```
- [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country): new argument `statusForTheDay` has been introduced

## v1.13.0
`2023-02-21`\
\
🚀 Features:
- [`getDayJsFormat()`](DOCUMENTATION.md#getDayJsFormat) - converts `Intl` current locale format to [`day.js`](https://day.js.org/) format; in practice the implementation is the same as in [`getMomentFormat()`](DOCUMENTATION.md#getMomentFormat) so `getDayJsFormat()` is an alias for `getMomentFormat()`
- [`findIso4217CurrencyForIso3166Country()`](DOCUMENTATION.md#findIso4217CurrencyForIso3166Country) - returns `ISO4217` currency for specific `ISO3166` country
```typescript
findIso4217CurrencyForIso3166Country(code: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode): Iso4217Currency | undefined
```

📄 Documentation:
- [`getMomentFormat()`](DOCUMENTATION.md#getMomentFormat) - AntD v5 example update
- [`getDateFnsFormat()`](DOCUMENTATION.md#getDateFnsFormat) - AntD v5 example update

## v1.12.0
`2022-12-22`\
\
🚀 Features:
- [`getIso3166Countries()`](DOCUMENTATION.md#getIso3166Countries) - `"Turkey"` country name has been changed to `"Türkiye"`
```typescript
{
  countryName: "Türkiye",
  officialStateName: "The Republic of Türkiye",
  alpha2Code: "TR",
  alpha3Code: "TUR",
  numericCode: 792
}
```
- [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies) - from `2023-01-01` Kuna currency (HRK) will be treated as historical because Croatia joins the euro. New argument `statusForTheDay` has been introduced. When `statusForTheDay` is defined then only valid (non-historical) currencies are returned. `statusForTheDay = undefined` means today (`new Date()`). `Iso4217Currency` has two new optional properties: `historicalFrom?: DateIsoString`, `introducedIn?: DateIsoString` (for future use).
```typescript
getIso4217Currencies(statusForTheDay?: Date | DateIsoString): Iso4217Currency[]

interface Iso4217Currency {
  // ... old properties
  historicalFrom?: DateIsoString; // e.g. "2023-01-01"
  introducedIn?: DateIsoString;
}
```

🔧 Internal:
- TypeScript upgrade `4.7.2` -> `4.9.4`

## v1.11.0
`2022-10-24`\
\
🚀 Features:
- [`formatNumber()`](DOCUMENTATION.md#formatNumber) - new overload, accepts `NumberFormatIntl` options, that can be created using [`createNumberFormat()`](DOCUMENTATION.md#createNumberFormat). This new overload is dedicated when formatting is used many times (thousands, e.g. big tables with financial data). The source of the problems is creating `new Intl.NumberFormat`, which is expensive. Using [`createNumberFormat()`](DOCUMENTATION.md#createNumberFormat) it can be created only once and re-used.
```typescript
const options = createNumberFormat({ thousandsSeparator: false }, "de");
formatNumber(12486.4, options);
formatNumber(100, options);
```
🔧 Internal:
- renamed `createDateFormat()` -> `createDateFormatIntlObj()`
- renamed `createNumberFormat()` -> `createNumberFormatIntlObj()`

📄 Documentation:
- [`formatNumber()`](DOCUMENTATION.md#formatNumber) - performance results
- [`compareStringsFactory()`](DOCUMENTATION.md#compareStringsFactory) - performance results

## v1.10.0
`2022-10-06`\
\
🚀 Features:
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed), [`formatMoney()`](DOCUMENTATION.md#formatMoney) - accepts `currency` as numeric representation (e.g. `USD = 840`).
```typescript
formatMoney(1.532, { precision: 2, currency: 840 }, "pl-PL")
```
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed), [`formatMoney()`](DOCUMENTATION.md#formatMoney) - accepts new option `currencySign` (Safari >= `14.1`). Defaults: `currencySign: "standard"` when `currency` value is provided.
```typescript
formatMoney(-1.532, { precision: 2, currency: 840, currencySign: "accounting" })
```
- [`getCurrencySymbol()`](DOCUMENTATION.md#getCurrencySymbol) - accepts new option `currencyDisplay` (Safari >= `14.1`)
```typescript
getCurrencySymbol({ currency: "CAD", currencyDisplay: "narrowSymbol" }, "en")
```

## v1.9.0
`2022-10-05`\
\
🚀 Features:
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed), [`formatMoney()`](DOCUMENTATION.md#formatMoney) - accepts new options `currency` and `currencyDisplay` (Safari >= `14.1`). Defaults: `currencyDisplay: "symbol"` when `currency` value is provided.
```typescript
{ currency: "USD", currencyDisplay: "code" }
```

## v1.8.0
`2022-10-04`\
\
🚀 Features:
- [`getCurrencySymbol()`](DOCUMENTATION.md#getCurrencySymbol)
```typescript
getCurrencySymbol(): string
```

💡 Enhancements: 
- [`parseNumber()`](DOCUMENTATION.md#parseNumber) - optimization (redundant NaN check)

🔧 Internal:
- TypeScript upgrade `4.7.2` -> `4.8.4`

## v1.7.0
`2022-05-27`\
\
🚀 Features:
- [`getIso4217Currencies()`](DOCUMENTATION.md#getIso4217Currencies)
```typescript
getIso4217Currencies(): Iso4217Currency[]
```
- [`findIso4217Currency()`](DOCUMENTATION.md#findIso4217Currency)
```typescript
findIso4217Currency(code: Iso4217Alpha3Code | Iso4217NumericCode): Iso4217Currency | undefined
```
- [`isValidIso4217Code()`](DOCUMENTATION.md#isValidIso4217Code)
```typescript
isValidIso4217Code(code: Iso4217Alpha3Code | Iso4217NumericCode): boolean
```
- [`formatCurrency()`](DOCUMENTATION.md#formatCurrency)
```typescript
formatCurrency(currency: Iso4217Alpha3Code | Iso4217NumericCode, locale?: Locale): string
```

💡 Enhancements:
- [`formatCountry()`](DOCUMENTATION.md#formatCountry) - ensured that invalid country code is handled without throwing an error (this case was previously undocumented); for invalid string code the same string is returned, but for invalid numeric code empty string is returned

## v1.6.0
`2022-05-25`\
\
🚀 Features:
- [`getCountryCodeFromBic()`](DOCUMENTATION.md#getCountryCodeFromBic)
```typescript
getCountryCodeFromBic(bic: string): Iso3166Alpha2Code | "XK" | undefined
```
- [`getCountryCodeFromIban()`](DOCUMENTATION.md#getCountryCodeFromIban)
```typescript
getCountryCodeFromIban(iban: string): Iso3166Alpha2Code | "XK" | undefined
```

🔧 Internal:
- TypeScript upgrade `4.6.4` -> `4.7.2`

## v1.5.0
`2022-05-22`\
\
🚀 Features:
- [`roundUsingHalfAwayFromZero()`](DOCUMENTATION.md#roundUsingHalfAwayFromZero)
```typescript
roundUsingHalfAwayFromZero(value: number, precision: number): number
```
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed) - `negativeZero` (`boolean`) option
```typescript
formatNumber(-0.001, { maxPrecision: 2, negativeZero: false }, "en-US"); // returns "0" instead of "-0"
```
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - allow to use `Infinity` precision (returns the same number passed as the argument)

💡 Enhancements:
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - improved `precision` argument validation (`RangeError` is thrown for `precision < 0` or equal to `NaN`)
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - `precision` value is converted using `Math.trunc` to ensure that the value is an integer (without throwing an error)

## v1.4.0
`2022-04-25`\
\
🚀 Features:
- [`formatMonth()`](DOCUMENTATION.md#formatMonth)
```typescript
formatMonth(month: number, monthFormat: MonthFormat, locale?: Locale): string
formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
```

## v1.3.0
`2022-03-03`\
\
🚀 Features:
- [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed) has simpler overload that accepts precision as number argument:
```typescript
formatNumberToFixed(value: number, precision?: number, locale?: Locale): string
```

🔧 Internal:
- TypeScript upgrade `4.5.2` -> `4.6.2`

## v1.2.0
`2021-11-22`\
\
🚀 Features:
- [`formatCountry()`](DOCUMENTATION.md#formatCountry)
```typescript
formatCountry(country: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode, locale?: Locale): string
```

🔧 Internal:
- deprecated function `substr()` has been replaced by `substring()`

## v1.1.0
`2021-11-19`\
\
🚀 Features:
- [`getStatesOfUsa()`](DOCUMENTATION.md#getStatesOfUsa)
```typescript
getStatesOfUsa(): StateOfUsa[]
```

## v1.0.0
`2021-04-27`\
\
Exactly the same as `v0.4.0` but major version was set to `1`. The reason is to follow [Semantic Versioning 2.0.0.](https://semver.org/) for public, stable API.

## v0.4.0
`2021-04-27`\
\
🚀 Features:
- [`findIso3166Country()`](DOCUMENTATION.md#findIso3166Country)
- [`getIso3166Countries()`](DOCUMENTATION.md#getIso3166Countries)
- [`isEuropeanUnionMember()`](DOCUMENTATION.md#isEuropeanUnionMember)
- [`isValidIso3166Code()`](DOCUMENTATION.md#isValidIso3166Code)

## v0.3.0
`2021-04-26`\
\
🚀 Features:
- [`isBrowserCompatible()`](DOCUMENTATION.md#isBrowserCompatible)

## v0.2.0
`2021-04-20`\
\
🚀 Features:
- [`formatDatePart()`](DOCUMENTATION.md#formatDatePart)

💡 Enhancements:
- [`sortBy()`](DOCUMENTATION.md#sortBy), [`sortByInplace()`](DOCUMENTATION.md#sortByInplace) - allow sorting by with same order for all selectors

## v0.1.0
`2021-04-13`\
\
Initial public release.

🚀 Features:
- capitalizeFirstLetter()
- compareBooleans()
- compareDates()
- compareNumbers()
- compareNumbersAlike()
- compareStrings()
- compareStringsFactory()
- formatDate()
- formatDateToISO()
- formatIban()
- formatInteger()
- formatMoney()
- formatNumber()
- formatNumberToFixed()
- formatRelativeTime()
- formatString()
- formatTime()
- getDateFnsFormat()
- getDecimalSeparator()
- getMinusSign()
- getMomentFormat()
- getSystemLocaleName()
- getThousandsSeparator()
- lowercaseFirstLetter()
- normalizeForSearching()
- parseNumber()
- plural()
- roundUsingBankersMethod()
- sort()
- sortBy()
- sortByInplace()
- sortInplace()
- transformToInputNumericString()
