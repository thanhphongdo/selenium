import { GetterTree } from 'vuex';
import { RootStateInterface } from './root_state_interface';

export const getters: GetterTree<RootStateInterface, RootStateInterface> = {
    getMessage(state) {
        return state.message;
    },
    getProjectById(state) {
        return (projectId: string) => {
            return state.projectList.filter((item) => {
                return item.projectId == projectId;
            })[0] || {};
        }
    },
    getScenarioDetail(state) {
        return (projectId: string, scenarioId: string) => {
            return state.scenarios?.[projectId]?.[scenarioId];
        }
    }
}