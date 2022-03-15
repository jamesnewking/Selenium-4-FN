// import scrollPastElement from "../helper/scrollPastElement";
import scrollIntoView from "../helper/scrollIntoView";
// import slowScrollDown from "../helper/slowScrollDown";
export default class PDP {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;

    this.productTitle = { 
      css: `h1.product-info__title`
    };

    this.productBaseImg = { 
      css: `div#product-slideshow__thumbnails.product-slideshow__thumbnails > div.product-slideshow__thumbnails-item.product-slideshow__thumbnails-item--image.product-slideshow__thumbnails-item-active > img.loader`,
    };
    this.productPrice = { 
      css: `span.product-info__price`,
    };
    this.productPriceCompareAt = { 
      css: `span.product-info__compare-at-price`,
    };

    this.productOptionsColorClassesAll = {
      css: `div.product-info__color-swatches > a.product-info__color-swatch-wrapper`,
    };
    this.productOptionsColorText = {
      css: `p.product-info__color-name`,
    };
    this.productOptionsSizeNumber = 1;
    this.productOptionsSizeClassesAll = {
      css: `label.product-info__size-button`,
    }; //need a way to find out of stock
    this.productOptionsSizeText = {
      css: `div.product-info__size-buttons > label.product-info__size-button:nth-child(${this.productOptionsSizeNumber}) > span.product-info__size-button-label`,
    };
    this.addToBagButton = {
      css: `button[type="submit"].product-info__add-to-bag`,
    };
    this.cartButton = {
      css: `a.header-links__link--cart`,
    };
  }

  async selectProductOptions() {
    const productOptionsColorArr = await this.driver.findElements(this.productOptionsColorClassesAll);
    //await productOptionsColorArr[0].click();
    const productOptionsSizeArr = await this.driver.findElements(this.productOptionsSizeClassesAll);
    await productOptionsSizeArr[0].click();
    const sizeText = await this.driver.findElement( this.productOptionsSizeText ).getText();
    return sizeText;
  }


  async openPage(url = this.url) {
    await this.driver.get(url);
    console.log(`debug ${await this.driver.getTitle()}`);
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }

  async getProductInfo() {
    // await scrollPastElement(this.driver, this.until, this.productPrice, 400);
    const info = {};
    await this.driver.sleep(500);
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
    info.color = await this.driver.findElement( this.productOptionsColorText ).getText();
    info.size = await this.driver.findElement( this.productOptionsSizeText ).getText();
    // console.log(
    //   `debug ${await this.driver.findElement( this.productTitle ).getText()}`
    // );
    return info;
  }

  async getPageTitle(title = this.title) {
    return await this.driver.getTitle();
  }

  async addToBag() {
    await scrollIntoView(
      this.driver, 
      this.until, 
      this.addToBagButton
      );
    await this.driver.findElement( this.addToBagButton ).click();
  }

  async openCart() {
    await scrollIntoView(
      this.driver, 
      this.until, 
      this.cartButton
      );
    await this.driver.findElement( this.cartButton ).click();
  }


}