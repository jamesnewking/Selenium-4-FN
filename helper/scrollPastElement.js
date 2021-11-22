export default async (driver, offset = 0) => {
  const targetElement = await driver.wait(until.elementLocated(locator));
  const rect = await targetElement.getRect();
  const targetElementYPosition = rect.y;
  await driver.executeScript(
    "window.scrollTo(0, arguments[0]);",
    targetElementYPosition - offset
  );
  //await driver.wait(until.elementIsVisible(targetElement));
};