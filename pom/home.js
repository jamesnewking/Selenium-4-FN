export default class HomePage {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://www.fashionnova.com/`;
    this.homePageTitle = `Fashion Nova | Fashion Online For Women | Affordable Women's Clothing | Fashion Nova`;
    this.PCPTitle = `Women's Dresses | Fashion Dresses For Women | Fashion Nova`;

    this.popUpCloseButton = {
      css: `a.bx-close.bx-close-link.bx-close-inside`,
    };

    this.preHeaderNextButton = {
      css: `button.splide__arrow.splide__arrow--next`,
    };

    this.navDresses = { linkText: `Dresses` };
    // this.navDresses = {
    //   css: `nav.NavBar__primary > ul.NavList > li.NavList__heading > a[href="/collections/all"]`,
    // };
    // this.navLingerie = { linkText: `Lingerie` };
    // this.navTops = { linkText: `Tops` };
    this.navShoes = { linkText: `Shoes` };
    this.navTrending = { linkText: `Trending` };
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    await this.driver.wait(this.until.titleIs(this.homePageTitle), 1000);
  }

  async getPageTitle(title = this.title) {
    return await this.driver.getTitle();
  }

  async closePopUp(closeButton = this.popUpCloseButton) {
    await this.driver.wait(this.until.elementLocated(closeButton), 10000);
    const closePopUpButton = await this.driver.findElements(closeButton);
    if(closePopUpButton.length){
      await this.driver.findElement(closeButton).click();
      await this.driver.sleep(1000);
    }
  }

  async hoverNavBar() {
    const preHeaderNextButtonArray = await this.driver.findElements(this.preHeaderNextButton);
    const preHeaderNextButtonElement = preHeaderNextButtonArray[0];
    await preHeaderNextButtonElement.click();
    await this.driver.sleep(500);
    await preHeaderNextButtonElement.click();
    await this.driver.sleep(500);
    await preHeaderNextButtonElement.click();
    await this.driver.sleep(500);
    await preHeaderNextButtonElement.click();

    const navDresses = await this.driver.wait(
      this.until.elementLocated(this.navDresses)
    );
    const navShoes = await this.driver.wait(
      this.until.elementLocated(this.navShoes)
    );
    const navTrending = await this.driver.wait(
      this.until.elementLocated(this.navTrending)
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: navDresses })
      .pause(1000)
      .move({ origin: navShoes })
      .pause(1000)
      .move({ origin: navTrending })
      .pause(1000)
      .perform();
  }

  async clickNavDresses() {
    const navDresses = await this.driver.findElement(this.navDresses);
    await navDresses.click();
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }
}
