import { Selector, t } from "testcafe";
import { AppCommon } from "./app-common.page";

export class LoginPage extends AppCommon {
  usernameField = Selector("#user-name");
  passwordField = Selector("#password");
  loginButton = Selector("#login-button");
  labelProduct = Selector(".product_label");

  constructor() {
    super();
  }

  async typeInUsernameField(value: string) {
    return await t.typeText(this.usernameField, value);
  }

  async typeInPasswordField(value: string) {
    return await t.typeText(this.passwordField, value);
  }

  async clickInLoginButton() {
    return await t.click(this.loginButton);
  }
}
