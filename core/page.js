const { Builder, By, until } = require('selenium-webdriver');
const config = require('../config/index');

const chrome = require('selenium-webdriver/chrome');
let browser = new chrome.Options();
browser.addArguments('disable-infobars');
browser.setUserPreferences({ credential_enable_service: false });

module.exports = class Page {
    constructor() {
        this.driver = new Builder()
            .setChromeOptions(browser)
            .forBrowser('chrome')
            .build();
    }

    async visit(url) {
        return await this.driver.get(url);
    };

    async quite() {
        return await this.driver.quit();
    }

    async findById(query) {
        await this.driver.wait(until.elementLocated(By.id(query)), config.findTimeOut, 'Looking for element by Id: ' + query);
        return await this.driver.findElement(By.id(query));
    }

    async findByClassName(query) {
        await this.driver.wait(until.elementLocated(By.className(query)), config.findTimeOut, 'Looking for element by ClassName: ' + query);
        return await this.driver.findElement(By.className(query));
    }

    async findByTagName(query) {
        await this.driver.wait(until.elementLocated(By.tagName(query)), config.findTimeOut, 'Looking for element by TagName: ' + query);
        return await this.driver.findElement(By.tagName(query));
    }

    async findByName(query) {
        await this.driver.wait(until.elementLocated(By.name(query)), config.findTimeOut, 'Looking for element by Name: ' + query);
        return await this.driver.findElement(By.name(query));
    }

    async findByCss(query) {
        await this.driver.wait(until.elementLocated(By.css(query)), config.findTimeOut, 'Looking for element by Css: ' + query);
        return await this.driver.findElement(By.css(query));
    }

    async findByLinkText(query) {
        await this.driver.wait(until.elementLocated(By.linkText(query)), config.findTimeOut, 'Looking for element by LinkText: ' + query);
        return await this.driver.findElement(By.linkText(query));
    }

    async findByPartialLinkText(query) {
        await this.driver.wait(until.elementLocated(By.partialLinkText(query)), config.findTimeOut, 'Looking for element by PartialLinkText: ' + query);
        return await this.driver.findElement(By.partialLinkText(query));
    }

    async findByXPath(query) {
        await this.driver.wait(until.elementLocated(By.xpath(query)), config.findTimeOut, 'Looking for element by xPath: ' + query);
        return await this.driver.findElement(By.xpath(query));
    }

    async executeScript(script) {
        return await this.driver.executeScript(script);
    }

    async delay(timer) {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timer);
        });
    }

    async sendMesage(message) {
        console.log(message);
    }
}