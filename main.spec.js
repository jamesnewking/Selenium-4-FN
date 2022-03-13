import { Builder, By, Key, until } from "selenium-webdriver";
import HomePage from "./pom/home";
import PCP from "./pom/pcp";
import Cart from "./pom/cart";
import CheckOut from "./pom/checkout";
import waitForSafari from "./helper/waitForSafari";
import scrollIntoView from "./helper/scrollIntoView";
import closePreviewBar from "./helper/closePreviewBar";
//import { addConsoleHandler } from "selenium-webdriver/lib/logging";

let driver = new Builder().forBrowser("chrome").build();
//let driver = new Builder().forBrowser("safari").build();

describe(`Infinite V3 automation testing`, () => {

  beforeAll(async () => {
    await driver.manage().window().setRect({ width: 1024, height: 768 });
    // await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.close();
  });

  beforeEach(async () => {
    const previewTheme = await closePreviewBar(driver, until);
    if (!previewTheme.includes(`No preview theme`)) {
      console.log(`Preview theme: ${previewTheme}`);
    }
  });

  test.only("Home Page has title", async () => {
    let homePage = new HomePage(driver, until);
    await homePage.openPage(homePage.url);
    expect(await homePage.getPageTitle()).toBe(homePage.homePageTitle);
  });

  test.only("Scroll desktop NAV bar", async () => {
    let homePage = new HomePage(driver, until);
    //await driver.sleep(3000);
    await homePage.hoverNavBar();
  });

  test.only("Open PCP", async () => {
    let homePage = new HomePage(driver, until);
    await homePage.clickNavDresses();
  });

  test.skip("Number of PCP", async () => {
    let pcp = new PCP(driver, until);
    console.log(`Number of Product Tiles found`);
    console.log(await pcp.getNumberOfProductTiles());
    expect(await pcp.getNumberOfProductTiles()).toBe(13);
  });

  test.skip("PCP product info", async () => {
    let pcp = new PCP(driver, until);
    //await pcp.openPage();
    //console.table(await pcp.getAllProductsOnPage());
    pcp.setProductTile(10);
    await scrollIntoView(driver, until, pcp.productTileTopDiv);
    const qvPressed = await pcp.pressQuickView();
    console.log(`qvPressed ${qvPressed}`);

    if (qvPressed) {
      console.table(await pcp.getQuickViewProductInfo());
    }
    //console.log(await pcp.getQuickViewProductInfo());
    await driver.sleep(1000);
    await pcp.quickViewAddToCart();
    console.log('finished!');
  });

  test.skip("Cart info", async () => {
    let cart = new Cart(driver, until);
    console.table(await cart.getCartProductInfo());
    await driver.sleep(1000);
  });

  test.skip("Cart checkout", async () => {
    let cart = new Cart(driver, until);
    await waitForSafari(driver, 1000);
    await cart.clickProceedToCheckout();
    // await waitForSafari(driver, 2000);
    await driver.sleep(1000);
  });

  test.skip("Shopify checkout", async () => {
    let checkOut = new CheckOut(driver, until);
    console.table(await checkOut.getAllCartProductInfo());
    await driver.sleep(2000);
  });

});
