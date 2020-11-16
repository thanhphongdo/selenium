import { ActionTree } from 'vuex';
import { ProjectItemInterface } from '../interfaces/project-interface';
import { RootStateInterface } from './root_state_interface';
import { BaseAxios } from '../utils/axios';
import { ScenarioService } from '../services/scenario';
import { Utils } from '../utils';

const utils = new Utils();
const axios = new BaseAxios('http://localhost:3000/');

export const actions: ActionTree<RootStateInterface, RootStateInterface> = {
    changeMessage({ commit }, newMessage: string) {
        commit('changeMessage', newMessage);
    },
    fetchProject({ commit, state }, projects: Array<ProjectItemInterface>) {
        return axios.get<{ data: Array<ProjectItemInterface> }>('api/project').then(response => {
            commit('fetchProject', response.data.data);
        });
    },
    createProject({ commit }, projectData: ProjectItemInterface) {
        return axios.post('api/project/create', projectData).then(response => {
            commit('createProject', projectData);
        });
    },
    editProject({ commit }, project: {
        currentProjectId: string;
        projectData: ProjectItemInterface;
    }) {
        return axios.post(`api/project/update/${project.currentProjectId}`, project.projectData).then(response => {
            commit('editProject', project.projectData);
        });
    },
    fetchScenarioDetail({ commit, state }, params: { projectId: string, scenarioId: string }) {
        return axios.get<{ data: any }>(`api/scenario/${params.projectId}/${params.scenarioId}`).then(response => {
            const scenario = eval(`(()=>{return ${response.data.data}})()`);
            const scenarioEncode = new ScenarioService().encodeScenarioFunction(scenario);
            const matchKeyPath = scenarioEncode.refScenario.match(scenarioEncode.reg) || [];
            matchKeyPath.forEach(keyPath => {
                const keyPathReplace = keyPath.replace('{{{', '').replace('}}}', '').trim();
                const funcStringify: string = utils.getPropByKeyPath(keyPathReplace, scenario).toString();
                scenarioEncode.refScenario = scenarioEncode.refScenario.replace(`"${keyPath}"`, `\`${funcStringify.replace(/\`/g, '\\`').replace(/\$\{/g,'\\${')}\``);
            });
            commit('fetchScenarioDetail', {
                projectId: params.projectId,
                scenarioId: params.scenarioId,
                scenarioData: eval(`(()=>{return ${scenarioEncode.refScenario}})()`)
            });
        });
    }
}