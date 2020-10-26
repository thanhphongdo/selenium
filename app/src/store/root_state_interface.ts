export interface ProjectItemInterface {
    projectId: string;
    projectTitle: string;
    projectDesc: string;
}

export interface RootStateInterface {
    message: string;
    projectList: Array<ProjectItemInterface>;
}