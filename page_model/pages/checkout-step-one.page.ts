import { Selector, t } from 'testcafe';
import { AppCommon } from './app-common.page';

export class CheckOutStepOne extends AppCommon {
  continueButton = Selector('.btn_primary.cart_button');
  firstNameField = Selector('#first-name');
  lastNameField = Selector('#last-name');
  postalCodeField = Selector('#postal-code');

  constructor() {
    super();
  }

  async clickOnContinueButton() {
    return await t.click(this.continueButton);
  }

  async getErrorMessageText() {
    return await this.errorMessage.innerText;
  }

  async typeInFirstNameField(value: string) {
    return await t.typeText(this.firstNameField, value);
  }

  async typeInLastNameField(value: string) {
    return await t.typeText(this.lastNameField, value);
  }

  async typeInPostalCodeField(value: string) {
    return await t.typeText(this.postalCodeField, value);
  }
}
