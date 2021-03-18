import { Selector, t } from 'testcafe';
import { AuthSelectorPage } from './auth-selector.page';

export class CheckoutStepTwo extends AuthSelectorPage {
  inventoryItemsCartList = Selector('.cart_list').find('.cart_item');
  finishButton = Selector('.btn_action.cart_button');

  constructor() {
    super();
  }

  async getCheckedOutItem(cartItem: number) {
    const selector = `.cart_list .cart_item:nth-child(${cartItem + 2})`;
    const name = Selector(`${selector} .inventory_item_name`);
    const description = Selector(`${selector} .inventory_item_desc`);
    const price = Selector(`${selector} .inventory_item_price`);

    return {
      name: await name.innerText,
      description: await description.innerText,
      price: await price.innerText,
    };
  }

  async clickOnFinishButton() {
    return await t.click(this.finishButton);
  }
}
