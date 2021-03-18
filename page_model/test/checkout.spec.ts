import { ClientFunction, t } from "testcafe";
import { inventoryItems } from "../data/inventory-items.data";
import { userData, validUser } from "../data/users.data";
import { CartPage } from "../pages/cart.page";
import { CheckOutStepOne } from "../pages/checkout-step-one.page";
import { CheckoutStepTwo } from "../pages/checkout-step-two.page";
import { InventoryPage } from "../pages/Inventory.page";
import { loginUser } from "../utils/login-user.util";

const getWindowLocation = ClientFunction(() => window.location.href);
let inventoryPage: InventoryPage = null;
let cartPage: CartPage = null;
let checkOutStepOne: CheckOutStepOne = null;
let checkoutStepTwo: CheckoutStepTwo = null;

fixture("checkout Suite")
  .page("https://www.saucedemo.com/")
  .beforeEach(async t => {
    inventoryPage = new InventoryPage();
    cartPage = new CartPage();
    checkOutStepOne = new CheckOutStepOne();
    checkoutStepTwo = new CheckoutStepTwo();

    return t;
  });

test("Continue with missing mail information", async () => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickOnCartLink();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/cart.html");

  await cartPage.clickOnCheckoutButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-step-one.html");

  await checkOutStepOne.clickOnContinueButton();

  await t
    .expect(await checkOutStepOne.getErrorMessageText())
    .eql("Error: First Name is required");
});

test("Fill user's information", async t => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickOnCartLink();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/cart.html");

  await cartPage.clickOnCheckoutButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-step-one.html");

  await checkOutStepOne.typeInFirstNameField(userData.name);
  await checkOutStepOne.typeInLastNameField(userData.last);
  await checkOutStepOne.typeInPostalCodeField(userData.cp);
  await checkOutStepOne.clickOnContinueButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-step-two.html");
});

test("Final order items", async t => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  for await (const item of inventoryItems) {
    await inventoryPage.clickAddToCartButton(item.id);
  }

  await t
    .expect(inventoryPage.getShoppingCartValue())
    .eql(`${inventoryItems.length}`);

  await inventoryPage.clickOnCartLink();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/cart.html");

  await cartPage.clickOnCheckoutButton();

  await checkOutStepOne.typeInFirstNameField(userData.name);
  await checkOutStepOne.typeInLastNameField(userData.last);
  await checkOutStepOne.typeInPostalCodeField(userData.cp);
  await checkOutStepOne.clickOnContinueButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-step-two.html");

  for (let idx = 0; idx < inventoryItems.length; idx++) {
    const inventoryItem = inventoryItems[idx];
    const item = await checkoutStepTwo.getCheckedOutItem(idx + 1);

    await t.expect(item.name).eql(inventoryItem.name);
    await t.expect(item.description).eql(inventoryItem.description);
    await t.expect(item.price).eql(inventoryItem.price);
  }
});

test("Complete purchase", async t => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");
  d;

  for await (const item of inventoryItems) {
    await inventoryPage.clickAddToCartButton(item.id);
  }

  await t
    .expect(inventoryPage.getShoppingCartValue())
    .eql(`${inventoryItems.length}`);

  await inventoryPage.clickOnCartLink();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/cart.html");

  await cartPage.clickOnCheckoutButton();

  await checkOutStepOne.typeInFirstNameField(userData.name);
  await checkOutStepOne.typeInLastNameField(userData.last);
  await checkOutStepOne.typeInPostalCodeField(userData.cp);
  await checkOutStepOne.clickOnContinueButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-step-two.html");

  for (let idx = 0; idx < inventoryItems.length; idx++) {
    const inventoryItem = inventoryItems[idx];
    const item = await checkoutStepTwo.getCheckedOutItem(idx + 1);

    await t.expect(item.name).eql(inventoryItem.name);
    await t.expect(item.description).eql(inventoryItem.description);
    await t.expect(item.price).eql(inventoryItem.price);
  }

  await checkoutStepTwo.clickOnFinishButton();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/checkout-complete.html");
});
