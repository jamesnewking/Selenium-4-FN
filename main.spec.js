import { Builder, By, Key, until } from "selenium-webdriver";
import HomePage from "./pom/home";
import PCP from "./pom/pcp";
import PDP from "./pom/pdp";
import Cart from "./pom/cart";
import CheckOut from "./pom/checkout";
import waitForSafari from "./helper/waitForSafari";
import scrollIntoView from "./helper/scrollIntoView";
import closePreviewBar from "./helper/closePreviewBar";
//import { addConsoleHandler } from "selenium-webdriver/lib/logging";
let chrome = require('selenium-webdriver/chrome');
jest.setTimeout(40000);
let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().addArguments("--disable-notifications"))
  .build();
//let driver = new Builder().forBrowser("safari").build();

describe(`Infinite V3 automation testing`, () => {

  beforeAll(async () => {
    await driver.manage().window().setRect({ width: 1024, height: 768 });
    // await driver.manage().window().maximize();
  });

  afterAll(async () => {
    // await driver.close();
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

  test.only("Close pop up offer", async () => {
    let homePage = new HomePage(driver, until);
    await homePage.closePopUp();
  });

  test.skip("Scroll desktop NAV bar", async () => {  
    let homePage = new HomePage(driver, until);
    await homePage.hoverNavBar();
  });

  test.only("Open PCP", async () => {
    let homePage = new HomePage(driver, until);
    await homePage.clickNavDresses();
  });

  test.only("Number of PCP", async () => {
    let pcp = new PCP(driver, until);
    console.log(`Number of Product Tiles found`);
    console.log(await pcp.getNumberOfProductTiles());
    //expect(await pcp.getNumberOfProductTiles()).toBe(13);
  });

  test.only("PCP product info", async () => {
    let pcp = new PCP(driver, until);
    //await pcp.openPage();
    pcp.setProductTile(8);
    console.table( await pcp.getProductTileInfo() );
    await pcp.pressPDP();
  });

  test.only("PDP product info", async () => {
    await driver.sleep(2000);
    let pdp = new PDP(driver, until);
    console.table( await pdp.getProductInfo() );
    console.log(`size: ${await pdp.selectProductOptions()}`);
    await pdp.addToBag();
    await pdp.openCart();
  });

  test.only("Cart info", async () => {
    await driver.sleep(5000);
    let cart = new Cart(driver, until);
    console.table(await cart.getCartProductInfo());
    // await driver.sleep(1000);
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
