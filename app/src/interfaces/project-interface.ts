import { CaseInterface } from './scenario-interface';

export interface ProjectItemInterface {
    projectId?: string;
    projectTitle?: string;
    projectDesc?: string;
    scenarios: Array<{
        id: string;
        desc: string;
        cases?: Array<CaseInterface>;
    }>
}