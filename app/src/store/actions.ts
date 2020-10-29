import { ActionTree } from 'vuex';
import { ProjectItemInterface, RootStateInterface } from './root_state_interface';
import { BaseAxios } from '../utils/axios';

const axios = new BaseAxios('http://localhost:3000/');

export const actions: ActionTree<RootStateInterface, RootStateInterface> = {
    changeMessage({ commit }, newMessage: string) {
        commit('changeMessage', newMessage);
    },
    getProjects({ commit, state }, projects: Array<ProjectItemInterface>) {
        return axios.get<{ data: Array<ProjectItemInterface> }>('api/project').then(response => {
            commit('getProjects', response.data.data);
        });
    },
    createProject({ commit }, projectData: ProjectItemInterface) {
        axios.post('api/project/create', projectData).then(response => {
            commit('createProject', projectData);
        });
    },
    editProject({ commit }, projectData: ProjectItemInterface) {
        commit('editProject', projectData);
    }
}