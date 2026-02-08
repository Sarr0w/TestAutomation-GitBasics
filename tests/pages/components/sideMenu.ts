import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SideMenu extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Основни категории
    readonly casinoLink: Locator = this.page.locator('#navCasino');
    readonly liveCasinoLink: Locator = this.page.locator('#navLiveCasino');
    readonly sportsLink: Locator = this.page.locator('#navSports');
    readonly virtualSportsLink: Locator = this.page.locator('#navVirtualSports');
    readonly wheelOfFortuneLink: Locator = this.page.locator('#navWheelOfFortune');
    readonly liveSportsLink: Locator = this.page.locator('#navLiveSports');
    readonly gameficationLink: Locator = this.page.locator('#navGamification');
    readonly crashGamesLink: Locator = this.page.locator('#navCrashGames');
    readonly liveGamesLink: Locator = this.page.locator('#navBetGamesTV');
    readonly zepplinLink: Locator = this.page.locator('#navZeppelin');
    readonly aviatorLink: Locator = this.page.locator('#navAviator');  

    

    readonly promotionsLink: Locator = this.page.locator('#navPromotions');
    readonly vipLink: Locator = this.page.locator('#navVIP');
    
   
    readonly liveChatButton: Locator = this.page.locator('#navLiveChat');

// --- МЕТОДИ ЗА НАВИГАЦИЯ (ACTIONS) ---
    
    async openCasino() {
        await this.casinoLink.click();
    }

    async openLiveCasino() {
        await this.liveCasinoLink.click();
    }

    async openSports() {
        await this.sportsLink.click();
    }

    async openVirtualSports() {
        await this.virtualSportsLink.click();
    }

    async openWheelOfFortune() {
        await this.wheelOfFortuneLink.click();
    }

    async openLiveSports() {
        await this.liveSportsLink.click();
    }

    async openGamification() {
        await this.gameficationLink.click();
    }

    async openCrashGames() {
        await this.crashGamesLink.click();
    }

    async openLiveGames() {
        await this.liveGamesLink.click();
    }

    async openZeppelin() {
        await this.zepplinLink.click();
    }

    async openAviator() {
        await this.aviatorLink.click();
    }

    async openPromotions() {
        await this.promotionsLink.click();
    }

    async openVip() {
        await this.vipLink.click();
    }

    async openLiveChat() {
        await this.liveChatButton.click();
    }
}