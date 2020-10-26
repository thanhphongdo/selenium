import Vue from 'vue';
import Vuex from 'vuex';
import { ProjectItemInterface, RootStateInterface } from './root_state_interface';

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
  state: {
    message: 'hello',
    projectList: [
      {
        projectId: 'first_project',
        projectTitle: 'First Project',
        projectDesc: 'This is First Project'
      }
    ]
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
    createProject({ commit }, projectData: ProjectItemInterface) {
      commit('createProject', projectData);
    },
    editProject({ commit }, projectData: ProjectItemInterface) {
      commit('editProject', projectData);
    }
  },
  modules: {},
});
