import scrollPastElement from "../helper/scrollPastElement";
import scrollIntoView from "../helper/scrollIntoView";
export default class PCP {
  constructor(driver, until) {
    this.driver = driver;
    this.until = until;
    this.url = `https://infinite-v3.myshopify.com/collections/all`;
    this.PCPTitle = `All Products – Infinite V3`;

    this.productTileClassesAll = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile`,
    };

    this.productTileIndex = 1;
    this.productTileTopDiv;
    this.productTileTitle;
    this.productTileBaseImg;
    this.productTileQuickViewButton;
    this.productTilePrice;
    this.setProductTile(this.productTileIndex);

    //quickView
    this.quickViewProductTitle = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductHeading > h1`,
    };
    this.quickViewPurchasePrice = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductHeading > div.Price`,
    };
    this.quickViewProductSaleCompareAtPrice = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductHeading > div.Price > s.Price__compare-at`,
    };
    this.quickViewProductSalePrice = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductHeading > div.Price > span`,
    };
    this.quickViewProductOptionIndex = 1;
    this.quickViewProductOptionsAll = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductOptions > form> div.Form__body > div > div.ProductOption`,
    };
    this.quickViewProductOptionLabel;
    this.quickViewProductOptionSelected;
    this.setQuickViewProductOption(this.quickViewProductOptionIndex);
    this.quickViewAddToCartButton = {
      css: `div.ProductAddToCartButton > form > button`,
    };
    this.quickViewCloseX = {
      css: `#QuickView > div.Modal__content > div > div.CloseIcon`,
    };
    //quickView
  }

  async openPage(url = this.url) {
    await this.driver.get(url);
    console.log(`debug ${await this.driver.getTitle()}`);
    await this.driver.wait(this.until.titleIs(this.PCPTitle), 1000);
  }

  setProductTile(index) {
    this.productTileIndex = index;
    this.productTileTopDiv = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile:nth-child(${this.productTileIndex})`,
    };
    this.productTitle = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile:nth-child(${this.productTileIndex}) > div.ProductTile__content > p > a`,
    };
    this.productBaseImg = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile:nth-child(${this.productTileIndex}) > a > img`,
    };
    this.productQuickViewButton = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile:nth-child(${this.productTileIndex}) > a > div.QuickView__button`,
    };
    this.productPrice = {
      css: `div.Overlay > div.Overlay__content div.InstantSearch__grid > div.ProductTile:nth-child(${this.productTileIndex}) > div.ProductTile__content > div.Price`,
    };
  }

  async getProductTileInfo() {
    await scrollPastElement(this.driver, this.productPrice, -160);
    const info = {};
    //await this.driver.sleep(500);
    const productTitleEle = await this.driver.findElement(this.productTitle);
    const productPriceEle = await this.driver.findElement(this.productPrice);
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
    const productArray = await this.driver.findElements(
      this.productTileClassesAll
    );
    return productArray.length;
  }

  async pressQuickView() {
    const productImageArray = await this.driver.findElements(
      this.productBaseImg
    );
    if (productImageArray.length) {
      let singleProductElement = await this.driver.findElement(
        this.productBaseImg
      );
      const actions = this.driver.actions({ bridge: true });
      await actions
        .move({ duration: 1500, origin: singleProductElement, x: 100, y: 300 })
        .pause(500)
        .perform(); //changed to y:300 for ff
      await this.driver.findElement(this.productQuickViewButton).click();
      return true;
    } else {
      return false;
    }
  }

  setQuickViewProductOption(index = 1) {
    this.quickViewProductOptionIndex = index;
    this.quickViewProductOptionLabel = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductOptions > form> div.Form__body > div > div.ProductOption:nth-child(${this.quickViewProductOptionIndex}) > div> div > div > label`,
    };
    this.quickViewProductOptionSelected = {
      css: `#sectionINF-ProductQuickView > div > div > div.ProductInfo > div.ProductOptions > form> div.Form__body > div > div.ProductOption:nth-child(${this.quickViewProductOptionIndex}) > div> div > div > select > option:nth-child(2)`,
    };
  }

  async getQuickViewProductInfo() {
    const qvProductInfoObj = {
      title: null,
      price_purchase: null,
      price_SaleCompareAtPrice: null,
      price_SalePrice: null,
      numberOfOptions: null,
      optionArr: [],
    };
    let qvProductTitleElement = await this.driver.wait(
      this.until.elementLocated(this.quickViewProductTitle)
    );
    qvProductInfoObj.title = await qvProductTitleElement.getText();
    const salePriced = await this.driver.findElements(
      this.quickViewProductSaleCompareAtPrice
    );
    if (salePriced.length) {
      qvProductInfoObj.price_SaleCompareAtPrice = await this.driver
        .findElement(this.quickViewProductSaleCompareAtPrice)
        .getText();
      qvProductInfoObj.price_SalePrice = await this.driver
        .findElement(this.quickViewProductSalePrice)
        .getText();
    } else {
      qvProductInfoObj.price_purchase = await this.driver
        .findElement(this.quickViewPurchasePrice)
        .getText();
    }

    const qvOptionEleArray = await this.driver.findElements(
      this.quickViewProductOptionsAll
    );

    qvProductInfoObj.numberOfOptions = qvOptionEleArray.length;
    if (qvProductInfoObj.numberOfOptions) {
      for (let i = 1; i <= qvProductInfoObj.numberOfOptions; i++) {
        this.setQuickViewProductOption(i);
        await scrollIntoView(
          this.driver,
          this.until,
          this.quickViewProductOptionLabel
        );
        const optionLabel = await this.driver
          .findElement(this.quickViewProductOptionLabel)
          .getText();
        const optionSelectedText = await this.driver
          .findElement(this.quickViewProductOptionSelected)
          .getAttribute(`value`);
        const optionObj = {};
        optionObj[optionLabel] = optionSelectedText;
        qvProductInfoObj.optionArr.push(optionObj);
      }
    }
    return qvProductInfoObj;
  }

  async quickViewAddToCart() {
    console.log(`Debug: quickViewAddToCart()`)
    await scrollIntoView(
      this.driver,
      this.until,
      this.quickViewAddToCartButton
    );
    await this.driver.findElement(this.quickViewAddToCartButton).click();
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