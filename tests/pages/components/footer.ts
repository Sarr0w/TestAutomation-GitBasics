import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class Footer extends BasePage {

    constructor(page: Page) {
        super(page);
    }


    readonly aboutUsLink: Locator = this.page.locator('#footerLinkAboutUs');
    readonly termsLink: Locator = this.page.locator('#footerLinkTermsAndConditions');
    readonly responsibleGamingLink: Locator = this.page.locator('#footerLinkResponsibleGambling');
    readonly contactUsLink: Locator = this.page.locator('#footerLinkContactUs');
    readonly faqLink: Locator = this.page.locator('#footerLinkFAQ');
    readonly bettingRulesLink: Locator = this.page.locator('#footerLinkBettingRules');
    readonly paymentMethodsLink: Locator = this.page.locator('#footerLinkPaymentMethods');
    readonly helpCenterLink: Locator = this.page.locator('#footerLinkPlatformHelp');
    readonly securityPrivacyLink: Locator = this.page.locator('#footerLinkSecurityAndPrivacy');
  
    async openAboutUs() {
        
        await this.aboutUsLink.scrollIntoViewIfNeeded();
        await this.aboutUsLink.click();
    }
    async openTermsAndConditions() {
   
        await this.termsLink.scrollIntoViewIfNeeded();
        await this.termsLink.click();
    }

    async openResponsibleGaming() {
        await this.responsibleGamingLink.scrollIntoViewIfNeeded();
        await this.responsibleGamingLink.click();
    }
    async openContactUs() {
        await this.contactUsLink.scrollIntoViewIfNeeded();
        await this.contactUsLink.click();
    }
    async openFAQ() {
        await this.faqLink.scrollIntoViewIfNeeded();
        await this.faqLink.click();
    }
    async openBettingRules() {
        await this.bettingRulesLink.scrollIntoViewIfNeeded();
        await this.bettingRulesLink.click();
    }
    async openPaymentMethods() {
        await this.paymentMethodsLink.scrollIntoViewIfNeeded();
        await this.paymentMethodsLink.click();
    }
    async openSecurityAndPrivacy() {
        await this.securityPrivacyLink.scrollIntoViewIfNeeded();
        await this.securityPrivacyLink.click();
    }
}