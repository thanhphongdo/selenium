export interface ProjectItemInterface {
    projectId?: string;
    projectTitle?: string;
    projectDesc?: string;
    scenarios?: Array<{
        id: string;
        desc: string;
    }>
}