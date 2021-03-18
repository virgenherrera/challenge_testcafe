import { Selector, t } from 'testcafe';
import { AuthSelectorPage } from './auth-selector.page';

export class InventoryPage extends AuthSelectorPage {
  inventoryItems = Selector('.inventory_list').find('.inventory_item');

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
    const selector = `.inventory_item:nth-child(${listItem}) button`;

    return await t.click(Selector(selector));
  }

  getShoppingCartValue() {
    const { innerText = '' } = this.shoppingCartLink.find(
      '.shopping_cart_badge',
    );

    return innerText;
  }
}
