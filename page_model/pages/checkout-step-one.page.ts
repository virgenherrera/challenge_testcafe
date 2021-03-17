import { Selector } from "testcafe";
import { AppCommon } from "./app-common.page";

export class CheckOutStepOne extends AppCommon {
  continuoButton = Selector(".btn_primary.cart_button");
  firstNameField = Selector("#first-name");
  lastNameField = Selector("#last-name");
  postalCodeField = Selector("#postal-code");

  constructor() {
    super();
  }
}

