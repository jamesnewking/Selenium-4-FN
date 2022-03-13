export default class HomePage {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://www.fashionnova.com/`;
    this.homePageTitle = `Fashion Nova | Fashion Online For Women | Affordable Women's Clothing | Fashion Nova`;
    this.PCPTitle = `All Products – Infinite V3`;

    this.preHeaderNextButton = {
      css: `button.splide__arrow splide__arrow--next`,
    };

    this.navDresses = { linkText: `Dresses` };
    // this.navDresses = {
    //   css: `nav.NavBar__primary > ul.NavList > li.NavList__heading > a[href="/collections/all"]`,
    // };
    this.navDressesMiniDresses = { linkText: `Mini Dresses` };
    this.navTops = { linkText: `Tops` };
    this.navAccessories = { linkText: `Accessories` };
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    await this.driver.wait(this.until.titleIs(this.homePageTitle), 1000);
  }

  async getPageTitle(title = this.title) {
    return await this.driver.getTitle();
  }

  async hoverNavBar() {
    await this.driver.findElement(this.preHeaderNextButton).click(); //safari does not respond on this first click;
    await this.driver.findElement(this.preHeaderNextButton).click();

    const navDresses = await this.driver.wait(
      this.until.elementLocated(this.navDresses)
    );
    const navDressesMiniDresses = await this.driver.wait(
      this.until.elementLocated(this.navDressesMiniDresses)
    );
    const navTops = await this.driver.wait(
      this.until.elementLocated(this.navTops)
    );
    const navAccessories = await this.driver.wait(
      this.until.elementLocated(this.navAccessories)
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: navDresses })
      .pause(500)
      .move({ origin: navDressesMiniDresses })
      .pause(500)
      .move({ origin: navTops })
      .pause(500)
      .move({ origin: navAccessories })
      .pause(500)
      .perform();
  }

  async clickNavDresses() {
    const navDresses = await this.driver.findElement(this.navDresses);
    await navDresses.click();
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }
}
