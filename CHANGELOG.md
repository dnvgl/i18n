# Changelog
Strictly follows [Semantic Versioning 2.0.0.](https://semver.org/)

## v1.4.0
`2022-04-25`\
\
:rocket: Features:
- formatMonth()
```typescript
formatMonth(month: number, monthFormat: MonthFormat, locale?: Locale): string
formatMonth(date: Date | DateIsoString, monthFormat: MonthFormat, locale?: Locale): string
```

## v1.3.0
`2022-03-03`\
\
:rocket: Features:
- formatNumberToFixed() has simpler overload that accepts precision as number argument:
```typescript
formatNumberToFixed(value: number, precision?: number, locale?: Locale): string
```

:wrench: Internal:
- TypeScript upgrade `4.5.2` -> `4.6.2`

## v1.2.0
`2021-11-22`\
\
:rocket: Features:
- formatCountry()
```typescript
formatCountry(country: Iso3166Alpha2Code | Iso3166Alpha3Code | Iso3166NumericCode, locale?: Locale): string
```

:wrench: Internal:
- deprecated function substr() has been replaced by substring()

## v1.1.0
`2021-11-19`\
\
:rocket: Features:
- getStatesOfUsa()
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
- findIso3166Country()
- getIso3166Countries()
- isEuropeanUnionMember()
- isValidIso3166Code()

## v0.3.0
`2021-04-26`\
\
:rocket: Features:
- isBrowserCompatible()

## v0.2.0
`2021-04-20`\
\
:rocket: Features:
- formatDatePart()

:bulb: Enhancements:
- sortBy(), sortByInplace() - allow sorting by with same order for all selectors

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