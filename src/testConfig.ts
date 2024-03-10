//chromium, firefox, webkit, chrome, msedge, Pixel <version>, iPhone <version>
// List of devices --> https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
export const browserType: string = process.env.npm_config_BROWSER
  ? process.env.npm_config_BROWSER
  : "Pixel 7";

export const headlessSetting: boolean = false; //true, false
