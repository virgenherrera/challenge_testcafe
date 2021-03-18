import { ClientFunction } from 'testcafe';
import { invalidUser, validUser } from '../data/users.data';
import { LoginPage } from '../pages/login.page';

const getWindowLocation = ClientFunction(() => window.location.href);
let loginPage: LoginPage = null;

fixture('Login testing')
  .page('https://www.saucedemo.com/')
  .beforeEach(async t => {
    loginPage = new LoginPage();

    return t;
  });

test('Login with a valid user', async t => {
  await loginPage.typeInUsernameField(validUser.username);
  await loginPage.typeInPasswordField(validUser.password);
  await loginPage.clickInLoginButton();

  await t
    .expect(await getWindowLocation())
    .eql('https://www.saucedemo.com/inventory.html');
});

test('Login with an Invalid User', async t => {
  await loginPage.typeInUsernameField(invalidUser.username);
  await loginPage.typeInPasswordField(invalidUser.password);
  await loginPage.clickInLoginButton();

  await t
    .expect(loginPage.errorMessage.innerText)
    .eql(
      'Epic sadface: Username and password do not match any user in this service',
    );
});
