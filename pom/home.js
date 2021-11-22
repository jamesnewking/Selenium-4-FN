export default class HomePage {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://infinite-v3.myshopify.com/`;
    this.urlVcQA = `https://infinite-v3.myshopify.com/?pb=0&_ab=0&_fd=0&_sc=1&preview_theme_id=98814885932`;
    this.homePageTitle = `Infinite V3`;
    this.PCPTitle = `All Products – Infinite V3`;

    this.preHeaderNextButton = {
      css: `div#PreHeader__announcements > div > button.next`,
    };

    this.navShop = { linkText: `Shop` };
    // this.navShop = {
    //   css: `nav.NavBar__primary > ul.NavList > li.NavList__heading > a[href="/collections/all"]`,
    // };
    this.navShopShoes = {
      css: `nav.NavBar__primary > ul > li > div > div > ul:nth-child(1)  > li > ul > li:nth-child(3) > a > i:nth-child(1)`,
    };
    this.navDocs = {
      css: `nav.NavBar__primary > ul.NavList > li.NavList__heading:nth-child(2) > a[href="#"]`,
    };
    this.navNews = { css: `nav.NavBar__primary > ul > li:nth-child(3) > a` };
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

    const navShop = await this.driver.wait(
      this.until.elementLocated(this.navShop)
    );
    const navShop_shoes = await this.driver.wait(
      this.until.elementLocated(this.navShopShoes)
    );
    const navDocs = await this.driver.wait(
      this.until.elementLocated(this.navDocs)
    );
    const navNews = await this.driver.wait(
      this.until.elementLocated(this.navNews)
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: navShop })
      .pause(500)
      .move({ origin: navShop_shoes })
      .pause(500)
      .move({ origin: navDocs })
      .pause(500)
      .move({ origin: navNews })
      .pause(500)
      .perform();
  }

  async clickNavShop() {
    const navShop = await this.driver.findElement(this.navShop);
    await navShop.click();
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }
}
