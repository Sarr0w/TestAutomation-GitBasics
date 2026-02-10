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

    // --- ТЕСТ 1: Terms & Conditions ---
    test('Should navigate to Terms & Conditions', async ({ page }) => {
        await footer.openTermsAndConditions();
        await expect(page, 'URL should contain "terms-conditions" after navigation').toHaveURL(/.*terms-conditions/);
    });

    // --- ТЕСТ 2: About Us ---
    test('Should navigate to About Us', async ({ page }) => {
        await footer.openAboutUs();
        await expect(page, 'URL should contain "about-us" after navigation').toHaveURL(/.*about-us/);
    });

    // --- ТЕСТ 3: Security & Privacy ---
    test('Should navigate to Security & Privacy', async ({ page }) => {
        await footer.openSecurityAndPrivacy();
        await expect(page, 'URL should contain "security-privacy" after navigation').toHaveURL(/.*security-privacy/);
    });

    // --- ТЕСТ 4: Contact Us ---
    test('Should navigate to Contact Us', async ({ page }) => {
        await footer.openContactUs();
        await expect(page, 'URL should contain "contact-us" after navigation').toHaveURL(/.*contact-us/);
    });

    // --- ТЕСТ 5: Responsible Gaming ---
    test('Should navigate to Responsible Gaming', async ({ page }) => {
        await footer.openResponsibleGaming();
        await expect(page, 'URL should contain "responsible-gambling" after navigation').toHaveURL(/.*responsible-gambling/);
    });

    // --- ТЕСТ 6: Betting Rules ---
    test('Should navigate to Betting Rules', async ({ page }) => {
        await footer.openBettingRules();
        await expect(page, 'URL should contain "betting-rules" after navigation').toHaveURL(/.*betting-rules/);
    });

    // --- ТЕСТ 7: Payment Methods ---
    test('Should navigate to Payment Methods', async ({ page }) => {
        await footer.openPaymentMethods();
        await expect(page, 'URL should contain "payment-methods" after navigation').toHaveURL(/.*payment-methods/);
    });

    // --- ТЕСТ 8: FAQ ---
    test('Should navigate to FAQ', async ({ page }) => {
        await footer.openFAQ();
        await expect(page, 'URL should contain "faq" after navigation').toHaveURL(/.*faq/);
    });
});