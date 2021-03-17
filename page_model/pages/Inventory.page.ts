import { Selector, t } from "testcafe";
import { AuthSelectorPage } from "./auth-selector.page";

export class InventoryPage extends AuthSelectorPage {
  inventoryItems = Selector(".inventory_list").find(".inventory_item");

  constructor() {
    super();
  }

  async clickOnHamburgerButton() {
    return await t.click(this.hamburgerButton);
  }

  async clickOnLogoutLink() {
    return t.click(this.logoutLink);
  }

  async clickOnCartLink() {
    return t.click(this.shoppingCartLink);
  }

  async clickAddToCartButton(listItem: number) {
    return await t.click(`.inventory_item:nth-child(${listItem}) button`);
  }

 async getShoppingCartValue () {
    return  await this.shoppingCartLink.find('.shopping_cart_badge').innerText
  }

  getInventoryItem(listItem: number) {
    return {
      img: Selector(`.inventory_item:nth-child(${listItem}) img`),
      title: Selector(
        `.inventory_item:nth-child(${listItem}) .inventory_item_name`
      ),
      description: Selector(
        `.inventory_item:nth-child(${listItem}) .inventory_item_desc`
      ),
      price: Selector(
        `.inventory_item:nth-child(${listItem}) .inventory_item_price`
      ),
    };
  }
}
