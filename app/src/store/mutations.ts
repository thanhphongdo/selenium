import { MutationTree } from 'vuex';
import { ProjectItemInterface, RootStateInterface } from './root_state_interface';

export const mutations: MutationTree<RootStateInterface> = {
    changeMessage(state, newMessage: string) {
        state.message = newMessage;
    },
    getProjects(state, projects: Array<ProjectItemInterface>) {
        state.projectList.splice(0);
        projects.forEach(item => {
            state.projectList.push(item);
        })
    },
    createProject(state, projectData: ProjectItemInterface) {
        state.projectList.push(projectData);
    },
    editProject(state, projectData: ProjectItemInterface) {
        state.projectList.forEach(item => {
            if (item.projectId == projectData.projectId) {
                item = projectData;
            }
        });
    }
}