import Vue from 'vue';
import Vuex from 'vuex';
import { ProjectItemInterface, RootStateInterface } from './root_state_interface';
import { BaseAxios } from '../utils/axios';

const axios = new BaseAxios();

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
    state: {
        baseUrl: 'http://localhost:3000/',
        message: 'hello',
        projectList: []
    },
    getters: {
        getMessage(state) {
            return state.message;
        },
    },
    mutations: {
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
    },
    actions: {
        changeMessage({ commit }, newMessage: string) {
            commit('changeMessage', newMessage);
        },
        getProjects({ commit, state }, projects: Array<ProjectItemInterface>) {
            return axios.get<{ data: Array<ProjectItemInterface> }>(state.baseUrl + 'api/project').then(response => {
                commit('getProjects', response.data.data);
            });
        },
        createProject({ commit }, projectData: ProjectItemInterface) {
            commit('createProject', projectData);
        },
        editProject({ commit }, projectData: ProjectItemInterface) {
            commit('editProject', projectData);
        }
    },
    modules: {},
});
