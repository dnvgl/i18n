# Changelog
Strictly follows [Semantic Versioning 2.0.0.](https://semver.org/)

## v1.9.0
`2022-10-05`\
\
:rocket: Features:
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed), [`formatMoney()`](DOCUMENTATION.md#formatMoney) - accepts new options `currency` and `currencyDisplay` (Safari >= `14.1`). Defaults: `currencyDisplay: "symbol"` when `currency` value is provided.
```typescript
{ currency: "USD", currencyDisplay: "code" }
```

## v1.8.0
`2022-10-04`\
\
:rocket: Features:
- [`getCurrencySymbol()`](DOCUMENTATION.md#getCurrencySymbol)
```typescript
getCurrencySymbol(): string
```

:bulb: Enhancements: 
- [`parseNumber()`](DOCUMENTATION.md#parseNumber) - optimization (redundant NaN check)

:wrench: Internal:
- TypeScript upgrade `4.7.2` -> `4.8.4`

## v1.7.0
`2022-05-27`\
\
:rocket: Features:
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

:bulb: Enhancements:
- [`formatCountry()`](DOCUMENTATION.md#formatCountry) - ensured that invalid country code is handled without throwing an error (this case was previously undocumented); for invalid string code the same string is returned, but for invalid numeric code empty string is returned

## v1.6.0
`2022-05-25`\
\
:rocket: Features:
- [`getCountryCodeFromBic()`](DOCUMENTATION.md#getCountryCodeFromBic)
```typescript
getCountryCodeFromBic(bic: string): Iso3166Alpha2Code | "XK" | undefined
```
- [`getCountryCodeFromIban()`](DOCUMENTATION.md#getCountryCodeFromIban)
```typescript
getCountryCodeFromIban(iban: string): Iso3166Alpha2Code | "XK" | undefined
```

:wrench: Internal:
- TypeScript upgrade `4.6.4` -> `4.7.2`

## v1.5.0
`2022-05-22`\
\
:rocket: Features:
- [`roundUsingHalfAwayFromZero()`](DOCUMENTATION.md#roundUsingHalfAwayFromZero)
```typescript
roundUsingHalfAwayFromZero(value: number, precision: number): number
```
- [`formatNumber()`](DOCUMENTATION.md#formatNumber), [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed) - `negativeZero` (`boolean`) option
```typescript
formatNumber(-0.001, { maxPrecision: 2, negativeZero: false }, "en-US"); // returns "0" instead of "-0"
```
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - allow to use `Infinity` precision (returns the same number passed as the argument)

:bulb: Enhancements:
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - improved `precision` argument validation (`RangeError` is thrown for `precision < 0` or equal to `NaN`)
- [`roundUsingBankersMethod()`](DOCUMENTATION.md#roundUsingBankersMethod) - `precision` value is converted using `Math.trunc` to ensure that the value is an integer (without throwing an error)

## v1.4.0
`2022-04-25`\
\
:rocket: Features:
- [`formatMonth()`](DOCUMENTATION.md#formatMonth)
```typescript
formatMonth(month: number, monthFormat: MonthFormat, locale?: Locale): string
formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
```

## v1.3.0
`2022-03-03`\
\
:rocket: Features:
- [`formatNumberToFixed()`](DOCUMENTATION.md#formatNumberToFixed) has simpler overload that accepts precision as number argument:
```typescript
formatNumberToFixed(value: number, precision?: number, locale?: Locale): string
```

:wrench: Internal:
- TypeScript upgrade `4.5.2` -> `4.6.2`

## v1.2.0
`2021-11-22`\
\
:rocket: Features:
- [`formatCountry()`](DOCUMENTATION.md#formatCountry)
```typescript
formatCountry(country: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode, locale?: Locale): string
```

:wrench: Internal:
- deprecated function `substr()` has been replaced by `substring()`

## v1.1.0
`2021-11-19`\
\
:rocket: Features:
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
:rocket: Features:
- [`findIso3166Country()`](DOCUMENTATION.md#findIso3166Country)
- [`getIso3166Countries()`](DOCUMENTATION.md#getIso3166Countries)
- [`isEuropeanUnionMember()`](DOCUMENTATION.md#isEuropeanUnionMember)
- [`isValidIso3166Code()`](DOCUMENTATION.md#isValidIso3166Code)

## v0.3.0
`2021-04-26`\
\
:rocket: Features:
- [`isBrowserCompatible()`](DOCUMENTATION.md#isBrowserCompatible)

## v0.2.0
`2021-04-20`\
\
:rocket: Features:
- [`formatDatePart()`](DOCUMENTATION.md#formatDatePart)

:bulb: Enhancements:
- [`sortBy()`](DOCUMENTATION.md#sortBy), [`sortByInplace()`](DOCUMENTATION.md#sortByInplace) - allow sorting by with same order for all selectors

## v0.1.0
`2021-04-13`\
\
Initial public release.

:rocket: Features:
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
