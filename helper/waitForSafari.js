export default async (driver, sleepTime) => {
  const usingBrowser = await driver.executeScript(
    "return navigator.userAgent;"
  );
  const browserChromeLoc = usingBrowser.includes(`Chrome`);
  const browserSafariLoc = usingBrowser.includes(`Safari`);
  const browserFirefox = usingBrowser.includes(`Firefox`);
  if ((!browserChromeLoc && browserSafariLoc) || browserFirefox) {
    await driver.sleep(sleepTime);
  }
}