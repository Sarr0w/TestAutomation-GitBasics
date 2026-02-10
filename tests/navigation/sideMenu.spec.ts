import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { SideMenu } from '../pages/components/sideMenu';
import { LoginModal } from '../pages/components/loginModal';
import { HomePage } from '../pages/homePage';

const VALID_USER = {
    username: 'zhulien_try',
    password: 'Password01'
};

test.describe('Side Menu Navigation & Game Access Tests', () => {
    let landingPage: LandingPage;
    let sideMenu: SideMenu;
    let loginModal: LoginModal;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        sideMenu = new SideMenu(page);
        loginModal = new LoginModal(page);
        homePage = new HomePage(page);

        await landingPage.navigate();
    });

    // --- Тест 1 Навигация в основните страници ---
    test('Should navigate to main pages correctly', async ({ page }) => {
        await sideMenu.openCasino();
        await expect(page, 'URL should contain "casino" after clicking Casino menu item').toHaveURL(/.*casino/i);

        await sideMenu.openSports();
        await expect(page, 'URL should contain "betting" after clicking Sports menu item').toHaveURL(/.*betting/i);

        await sideMenu.openPromotions();
        await expect(page, 'URL should contain "promotions" after clicking Promotions menu item').toHaveURL(/.*promotions/i);
    });

    // --- Тест 2 Навигация до Live Chat ---
    test('Should be able to click Live Chat button', async () => {
        await sideMenu.openLiveChat();
        // Тук няма expect в оригиналния код, но ако имаше, щяхме да добавим съобщение.
    });

    // --- Тест 3 Отваряне на login формата при стартиране на Zepplin и Aviator при не логнат юзър---
    test('Should trigger Login Modal for Zepplin and Aviator', async () => {
     
        await sideMenu.openZeppelin();
        await expect(loginModal.usernameInput, 'Login modal should appear when guest clicks Zeppelin').toBeVisible();
        
        await landingPage.navigate();

        await sideMenu.openAviator();
        await expect(loginModal.usernameInput, 'Login modal should appear when guest clicks Aviator').toBeVisible();
    });

    // ---Тест 4 Зареждане на играта Zeppelin за логнат потребител---
    test('Logged User: Should load Zeppelin game', async ({ page }) => {
        test.setTimeout(90000); 

        await landingPage.openLoginModal();
        await loginModal.login(VALID_USER.username, VALID_USER.password);
        await expect(homePage.userMenuButton, 'User must be logged in before accessing the game').toBeVisible();

        await sideMenu.openZeppelin();
        
        const gameIframe = page.locator('iframe[id^="game-play-frame"].normalscreen').last();
        
        await expect(gameIframe, 'Zeppelin game iframe should be visible').toBeVisible();
        await expect(gameIframe, 'Game iframe should have a valid src attribute').toHaveAttribute('src', /.+/); 
    });
});