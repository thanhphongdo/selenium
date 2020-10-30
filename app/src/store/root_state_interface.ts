export interface ProjectItemInterface {
    projectId?: string;
    projectTitle?: string;
    projectDesc?: string;
}

export interface RootStateInterface {
    baseUrl: string;
    message: string;
    projectList: Array<ProjectItemInterface>;
    currentProject: ProjectItemInterface;
}