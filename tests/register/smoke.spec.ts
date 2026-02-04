import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterModal } from '../pages/components/registerModal';
import { HomePage } from '../pages/homePage';

// --- ХЕЛПЪР ФУНКЦИИ (Копираме ги, за да генерираме уникални данни) ---
const generateIdSuffix = () => {
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${ts}${rnd}`;
};

const buildRandomName = (suffix: string) => {
    const letters = (suffix + "abcde").replace(/[^a-zA-Z]/g, "");
    const padded = letters.padEnd(5, "a").slice(0, 10);
    return padded.charAt(0).toUpperCase() + padded.slice(1);
};

test.describe('Register - Smoke Tests (POM) @smoke @register', () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        registerModal = new RegisterModal(page);
        homePage = new HomePage(page);

        await landingPage.navigate();
        await landingPage.openRegisterModal();
    });

    test('Successful registration with valid data', async () => {
        const suffix = generateIdSuffix();
        
        // Подготвяме данните
        const userData = {
            email: `test+${suffix}@test.com`,
            password: 'Password01!',
            username: `user_${suffix}`.slice(0, 15),
            firstName: buildRandomName(suffix),
            lastName: buildRandomName(suffix),
            phone: `5${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            dobDay: '01',
            dobMonth: '01',
            dobYear: '1990',
            address: 'Test Street 1',
            city: 'Sofia',
            zip: '1000'
        };

        // 1. Попълваме формата чрез POM метода
        await registerModal.fillForm(userData);

        // 2. Изпращаме
        await registerModal.submit();

        await registerModal.closeSuccessModal();

        // 3. Проверка: Очакваме да сме логнати автоматично след регистрация
        await homePage.verifyUserIsLoggedIn();
    });
});