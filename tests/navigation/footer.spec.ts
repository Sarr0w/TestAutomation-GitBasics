import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { Footer } from '../pages/components/footer';

test.describe('Footer Navigation Tests', () => {
    let landingPage: LandingPage;
    let footer: Footer;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        footer = new Footer(page);
        await landingPage.navigate();
    });

    test('Should verify important footer links work', async ({ page }) => {
        // 1. Тестваме Terms & Conditions
        await footer.openTermsAndConditions();
        await expect(page).toHaveURL(/.*terms-conditions/); // Проверяваме част от URL-а

        // Връщаме се назад за следващия тест
        await landingPage.navigate();

        // 2. Тестваме About Us
        await footer.openAboutUs();
        await expect(page).toHaveURL(/.*about-us/);

        await landingPage.navigate();

        // 4. Тестваме Security & Privacy
        await footer.openSecurityAndPrivacy();
        await expect(page).toHaveURL(/.*security-privacy/); 

        await landingPage.navigate();

        // 5. Тестваме Contact Us
        await footer.openContactUs();
        await expect(page).toHaveURL(/.*contact-us/); 

        await landingPage.navigate();

        await footer.openResponsibleGaming();
        await expect(page).toHaveURL(/.*responsible-gambling/);       

        await landingPage.navigate();
        
        await footer.openBettingRules();
        await expect(page).toHaveURL(/.*betting-rules/);

        await landingPage.navigate();

        await footer.openPaymentMethods();
        await expect(page).toHaveURL(/.*payment-methods/);  

        await landingPage.navigate();

        await footer.openFAQ();
        await expect(page).toHaveURL(/.*faq/);  
    });

});