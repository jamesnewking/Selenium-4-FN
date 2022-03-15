export default async (driver, until, locator, offset = 0) => {
  const foundElementArr = await driver.findElements( locator );
  if(foundElementArr.length){
    const targetElement = await driver.wait(until.elementLocated(locator));
    const rect = await targetElement.getRect();
    const targetElementYPosition = rect.y;
    await driver.executeScript(
      "window.scrollTo(0, arguments[0]);",
      targetElementYPosition - offset
    );
  } else {
    console.log(`Errors: Did not find: ${locator}`);
  }
  
  //await driver.wait(until.elementIsVisible(targetElement));
};
