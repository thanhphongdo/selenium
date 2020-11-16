import { Component, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { mapState, mapActions } from 'vuex';
import { Route } from 'vue-router';
import { ProjectItemInterface } from '../interfaces/project-interface';
import { ScenarioInterface } from '../interfaces/scenario-interface';
import BaseComponent from '../components/BaseComponent';
import Accordion from '../components/controls/Accordion';
import ProjectItem from '../components/project/ProjectItem';
import CreateEditProject from '../components/project/CreateEditProject';
import ScenarioItem from '../components/scenario/ScenarioItem';
import CaseDetail from '../components/case/CaseDetail';

@Component({
    components: { ProjectItem, CreateEditProject },
    computed: {
        ...mapState(['projectList'])
    },
    methods: {
        ...mapActions(['getProjects'])
    }
})
export default class ProjectDetail extends BaseComponent {
    @Getter('getProjectById') getProjectById!: (projectId: string) => ProjectItemInterface;
    @Getter('getScenarioDetail') getScenarioDetail!: (projectId: string, scenarioId: string) => ScenarioInterface;
    @Action('fetchProject') fetchProject!: () => Promise<any>;
    @Action('fetchScenarioDetail') fetchScenarioDetail!: (params: {
        projectId?: string;
        scenarioId?: string;
    }) => Promise<any>;
    @Watch('$route', { immediate: true, deep: true }) onRouteChange(route: Route) {
        this.projectId = route.params.projectId;
    }
    projectId!: string;
    data: {
        currentProject?: ProjectItemInterface;
        currentScenario?: ScenarioInterface;
    } = {}
    mounted() {
        this.fetchProject().then(() => {
            this.data.currentProject = this.getProjectById(this.projectId);
            this.notify(this.data);
        });
    }
    loadScenarioDetail(scenarioId: string) {
        this.fetchScenarioDetail({
            projectId: this.projectId,
            scenarioId: scenarioId
        }).then(() => {
            this.data.currentScenario = this.getScenarioDetail(this.projectId, scenarioId);
            this.notify(this.data);
        }).catch(err => { });
    }
    render() {
        return (
            <div class="ui grid tw-m-0 tw-h-full">
                <div class="four wide column tw-bg-white tw-border tw-border-solid tw-border-blue-500 tw-h-full tw-p-2">
                    <div>
                        {this.data.currentProject?.scenarios?.map(item => {
                            return (
                                <div on-click={() => { this.loadScenarioDetail(item.id); }}>
                                    <ScenarioItem scenarioItem={item}></ScenarioItem>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div class="twelve wide column tw-bg-white tw-border tw-border-solid tw-border-blue-500 tw-border-l-0 tw-h-full tw-p-2 tw-overflow-auto">
                    <div>
                        {
                            this.data.currentScenario?.cases.length ? (
                                <Accordion className='styled fluid'>
                                    {
                                        this.data.currentScenario ? this.data.currentScenario.cases.map(item => {
                                            return [
                                                <div class="title" id={'case-title-' + item.id}>
                                                    <i class="dropdown icon"></i>
                                                    <span>ID: {item.id}</span>
                                                </div>,
                                                <div class="content" id={'case-content-' + item.id}>
                                                    <CaseDetail caseItem={item} projectId={this.projectId} scenarioId={this.data.currentScenario?.id}></CaseDetail>
                                                </div>
                                            ];
                                        }) : null
                                    }
                                </Accordion>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
