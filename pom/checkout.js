export default class CheckOut {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.isReChargeCheckout = false;
    this.recurring = "RECURRING";
    this.oneTime = `ONE-TIME`;
    this.autoRenew = ` AUTO`;
    this.every = `Every `;
    this.productIndex = 1;
    this.cartProductTitle;
    this.cartProductOptions;
    this.cartProductFrequency = null;
    this.cartProductPrice;
    this.cartProductQty;
    this.cartProductClassAll = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr`,
    };
    this.setCartProduct(1);
    this.scrollForMoreItems = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list.order-summary__section--is-scrollable > div > div`,
    };
    this.reChargeLogo = { css: `body > div.admin-notice > a > img` };
    this.rechargeCartProductClassAll = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product`,
    };
    this.rechargeScrollForMoreItems = {
      css: `#order-summary > div > div.order-summary__section.order-summary__section--product-list.order-summary__section--is-scrollable > div > div`,
    };
  }

  setRechargeCartProduct(index) {
    this.productIndex = index; //body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__name > strong
    this.cartProductTitle = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__name > strong`,
    };
    this.cartProductOptions = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__description`,
    };
    this.cartProductFrequency = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product_info_frequency`,
    };
    this.cartProductPrice = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > strong.product__price`,
    };
    this.cartProductQty = {
      css: `body > div.main > div.wrap > div.order-summary > div.summary-body > div.order-summary__section.order-summary__section--product-list > ul > li.product:nth-child(${this.productIndex}) > div > span.product__info__name`,
    };
  }

  setCartProduct(index) {
    this.productIndex = index; //#order-summary > div > div.order-summary__section.order-summary__section--product-list > div > table > tbody > tr                                 > th > span.product__description__name.order-summary__emphasis
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

  async getSingleRechargeCartProductInfo() {
    const outputCartProductInfoObject = {
      title: null,
      price_purchase: null,
      purchase_type: null,
      options: null,
      frequency: null,
      isRechargeCheckout: true,
    };
    outputCartProductInfoObject.title = await this.driver
      .findElement(this.cartProductTitle)
      .getText();
    outputCartProductInfoObject.title = outputCartProductInfoObject.title.toUpperCase();
    outputCartProductInfoObject.title.trim();
    outputCartProductInfoObject.title = outputCartProductInfoObject.title.slice(
      0,
      outputCartProductInfoObject.title.indexOf(this.autoRenew)
    );
    outputCartProductInfoObject.price_purchase = await this.driver
      .findElement(this.cartProductPrice)
      .getText();
    outputCartProductInfoObject.price_purchase = outputCartProductInfoObject.price_purchase.trim();
    outputCartProductInfoObject.frequency = await this.driver
      .findElement(this.cartProductFrequency)
      .getText();
    outputCartProductInfoObject.frequency = outputCartProductInfoObject.frequency.replace(
      /\t/g,
      ""
    );
    outputCartProductInfoObject.frequency = outputCartProductInfoObject.frequency.replace(
      /\n/g,
      " "
    );
    outputCartProductInfoObject.frequency = outputCartProductInfoObject.frequency.trim();
    if (outputCartProductInfoObject.frequency.length) {
      outputCartProductInfoObject.purchase_type = this.recurring;
      outputCartProductInfoObject.frequency = outputCartProductInfoObject.frequency.slice(
        this.every.length
      );
    } else {
      outputCartProductInfoObject.purchase_type = this.oneTime;
    }
    outputCartProductInfoObject.options = await this.driver
      .findElement(this.cartProductOptions)
      .getText();
    //outputCartProductInfoObject.options = outputCartProductInfoObject.options.toUpperCase();
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

  async getSingleCartProductInfo() {
    const outputCartProductInfoObject = {
      title: null,
      price_purchase: null,
      purchase_type: null,
      options: null,
      frequency: null,
      isRechargeCheckout: false,
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

  // async waitForSafariOrFirefox(sleepTime) {
  //   const usingBrowser = await this.driver.executeScript(
  //     "return navigator.userAgent;"
  //   );
  //   //console.log(`browser: ${usingBrowser}`);
  //   const browserChromeLoc = usingBrowser.indexOf(`Chrome`);
  //   const browserSafariLoc = usingBrowser.indexOf(`Safari`);
  //   const browserFirefox = usingBrowser.indexOf(`Firefox`);
  //   if (
  //     (browserChromeLoc === -1 && browserSafariLoc != -1) ||
  //     browserFirefox != -1
  //   ) {
  //     await this.driver.sleep(sleepTime);
  //   }
  // }

  async getAllCartProductInfo() {
    const outputArray = [];
    let productsInCartArray = null;
    let numberOfProductsInCart = 0;
    try {
      await this.driver.findElement(this.reChargeLogo);
      this.isReChargeCheckout = true;
    } catch (error) {}
    if (this.isReChargeCheckout) {
      productsInCartArray = await this.driver.findElements(
        this.rechargeCartProductClassAll
      );
      numberOfProductsInCart = productsInCartArray.length;
      for (
        let currentProductIndex = 1;
        currentProductIndex <= numberOfProductsInCart;
        currentProductIndex++
      ) {
        this.setRechargeCartProduct(currentProductIndex);
        const cartProductInfo = await this.getSingleRechargeCartProductInfo();
        outputArray.unshift(cartProductInfo);
      }
    } else {
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
    }
    // productsInCartArray = await this.driver.findElements( this.cartProductClassAll );
    // numberOfProductsInCart = productsInCartArray.length;
    // try {
    //     this.setCartProduct(1);
    //     //await this.driver.sleep(2000);//for safari
    //     await this.driver.wait(this.webdriver.until.elementIsVisible( await this.driver.findElement(this.cartProductTitle) ),4000).catch( (err) => console.log(`Could not see the first product in final cart`));//debug final cart
    //     const firstProduct = await this.driver.findElement(this.cartProductTitle);
    //     const actions = this.driver.actions({bridge:true});
    //     await actions.move({duration:1500,origin:firstProduct,x:0,y:0}).perform();
    //     //await this.driver.findElement( this.cartProductTitle ).sendKeys(Keys.PAGE_DOWN);
    // } catch (error) {
    //     console.log(`no scrolling with error: ${error}`);
    // };

    // for(let currentProductIndex =1; currentProductIndex <= numberOfProductsInCart; currentProductIndex++){
    //     this.setCartProduct(currentProductIndex);
    //     const cartProductInfo = await this.getSingleCartProductInfo();
    //     outputArray.unshift(cartProductInfo);
    // };
    return outputArray;
  }
}
