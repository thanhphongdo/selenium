import { ScenarioInterface } from '../interfaces/scenario-interface';
import { ProjectItemInterface } from '../interfaces/project-interface'

export interface RootStateInterface {
    baseUrl: string;
    message: string;
    projectList: Array<ProjectItemInterface>;
    scenarios: {
        [key: string]: {
            [key: string]: ScenarioInterface
        }
    }
}