import { ProjectItemInterface } from '../interfaces/project-interface'

export interface RootStateInterface {
    baseUrl: string;
    message: string;
    projectList: Array<ProjectItemInterface>;
}