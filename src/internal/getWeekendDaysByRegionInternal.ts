/** @internal */
export function getWeekendDaysByRegionInternal(region: string): number[] {
  switch (region) {
    case "AF":
      return [4, 5];

    case "BH":
    case "DZ":
    case "EG":
    case "IL":
    case "IQ":
    case "JO":
    case "KW":
    case "LY":
    case "OM":
    case "QA":
    case "SA":
    case "SD":
    case "SY":
    case "YD":
    case "YE":
      return [5, 6];

    case "IN":
    case "UG":
      return [7];

    case "IR":
      return [5];

    default:
      return [6, 7];
  }
}
