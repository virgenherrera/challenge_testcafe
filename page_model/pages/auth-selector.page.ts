import { Selector } from 'testcafe'

export class AuthSelectorPage {
    hamburgerButton = Selector('#react-burger-menu-btn')
    logoutLink = Selector('#logout_sidebar_link')
    shoppingCartLink = Selector('#shopping_cart_container .shopping_cart_link')
}
