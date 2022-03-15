export default async (driver, scrollByPx = 500, scrollTimes = 1) => {
  for (let i = 0; i < scrollTimes; i++){
    await driver.executeScript(
      "scrollBy(0, arguments[0])",
      scrollByPx
    );
    await driver.sleep(750);
  }
};