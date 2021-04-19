import { MutationTree } from 'vuex';
import { ProjectItemInterface } from '../interfaces/project-interface';
import { ScenarioInterface } from '../interfaces/scenario-interface';
import { RootStateInterface } from './root_state_interface';

export const mutations: MutationTree<RootStateInterface> = {
    changeMessage(state, newMessage: string) {
        state.message = newMessage;
    },
    fetchProject(state, projects: Array<ProjectItemInterface>) {
        state.projectList.splice(0);
        projects.forEach(item => {
            item.scenarios.forEach(sItem => {
                sItem.cases = [];
            })
            state.projectList.push(item);
        });
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
    },
    fetchScenarioDetail(state, params: { projectId: string, scenarioId: string, scenarioData: ScenarioInterface }) {
        if (!state.scenarios[params.projectId]) {
            state.scenarios[params.projectId] = {};
        }
        state.scenarios[params.projectId] = {
            [params.scenarioId]: params.scenarioData
        };
    },
}