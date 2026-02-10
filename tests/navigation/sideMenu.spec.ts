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
        await expect(page).toHaveURL(/.*casino/i);

        await sideMenu.openSports();
        await expect(page).toHaveURL(/.*betting/i);

        await sideMenu.openPromotions();
        await expect(page).toHaveURL(/.*promotions/i);
    });

    // --- Тест 2 Навигация до Live Chat ---
    test('Should be able to click Live Chat button', async () => {
        await sideMenu.openLiveChat();
    });

    // --- Тест 3 Отваряне на login формата при стартиране на Zepplin и Aviator при не логнат юзър---
    test('Should trigger Login Modal for Zepplin and Aviator', async () => {
     
        await sideMenu.openZeppelin();
        await expect(loginModal.usernameInput).toBeVisible({ timeout: 5000 });
        
        await landingPage.navigate();

        
        await sideMenu.openAviator();
        await expect(loginModal.usernameInput).toBeVisible({ timeout: 5000 });
    });

// ---Тест 4 Зареждане на играта Zeppelin за логнат потребител---

    test('Logged User: Should load Zeppelin game', async ({ page }) => {
        test.setTimeout(90000); 

      
        await landingPage.openLoginModal();
        await loginModal.login(VALID_USER.username, VALID_USER.password);
        await expect(homePage.userMenuButton).toBeVisible({ timeout: 30000 });

        await sideMenu.openZeppelin();
        
        const gameIframe = page.locator('iframe[id^="game-play-frame"].normalscreen').last();
        
      
        await expect(gameIframe).toBeVisible({ timeout: 30000 });
        await expect(gameIframe).toHaveAttribute('src', /.+/); 

});
});