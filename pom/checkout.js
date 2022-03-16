export default class CheckOut {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.productIndex = 1;
    this.cartProductTitle;
    this.cartProductOptions;
    this.cartProductPrice;
    this.cartProductQty;
    this.cartProductClassAll = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr`,
    };
    this.setCartProduct(1);
    this.scrollForMoreItems = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list.order-summary__section--is-scrollable > div > div`,
    };
  }

  setRechargeCartProduct(index) {
    this.productIndex = index; 
    this.cartProductTitle = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__name > strong`,
    };
    this.cartProductOptions = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__description`,
    };
    this.cartProductPrice = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > strong.product__price`,
    };
    this.cartProductQty = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__name`,
    };
  }

  setCartProduct(index) {
    this.productIndex = index;                              
    this.cartProductTitle = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr:nth-child(${this.productIndex}) > th.product__description > span.product__description__name.order-summary__emphasis`,
    };
    this.cartProductOptions = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr:nth-child(${this.productIndex}) > th > span.product__description__variant.order-summary__small-text`,
    };
    this.cartProductPrice = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr:nth-child(${this.productIndex}) > td.product__price > span`,
    };
    this.cartProductQty = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr:nth-child(${this.productIndex}) > tr > td.product__quantity.visually-hidden`,
    };
  }

  async getSingleCartProductInfo() {
    const outputCartProductInfoObject = {
      title: null,
      price_purchase: null,
      options: null,
    };
    outputCartProductInfoObject.title = await this.driver
      .findElement(this.cartProductTitle)
      .getText();
    outputCartProductInfoObject.price_purchase = await this.driver
      .findElement(this.cartProductPrice)
      .getText();
    outputCartProductInfoObject.price_purchase = outputCartProductInfoObject.price_purchase.trim();
    outputCartProductInfoObject.options = await this.driver
      .findElement(this.cartProductOptions)
      .getText();
    for (let key in outputCartProductInfoObject) {
      if (
        outputCartProductInfoObject[key] &&
        typeof outputCartProductInfoObject[key] !== `boolean`
      ) {
        outputCartProductInfoObject[key] = outputCartProductInfoObject[
          key
        ].toUpperCase();
      }
    }
    return outputCartProductInfoObject;
  }

  async scrollIntoView(elementLocator) {
    let singleProductElement = await this.driver.findElement(elementLocator);
    await this.driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      singleProductElement
    );
    //await this.driver.executeScript( "arguments[0].scrollIntoView(false);", singleProductElement );
  }

  async getAllCartProductInfo() {
    const outputArray = [];
    let productsInCartArray = null;
    let numberOfProductsInCart = 0;
  
    await this.driver.wait(
      this.until.elementLocated(this.cartProductTitle),
      8000
    );
    productsInCartArray = await this.driver.findElements(
      this.cartProductClassAll
    );
    numberOfProductsInCart = productsInCartArray.length;
    for (
      let currentProductIndex = 1;
      currentProductIndex <= numberOfProductsInCart;
      currentProductIndex++
    ) {
      this.setCartProduct(currentProductIndex);
      const cartProductInfo = await this.getSingleCartProductInfo();
      outputArray.unshift(cartProductInfo);
    }
    
    return outputArray;
  }
}
