export interface TestDataFunctionInterface {
    (utils: any, scenario?: ScenarioInterface): any
}

export interface ActionInterface {
    action?: 'input' | 'click' | 'scroll' | 'scrollToBottom' | 'execute_js';
    actionFunc?: (element: any, page: any, utils: any) => any;
    text?: string;
    script?: string;
    delayBefore?: number;
    delayAfter?: number;
}

export interface StepInterface {
    selectorType: 'id' | 'xPath' | 'tagName' | 'className';
    selectorQuery: string;
    action: ActionInterface;
    expectResult?(page: any, assert: any): any;
    delayBefore?: number;
    delayAfter?: number;
}

export interface CaseInterface {
    id: string;
    url: string;
    testData: { [key: string]: any } | TestDataFunctionInterface | [{ [key: string]: any } | TestDataFunctionInterface];
    steps: StepInterface[];
    expectResult?(page: any, assets: any): any;
    autoQuiteTimeOut?: number;
}

export interface ScenarioInterface {
    id: string;
    cases: CaseInterface[]
}