import { validUser } from "../data/users.data";
import { LoginPage } from "../pages/login.page";

export async function loginUser(user: typeof validUser) {
  const loginPage = new LoginPage();

  await loginPage.typeInUsernameField(user.username);
  await loginPage.typeInPasswordField(user.password);
  await loginPage.clickInLoginButton();
}
