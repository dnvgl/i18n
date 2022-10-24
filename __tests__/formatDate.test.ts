import { DateFormatPrecision, formatDate } from "../src";

describe('formatDate', () => {
  test.each([
    ["2018-07-08", "years", "ar-sa", "١٤٣٩ هـ"],
    ["2018-07-08", "years", "en-GB", "2018"],
    ["2018-07-08", "months", "ar-sa", "١٠‏/١٤٣٩ هـ"],
    ["2018-07-08", "months", "en-GB", "07/2018"],
    ["2018-07-08", "days", "en-GB", "08/07/2018"],
    ["2018-07-08", "days", "en-US", "7/8/2018"],
    [new Date("2018-07-08"), "days", "en-US", "7/8/2018"],
    ["2020-03-30T14:46:27+02:00", "days", "en-GB", "30/03/2020"],
    ["2020-03-30T12:46:45.484Z", "days", "en-GB", "30/03/2020"],
    ["2018-07-08 14:15:24", "minutes", "en-GB", "08/07/2018, 14:15"],
    ["2018-07-08 14:15:24", "minutes", "en-US", "7/8/2018, 2:15 PM"],
    ["2018-07-08 14:15:24", "minutes", "de-DE", "8.7.2018, 14:15"],
    [new Date("2018-07-08 14:15:24"), "minutes", "en-US", "7/8/2018, 2:15 PM"],
    // TODO: relative time (to be reverted when be able to mock timezone on windows machine)
    //["2020-03-30T14:46:27+02:00", "minutes", "en-GB", "30/03/2020, 14:46"],
    //["2020-03-30T12:46:45.484Z", "minutes", "en-GB", "30/03/2020, 14:46"],
    ["2018-07-08 14:15:24", "seconds", "en-GB", "08/07/2018, 14:15:24"],
    ["2018-07-08 14:15:24", "seconds", "en-US", "7/8/2018, 2:15:24 PM"],
    ["2018-07-08 14:15:24", "seconds", "de-DE", "8.7.2018, 14:15:24"],
    [new Date("2018-07-08 14:15:24"), "seconds", "en-US", "7/8/2018, 2:15:24 PM"],
    // TODO: relative time (to be reverted when be able to mock timezone on windows machine)
    //["2020-03-30T14:46:27+02:00", "seconds", "en-GB", "30/03/2020, 14:46:27"],
    //["2020-03-30T12:46:45.484Z", "seconds", "en-GB", "30/03/2020, 14:46:45"],
    //["2020-03-30T12:46:45.484Z", "seconds", "ar-sa", "٦‏/٨‏/١٤٤١ هـ ٢:٤٦:٤٥ م"],
  ])('formats %p using %p format, %p locale', (value, format, locale, expected) => {
    const result = formatDate(value, format as DateFormatPrecision, locale);
    expect(result).toBe(expected);
  });
});