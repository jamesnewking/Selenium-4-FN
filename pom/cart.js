export default class Cart {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://www.fashionnova.com/cart`;

    this.cartProductIndex = 1;
    this.cartProductTitle;
    this.cartProductColor;
    this.cartPricePurchase;
    this.cartPriceCompareAt;
    this.setCartProduct(this.cartProductIndex);

    this.checkOutButton = {
      css: `a.cart-page__checkout-CTA`,
    };
  }

  setCartProduct(index = 1) {
    //the top product in side cart has index of 1
    this.cartProductTitle = {
      css: `tbody.cart-content__items > tr.cart-content__item:nth-child(${index}) > td.cart-content__item-price-area > a.cart-content__product-title`,
    };
    this.cartProductColor = {
      css: `tbody.cart-content__items > tr.cart-content__item:nth-child(${index}) > td.cart-content__item-price-area > div.cart-content__variant-line > button > span.cart-content__variant-title > span`,
    };
    this.cartPricePurchase = {
      css: `tbody.cart-content__items > tr.cart-content__item:nth-child(${index}) > td.cart-content__item-price-area > div.cart-content__price-line > div.cart-content__item-price`,
    };
    this.cartPriceCompareAt = {
      css: `tbody.cart-content__items > tr.cart-content__item:nth-child(${index}) > td.cart-content__item-price-area > div.cart-content__price-line > div.cart-content__item-compare-at-price`,
    };
  }

  async getCartProductInfo() {
    const outputProductInfoObject = {
      title: null,
      price_purchase: null,
      price_compare_at: null,
      color: null,
    };
    const productTitle = await this.driver.wait(
      this.until.elementLocated(this.cartProductTitle)
    );
    await this.driver.wait(this.until.elementIsVisible(productTitle));
    outputProductInfoObject.title = await productTitle.getText();
    outputProductInfoObject.title = outputProductInfoObject.title.trim();
    outputProductInfoObject.price_purchase = await this.driver
      .findElement(this.cartPricePurchase)
      .getText();
    outputProductInfoObject.price_compare_at = await this.driver
      .findElement(this.cartPriceCompareAt)
      .getText();
    outputProductInfoObject.color = await this.driver
      .findElement(this.cartProductColor)
      .getText();

    for (let key in outputProductInfoObject) {
      if (outputProductInfoObject[key]) {
        outputProductInfoObject[key] = outputProductInfoObject[
          key
        ].toUpperCase();
      }
    }
    return outputProductInfoObject;
  };

  // async clickProceedToCheckout() {
  //   // await this.driver.wait( this.until.elementIsVisible( this.driver.findElement( this.cartTopRightOpen  )), 4000 );
  //   // await this.driver.findElement( this.cartTopRightOpen ).click();
  //   await this.driver.wait(
  //     this.until.elementIsVisible(
  //       this.driver.findElement(this.cartProceedToCheckout)
  //     ),
  //     5000
  //   );
  //   await this.driver.findElement(this.cartProceedToCheckout).click();
  // };

  async clickCheckout(){
    await this.driver.findElement(this.checkOutButton).click();
  };
}