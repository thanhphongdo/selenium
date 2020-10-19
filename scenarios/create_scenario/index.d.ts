import * as Page from '../../core/page';
import * as Utils from '../../core/utils';
import { WebElement } from 'selenium-webdriver';

export interface TestDataFunctionInterface {
    (utils: Utils, scenario?: ScenarioInterface): any
}

export interface ActionInterface {
    action?: string;
    actionFunc?: (element: WebElement, page: Page, utils: Utils) => any;
    text?: string;
    script?: string;
    delayBefore?: number;
    delayAfter?: number;
}

export interface StepInterface {
    selectorType: string;
    selectorQuery: string;
    action: ActionInterface;
    expectResult?(page: Page, assert: Chai.Assert): any;
    delayBefore?: number;
    delayAfter?: number;
}

export interface CaseInterface {
    id: string;
    url: string;
    testData: { [key: string]: any } | TestDataFunctionInterface | [{ [key: string]: any } | TestDataFunctionInterface];
    // testData: TestDataFunctionInterface;
    steps: StepInterface[];
    expectResult?(page: Page, assets: Chai.Assert): any;
    autoQuiteTimeOut?: number;
}

export interface ScenarioInterface {
    id: string;
    cases: CaseInterface[]
}

export function createScenario(senario: ScenarioInterface): ScenarioInterface;