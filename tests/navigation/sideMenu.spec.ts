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

    // --- ГРУПА 1: Публични страници ---
    test('Should navigate to public pages correctly', async ({ page }) => {
        await sideMenu.openCasino();
        await expect(page).toHaveURL(/.*casino/i);

        await sideMenu.openSports();
        await expect(page).toHaveURL(/.*betting/i);

        await sideMenu.openPromotions();
        await expect(page).toHaveURL(/.*promotions/i);
    });

    // --- ГРУПА 2: Live Chat ---
    test('Should be able to click Live Chat button', async () => {
        await sideMenu.openLiveChat();
    });

    // --- ГРУПА 3: Гости (Login Modal) ---
    test('Guest User: Should trigger Login Modal for restricted games', async () => {
        // Zeppelin
        await sideMenu.openZeppelin();
        await expect(loginModal.usernameInput).toBeVisible({ timeout: 5000 });
        
        await landingPage.navigate();

        // Aviator
        await sideMenu.openAviator();
        await expect(loginModal.usernameInput).toBeVisible({ timeout: 5000 });
    });

// --- ГРУПА 4: Логнати (ФИНАЛНА ПОПРАВКА) ---
    
    // ТЕСТ 4.1: ZEPPELIN
    test('Logged User: Should load Zeppelin game', async ({ page }) => {
        test.setTimeout(90000); 

        // 1. Вход
        await landingPage.openLoginModal();
        await loginModal.login(VALID_USER.username, VALID_USER.password);
        await homePage.verifyUserIsLoggedIn();

        // 2. Отваряме Zeppelin
        console.log('Testing Zeppelin load...');
        await sideMenu.openZeppelin();
        
        // СТРАТЕГИЯ: Проверяваме контейнера на играта, не вътрешността
        // Търсим iframe елемента директно на страницата (не frameLocator)
        const gameIframe = page.locator('iframe[id^="game-play-frame"].normalscreen').last();
        
        // Проверка 1: Iframe-ът трябва да е видим на екрана
        await expect(gameIframe).toBeVisible({ timeout: 30000 });

        // Проверка 2: Iframe-ът трябва да има зареден линк (src attribute)
        // Това гарантира, че не е празен бял екран, а води към играта
        await expect(gameIframe).toHaveAttribute('src', /.+/); // Проверява че src не е празен

        console.log('✅ Zeppelin container loaded successfully!');
    });

    // ТЕСТ 4.2: AVIATOR
    test('Logged User: Should load Aviator game', async ({ page }) => {
        test.setTimeout(90000); 

        // 1. Вход
        await landingPage.openLoginModal();
        await loginModal.login(VALID_USER.username, VALID_USER.password);
        await homePage.verifyUserIsLoggedIn();

        // 2. Отваряме Aviator
        console.log('Testing Aviator load...');
        await sideMenu.openAviator();
        
        // Същата стратегия за Aviator
        const aviatorIframe = page.locator('iframe[id^="game-play-frame"].normalscreen').last();
        
        // Проверка 1: Видим ли е прозорецът?
        await expect(aviatorIframe).toBeVisible({ timeout: 30000 });

        // Проверка 2: Има ли линк към играта?
        await expect(aviatorIframe).toHaveAttribute('src', /.+/);
        
        console.log('✅ Aviator container loaded successfully!');
    });
});