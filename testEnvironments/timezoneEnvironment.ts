import { TestEnvironment } from "jest-environment-node";

// HINT: process.env inside a test is a copy, so TZ has to be changed on the worker process (works on Windows too)
export default class TimezoneEnvironment extends TestEnvironment {
  private readonly timezone: string;
  private originalTimezone = "";

  constructor(...args: ConstructorParameters<typeof TestEnvironment>) {
    super(...args);

    const timezone = args[1].docblockPragmas["timezone"];

    if (typeof timezone !== "string") {
      throw new Error(`Missing "@timezone" docblock pragma in ${args[1].testPath}`);
    }

    this.timezone = timezone;
  }

  override async setup(): Promise<void> {
    this.originalTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    process.env.TZ = this.timezone;
    await super.setup();
  }

  override async teardown(): Promise<void> {
    // HINT: deleting TZ does not reset the cached timezone, the original one has to be set explicitly
    process.env.TZ = this.originalTimezone;
    await super.teardown();
  }
}
