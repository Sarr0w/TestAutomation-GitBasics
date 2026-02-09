import { Locator, Page } from '@playwright/test'; // Махаме expect от импорта
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Локатори
    readonly userMenuButton: Locator = this.page.getByTestId('loggedUserName');
    readonly homePageButton: Locator = this.page.getByTestId('home-button');
    readonly logoutButton: Locator = this.page.getByTestId('logout');
    // Добавяме и този локатор тук, за да го ползваме в теста по-късно
    readonly loginHeaderButton: Locator = this.page.locator('.user-login-button #buttonHeaderLogin');

    // --- Actions ---

    // 1. Махаме verifyUserIsLoggedIn(). 
    // Няма нужда от метод, защото локаторът userMenuButton е public (readonly) 
    // и можем да го проверим директно в теста.

    // 2. Изчистваме logout() само до действията
    async logout() {
        await this.userMenuButton.click(); 
        await this.logoutButton.click();  
        // Махаме expect-а от тук!
    }
}