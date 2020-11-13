export interface TestDataFunctionInterface {
    (utils: any, scenario?: ScenarioInterface): any
}

export interface ActionInterface {
    action?: 'input' | 'click' | 'scroll' | 'scrollToBottom' | 'execute_js';
    actionFunc?: string;
    text?: string;
    script?: string;
    delayBefore?: number;
    delayAfter?: number;
}

export interface StepInterface {
    selectorType: 'id' | 'xPath' | 'tagName' | 'className';
    selectorQuery: string;
    action: ActionInterface;
    expectResult?: string;
    delayBefore?: number;
    delayAfter?: number;
}

export interface CaseInterface {
    id: string;
    url: string;
    testData: string;
    steps: StepInterface[];
    expectResult?(page: any, assets: any): any;
    autoQuiteTimeOut?: number;
}

export interface ScenarioInterface {
    id: string;
    cases: CaseInterface[]
}