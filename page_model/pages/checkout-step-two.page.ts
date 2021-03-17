import { Selector } from "testcafe";
import { AuthSelectorPage } from "./auth-selector.page";

export class CheckoutStepTwo extends AuthSelectorPage {
  inventoryItemsCartList = Selector(".cart_list").find(".cart_item");
  finishButton = Selector(".btn_action.cart_button");

  constructor() {
    super();
  }
  
  async getTextItem(cartItem: number) {
    const parentSelector = `.cart_list .cart_item:nth-child(${cartItem + 2})`;

    return {
      name: await Selector(`${parentSelector} .inventory_item_name`).innerText,
      description: await Selector(`${parentSelector} .inventory_item_desc`)
        .innerText,
      price: await Selector(`${parentSelector} .inventory_item_price`)
        .innerText,
    };
  }
}
