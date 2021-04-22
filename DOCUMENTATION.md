# Documentation

## 1. Basic documentaion
Follow TypeScript definitions. Check out examples in unit tests (`__tests__` folder).

### 1.1. Supported modules
Only functions, types etc. that are directly included in `@dnvgl/i18n` module are officially supported. For example, `@dnvgl/i18n/internal` may change in the future without any release notes.

### 1.2. Locale

Most of the functions accepts `locale` parameter which allow us to choose the correct locale for our needs:
- provided: uses specific locale (examples: `'en'`, `'en-GB'`)
- `undefined` (or omitted): uses local browser locale
- more info: [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

## 2. More detailed documentaion

### capitalizeFirstLetter()
```typescript
import { capitalizeFirstLetter } from '@dnvgl/i18n';

capitalizeFirstLetter("abc"); // returns "Abc"
capitalizeFirstLetter("abC"); // returns "abC"
capitalizeFirstLetter("ABC"); // returns "ABC"
capitalizeFirstLetter("italya", "tr"); // returns "İtalya"
```

### compareBooleans()
Simplifed `compareNumbersAlike()` function.\
Order (pseudocode): `undefined` < `null` < `false` < `true`

```typescript
import { compareBooleans } from '@dnvgl/i18n';

compareBooleans(true, false); // returns 1
compareBooleans(true, true); // returns 0
compareBooleans(false, true); // returns -1
```

### compareDates()
Order (pseudocode): `undefined` < `null` < `Invalid Date` < `new Date("2018-05-05")` < `new Date("2018-05-10")`

```typescript
import { compareDates } from '@dnvgl/i18n';

compareDates(new Date("2018-05-10"), new Date("2018-05-05")); // returns 1
compareDates("2021-04-13T15:10:00.000Z", "2021-04-13T07:00:50.000Z"); // returns 1
compareDates("2018-05-05", "2018-05-10"); // returns -1
compareDates(new Date("2018-05-10"), null); // returns 1
```

### compareNumbers()
Simplifed `compareNumbersAlike()` function.\
Order (pseudocode): `undefined` < `null` < `NaN` < `-Infinity` < `1` < `100` < `Infinity`

```typescript
import { compareNumbers } from '@dnvgl/i18n';

compareNumbers(5, 1); // returns 1
compareNumbers(-Infinity, 1); // returns -1
```

### compareNumbersAlike()
```typescript
import { compareNumbersAlike } from '@dnvgl/i18n';

compareNumbersAlike(5, 1); // returns 1
compareNumbersAlike(new Date("2018-05-05"), new Date("2018-05-10")); // returns -1
compareNumbersAlike(true, true); // returns 0
```

### compareStrings()
```typescript
import { compareStrings } from '@dnvgl/i18n';

compareStrings("A", "a"); // returns 1
compareStrings("Ą", "z", "pl-PL"); // returns -1
```

### compareStringsFactory()
Use this function over `compareStrings()` when comparison is called multiple times (better performance)

```typescript
import { compareStringsFactory } from '@dnvgl/i18n';

const compare = compareStringsFactory("pl-PL");
compare("A", "a"); // returns 1
compare("Ą", "z"); // returns -1
```

### formatDate()
```typescript
import { formatDate } from '@dnvgl/i18n';

formatDate(new Date("2018-07-08"), "days", "en-US"); // returns  "7/8/2018"
formatDate("2020-03-30T14:46:27+02:00", "days", "en-GB"); // returns "30/03/2020"
formatDate("2018-07-08 14:15:24", "seconds", "en-US"); // returns "7/8/2018, 2:15:24 PM"
```

### formatDatePart()
```typescript
import { formatDatePart } from '@dnvgl/i18n';

formatDatePart(new Date("2018-07-08"), "year", "en-US"); // returns "2018"
formatDatePart("2020-03-30T14:46:27+02:00", "month", "en-GB"); // returns "3"
formatDatePart("2018-07-08 14:15:24", "day", "en-US"); // returns "8"
formatDatePart("2018-07-08 14:15:24", "hour", "en-US"); // returns "2 PM"
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
```typescript
import { formatIban } from '@dnvgl/i18n';

formatIban("SE3550000000054910000003"); // returns "SE35 5000 0000 0549 1000 0003"
```

### formatInteger()
Simplifed `formatNumber()` function

```typescript
import { formatInteger } from '@dnvgl/i18n';

formatInteger(12486.4529, "de-DE"); // returns "12.486"
formatInteger(1000000, "pl-PL"); // returns "1 000 000"
```

### formatMoney()
Simplifed `formatNumber()` function, rounds number using banker's algorithm

```typescript
import { formatMoney } from '@dnvgl/i18n';

formatMoney(1.05, 1, "en"); // returns "1.0"
formatMoney(1.15, 1, "en"); // returns "1.2"
formatMoney(1.25, 1, "en"); // returns "1.2"
formatMoney(1.535, 2, "en"); // returns "1.54"
```

### formatNumber()
```typescript
import { formatNumber } from '@dnvgl/i18n';

formatNumber(12486.4529, { maxPrecision: 2 }, "de-DE"); // returns "12.486,45"
formatNumber(12486.4529, { thousandsSeparator: false }, "de-DE"); // returns "12486,4529"
```

### formatNumberToFixed()
Simplifed `formatNumber()` function

```typescript
import { formatNumberToFixed } from '@dnvgl/i18n';

formatNumberToFixed(123.454, 2, "en-US"); // returns "123.45"
formatNumberToFixed(123.454, 1, "en-US"); // returns "123.4"
formatNumberToFixed(123.454, 5, "en-US"); // returns "123.45400"
```

### formatRelativeTime()
```typescript
import { formatRelativeTime } from '@dnvgl/i18n';

formatRelativeTime(5, "day", { style: "narrow" }, "en"); // returns "in 5 days"
formatRelativeTime(-1, "day", { style: "long" }, "en"); // returns "1 day ago"
formatRelativeTime(-1, "day", { style: "short", numeric: "auto" }, "en"); // returns "yesterday"
```

### formatString()
Replaces placeholders (string pattern) by provied values.
```typescript
import { formatString } from '@dnvgl/i18n';

formatString("some test {0}, ok?", "abc"); // returns "some test abc, ok?"
formatString("some test {0} a {0} {1} {3} {2}", 1, "test", 5, 100); // returns "some test 1 a 1 test 100 5"
```

### formatTime()
```typescript
import { formatTime } from '@dnvgl/i18n';

formatTime("2018-07-08 14:15:24", "en-US"); // returns "2:15:24 PM"
```

### getDateFnsFormat()
```typescript
import { getDateFnsFormat } from '@dnvgl/i18n';

getDateFnsFormat("en-GB", "seconds"); // returns "dd'/'MM'/'yyyy', 'HH':'mm':'ss"
```

### getDecimalSeparator()
```typescript
import { getDecimalSeparator } from '@dnvgl/i18n';

getDecimalSeparator(); // returns ",", current locale: pl-PL
getDecimalSeparator("en-GB"); // returns "."
getDecimalSeparator("de"); // returns ","
```

### getMinusSign()
```typescript
import { getMinusSign } from '@dnvgl/i18n';

getMinusSign(); // returns "-", current locale: pl-PL
getMinusSign("en-GB"); // returns "-"
```

### getMomentFormat()
```typescript
import { getMomentFormat } from '@dnvgl/i18n';

getMomentFormat("en-GB", "seconds"); // returns "DD[/]MM[/]YYYY[, ]HH[:]mm[:]ss"
```

### getSystemLocaleName()
```typescript
import { getSystemLocaleName } from '@dnvgl/i18n';

getSystemLocaleName(); // returns "pl-PL", current locale: pl-PL
```

### getThousandsSeparator()
```typescript
import { getThousandsSeparator } from '@dnvgl/i18n';

getThousandsSeparator(); // returns " ", current locale: pl-PL
getThousandsSeparator("en-GB"); // returns ","
getThousandsSeparator("de"); // returns "."
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

parseNumber("1,623.454", true, "en-GB"); // returns 1623.454
parseNumber("-1,62-sd3.454", false, "en-GB"); // returns -162
parseNumber("-1,62-sd3.454", true, "en-GB"); // returns undefined
```

### plural()
String pattern as array or separated by characeter (default: `|`, can be customized by `separator` argument)
```typescript
import { plural } from '@dnvgl/i18n';

plural(["cat", "cats"], "en", 0); // returns "cats"
plural(["cat", "cats"], "en", 1); // returns "cat"
plural(["cat", "cats"], "en", 10); // returns "cats"
plural("pies|psy|psów", "pl", 10); // returns "psów"
```

### roundUsingBankersMethod()
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
sort(['己', '孔', '乙'], "asc", "zh-CN"); // returns ['己', '孔', '乙']
sort(['己', '孔', '乙'], "asc", "zh-TW"); // returns ['乙', '己', '孔']
```

additional information:
- `sortInplace()` mutates input array, `sort()` return always new array (new reference)
- ascending order: `undefined` -> `null` -> `NaN` or `Invalid Date` -> `-Infinity` -> `1` -> `100` -> `Infinity`
- descending order: reverted ascending order

common mistakes:
- native `Array.prototype.sort()`: doesnt't support internationalization; undefined goes always to the end (both ascending and descending order); mutates the array
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
- lodash `_.orderBy()`: doesnt't support internationalization

### transformToInputNumericString()
Useful when implementing custom input component which doesn't allow to type invalid characters (transformation can be done during onChange event).
```typescript
import { transformToInputNumericString } from '@dnvgl/i18n';

transformToInputNumericString("  $-102,234,567.89123 - ", "en-US"); // returns "-102234567.89123"
```