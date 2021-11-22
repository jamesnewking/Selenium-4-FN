export default class Cart {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://infinite-v3.myshopify.com/#cart/`;

    this.cartCloseX = {
      css: `#shopify-section-INF-Header > div.Headroom--preheader.Headroom--disabled-mobile.Headroom.Headroom--top.Headroom--not-bottom > div.PreHeader.PreHeader--hide-mobile.Section.Section--relative.Section--full > div > div.PreHeader__icons > a:nth-child(5) > span > span.IconToggle__open > div`,
    };
    this.cartContinueShopping = {
      css: `#cart_form > div.SliderCart__contents > div.SliderCart__bottom > div`,
    };

    this.cartProductIndex = 1;
    this.cartProductTitle;
    this.cartProductOptions;
    this.cartPurchasePrice;
    // this.cartProductRecurrence;
    // this.cartProductFrequency;
    //this.cartTotalPrice = { 'css' : `#cart_form > div:nth-child(1) > div.StickyCheckout__subtotal > div.StickyCheckout__value > span`};//need to strip $ and , then convert to number
    //this.cartTotalItems = { 'css' : `#cart_form > div:nth-child(1) > div.StickyCheckout__subtotal > div > p.StickyCheckout__items--desktop > span:nth-child(1)`};
    this.cartTopRightOpen = {
      css: `#shopify-section-INF-Header > div.Headroom--disabled.Headroom--disabled-mobile > div.Header.Header--has-preheader.Header--buttons-placement-preheader > header.Header__desktop.Section.Section--fixed.Section--side-gutters > div.Section__container > div > div.NavBar__icons > a:nth-child(3)`,
    };
    this.cartProceedToCheckout = {
      css: `div#SliderCart > form#CartForm > div.Form__body > div.StickyCheckout:nth-child(1) input.StickyCheckout__button--desktop`,
    };
    this.setCartProduct(this.cartProductIndex);
  }

  setCartProduct(index = 1) {
    //the top product in side cart has index of 1
    this.cartProductTitle = {
      css: `div#SliderCart > form#CartForm > div.Form__body > div.SliderCart__contents > div.SliderCart__products > div.CartItem:nth-child(${this.cartProductIndex}) > div.CartItem__info > a`,
    };
    this.cartProductOptions = {
      css: `div#SliderCart > form#CartForm > div.Form__body > div.SliderCart__contents > div.SliderCart__products > div.CartItem:nth-child(${this.cartProductIndex}) div.CartItem__options > span`,
    };
    this.cartPurchasePrice = {
      css: `div#SliderCart > form#CartForm > div.Form__body > div.SliderCart__contents > div.SliderCart__products > div.CartItem:nth-child(${this.cartProductIndex}) div.CartItem__price`,
    };
    // this.cartProductRecurrence = {
    //   css: `#cart_form > div.SliderCart__contents > div.SliderCart__products > div:nth-child(${this.cartProductIndex}) > div.CartProduct__info > div.CartProduct__subscription`,
    // };
    // this.cartProductFrequency = {
    //   css: `#cart_form > div.SliderCart__contents > div.SliderCart__products > div:nth-child(${this.cartProductIndex}) > div.CartProduct__info > div.CartProduct__subscription > span`,
    // };
  }

  async getCartProductInfo() {
    const outputProductInfoObject = {
      title: null,
      price_purchase: null,
      options: null,
    };
    const productTitle = await this.driver.wait(
      this.until.elementLocated(this.cartProductTitle)
    );
    await this.driver.wait(this.until.elementIsVisible(productTitle));
    outputProductInfoObject.title = await productTitle.getText();
    outputProductInfoObject.title = outputProductInfoObject.title.trim();
    outputProductInfoObject.price_purchase = await this.driver
      .findElement(this.cartPurchasePrice)
      .getText();
    outputProductInfoObject.options = await this.driver
      .findElement(this.cartProductOptions)
      .getText();

    for (let key in outputProductInfoObject) {
      if (outputProductInfoObject[key]) {
        outputProductInfoObject[key] = outputProductInfoObject[
          key
        ].toUpperCase();
      }
    }
    return outputProductInfoObject;
  }

  async clickProceedToCheckout() {
    // await this.driver.wait( this.until.elementIsVisible( this.driver.findElement( this.cartTopRightOpen  )), 4000 );
    // await this.driver.findElement( this.cartTopRightOpen ).click();
    await this.driver.wait(
      this.until.elementIsVisible(
        this.driver.findElement(this.cartProceedToCheckout)
      ),
      5000
    );
    await this.driver.findElement(this.cartProceedToCheckout).click();
  }
}