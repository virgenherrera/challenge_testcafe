import { Selector, t } from 'testcafe';

export class CartPage {
  checkoutButton = Selector('.cart_footer .checkout_button');

  async clickOnCheckoutButton() {
    return await t.click(this.checkoutButton);
  }
}
