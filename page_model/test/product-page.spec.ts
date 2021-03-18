import { ClientFunction, t } from "testcafe";
import { validUser } from "../data/users.data";
import { InventoryPage } from "../pages/Inventory.page";
import { loginUser } from "../utils/login-user.util";

const getWindowLocation = ClientFunction(() => window.location.href);
let inventoryPage: InventoryPage = null;

fixture("product-page Suite")
  .page("https://www.saucedemo.com/")
  .beforeEach(async t => {
    inventoryPage = new InventoryPage();

    return t;
  });

test("Logout from product page", async t => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickOnHamburgerButton();
  await inventoryPage.clickOnLogoutLink();

  await t.expect(await getWindowLocation()).eql("https://www.saucedemo.com/");
});

test("Navigate to the shopping cart", async () => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickOnCartLink();

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/cart.html");
});

test("Add a single item to the shopping cart", async () => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickAddToCartButton(1);

  await t.expect(await inventoryPage.getShoppingCartValue()).eql("1");
});

test("Add a multiple items to the shopping cart", async () => {
  await loginUser(validUser);

  await t
    .expect(await getWindowLocation())
    .eql("https://www.saucedemo.com/inventory.html");

  await inventoryPage.clickAddToCartButton(1);
  await inventoryPage.clickAddToCartButton(3);
  await inventoryPage.clickAddToCartButton(5);

  await t.expect(await inventoryPage.getShoppingCartValue()).eql("3");
});
