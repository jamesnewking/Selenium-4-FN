import scrollPastElement from "../helper/scrollPastElement";
import scrollIntoView from "../helper/scrollIntoView";
import slowScrollDown from "../helper/slowScrollDown";
export default class PCP {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://www.fashionnova.com/collections/dresses`;
    this.PCPTitle = `Women's Dresses | Fashion Dresses For Women | Fashion Nova`;

    this.productTileClassesAll = {
      css: `#MainContent > div.collection-layout > div.collection-layout__products > div.collection-list > div > div.collection-list__product-tile`,
    };
    this.loadMore = { linkText: `Load more` };
    this.sortOrder = { css: `button.collection-layout__show-sort-order`};
    this.productTileIndex = 1;
    this.productTileTopDiv;
    this.productTitle;
    this.productBaseImg;
    this.productPrice;
    this.productPriceCompareAt;

    this.setProductTile(this.productTileIndex);
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    console.log(`debug ${await this.driver.getTitle()}`);
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }

  setProductTile(index) {
    this.productTileIndex = index;
    this.productTileTopDiv = {
      css: `#MainContent > div.collection-layout > div.collection-layout__products > div.collection-list > div > div.collection-list__product-tile:nth-child(${this.productTileIndex})`,
    };
    this.productTitle = {
      css: `#MainContent > div.collection-layout > div.collection-layout__products > div.collection-list > div > div.collection-list__product-tile:nth-child(${this.productTileIndex}) form > div.product-tile__content-line > div.product-tile__product >  div.product-tile__product-title > a`,
    };
    this.productBaseImg = {
      css: `#splide${this.productTileIndex}-slide01 > img`,
    }; //need to convert the tile index to two digits if less than 10 and add 0 ( if 5 it needs to be #splide05)
    this.productPrice = {
      css: `#MainContent > div.collection-layout > div.collection-layout__products > div.collection-list > div > div.collection-list__product-tile:nth-child(${this.productTileIndex}) form div.product-tile__content-line div.product-tile__price-line span.product-tile__price`,
    };
    this.productPriceCompareAt = {
      css: `#MainContent > div.collection-layout > div.collection-layout__products > div.collection-list > div > div.collection-list__product-tile:nth-child(${this.productTileIndex}) form div.product-tile__content-line div.product-tile__price-line span.product-tile__compare-at-price`,
    };
  }

  async getProductTileInfo() {
    await scrollPastElement(this.driver, this.until, this.productPrice, 400);
    const info = {};
    const productTitleEle = await this.driver.findElement(this.productTitle);
    const productPriceEle = await this.driver.findElement(this.productPrice);
    info.onSale = false;
    const productPriceCompareAtArr = await this.driver.findElements(this.productPriceCompareAt);
    const productIsOnSale = productPriceCompareAtArr.length;
    if(productIsOnSale){
      const productPriceCompareAtEle = await this.driver.findElement(this.productPriceCompareAt);
      info.onSale = true;
      info.priceCompareAt = await productPriceCompareAtEle.getText();
    }
    await this.driver.wait(this.until.elementIsVisible(productTitleEle));
    info.title = await productTitleEle.getText();
    info.price = await productPriceEle.getText();
    console.log(
      `debug ${await this.driver.findElement(this.productTitle).getText()}`
    );
    return info;
  }

  async getPageTitle(title = this.title) {
    return await this.driver.getTitle();
  }

  async getNumberOfProductTiles() {
    await scrollPastElement(this.driver, this.until, this.loadMore, 800);
    await scrollPastElement(this.driver, this.until, this.sortOrder, 140);
    await this.driver.sleep(1000);
    await slowScrollDown(this.driver, 1000, 8);
    const productArray = await this.driver.findElements(
      this.productTileClassesAll
    );
    await scrollPastElement(this.driver, this.until, this.sortOrder, 140);
    return productArray.length;
  }

  async pressPDP() {
    await this.driver.findElement(this.productTitle).click();
  }

  async getAllProductsOnPage() {
    const numberOfProducts = await this.getNumberOfProductTiles();
    console.log(`numberOfProducts ${numberOfProducts}`);
    const allProductInfo = [];
    for (let i = 1; i <= numberOfProducts; i++) {
      console.log(i);
      this.setProductTile(i);
      allProductInfo.push(await this.getProductTileInfo());
      console.log(await this.getProductTileInfo());
    }
    return allProductInfo;
  }
}