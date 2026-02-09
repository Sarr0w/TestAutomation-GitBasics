import { Page } from '@playwright/test';

export class BasePage {

    constructor(protected page: Page) {}


    async navigate(path: string = '/') {
        await this.page.goto(`https://kazancasino-stage.fsclub.tech${path}`);
    }

}