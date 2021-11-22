export default async (driver, until) => {
  let previewTheme = `No preview theme`;
  const previewBarArr = await driver.findElements({
    css: `iframe#preview-bar-iframe`,
  });
  if (previewBarArr.length) {
    await driver.sleep(100);
    const previewBar = await driver.findElement({
      css: `iframe#preview-bar-iframe`,
    });
    await driver.switchTo().frame(previewBar);
    const previewThemeElement = await driver.findElement({
      css: `body > div.newDesignLanguage > div > div.ui-stack.ui-stack--alignment-center.ui-stack--spacing-none.admin-bar__stack > div > div > p> strong`,
    });
    previewTheme = previewThemeElement.getText();
    // console.log(`preview theme: ${await previewTheme}`);
    const closePreViewButton = await driver.findElement({
      css: `body > div.newDesignLanguage > div > div.ui-stack.ui-stack--alignment-center.ui-stack--spacing-none.admin-bar__stack > ul > li:nth-child(1) > button`,
    });
    await closePreViewButton.click();
    await driver.switchTo().defaultContent();
  }
  return previewTheme;
};