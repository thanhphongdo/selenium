import { Component, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { mapState, mapActions } from 'vuex';
import { Route } from 'vue-router';
import BaseComponent from '../components/BaseComponent';
import { ProjectItemInterface } from '../interfaces/project-interface';
import { ScenarioInterface } from '../interfaces/scenario-interface';
import ProjectItem from '../components/project/ProjectItem';
import CreateEditProject from '../components/project/CreateEditProject';
import ScenarioItem from '../components/scenario/ScenarioItem';
import CaseDetail from '../components/case/CaseDetail';
import Accordion from '../components/controls/Accordion';

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
            this.data.currentProject?.scenarios[0].cases?.splice(0);
            this.getScenarioDetail(this.projectId, scenarioId).cases.forEach(item => {
                this.data.currentProject?.scenarios[0].cases?.push(item);
            });
            this.notify(this.data);
        }).catch(err => { });
    }
    render() {
        return (
            <div class="ui grid tw-m-0 tw-h-full">
                <div class="four wide column tw-bg-white tw-border tw-border-solid tw-border-gray-100 tw-h-full tw-p-2 tw-rounded-l-5">
                    <div>
                        <Accordion className="styled">
                            {this.data.currentProject?.scenarios?.map(item => {
                                return (
                                    [
                                        <div class="title tw-p-2" on-click={() => { this.loadScenarioDetail(item.id); }}>
                                            <i class="dropdown icon"></i>{item.id}
                                            <div class="tw-italic tw-font-normal">{item.desc}</div>
                                        </div>,
                                        <div class="content tw-p-2">
                                            {
                                                item.cases?.map(item => {
                                                    return (
                                                        <CaseDetail caseItem={item} projectId={this.projectId} scenarioId={this.data.currentScenario?.id}></CaseDetail>
                                                    );
                                                })
                                            }
                                        </div>
                                    ]
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
                <div class="twelve wide column tw-bg-white tw-border tw-border-solid tw-border-gray-100 tw-border-l-0 tw-h-full tw-p-2 tw-overflow-auto tw-rounded-r-5">
                    <div>
                        {
                            this.data.currentScenario ? this.data.currentScenario.cases.map(item => {
                                return (
                                    <CaseDetail caseItem={item} projectId={this.projectId} scenarioId={this.data.currentScenario?.id}></CaseDetail>
                                );
                            }) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
