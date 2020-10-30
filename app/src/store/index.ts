import Vue from 'vue';
import Vuex, { ActionTree } from 'vuex';
import { ProjectItemInterface, RootStateInterface } from './root_state_interface';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
    state: {
        baseUrl: 'http://localhost:3000/',
        message: 'hello',
        projectList: [],
        currentProject: {
            projectId: '',
            projectTitle: '',
            projectDesc: ''
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {},
});
