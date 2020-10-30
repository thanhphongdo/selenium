import { Component, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { mapState, mapActions } from 'vuex';
import { Route } from 'vue-router';
import BaseComponent from '../components/BaseComponent';
import { ProjectItemInterface } from '../store/root_state_interface';
import ProjectItem from '../components/project/ProjectItem';
import CreateEditProject from '../components/project/CreateEditProject';

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
    @Action('fetchProject') fetchProject!: () => Promise<any>;
    @Watch('$route', { immediate: true, deep: true }) onRouteChange(route: Route) {
        this.projectId = route.params.projectId;
    }
    projectId!: string;
    currentProject: ProjectItemInterface = {};
    mounted() {
        this.fetchProject().then(() => {
            this.currentProject = this.getProjectById(this.projectId);
        });
    }
    render() {
        return (
            <div class="ui grid tw-m-0 tw-h-full">
                <div class="four wide column tw-bg-white tw-border tw-border-solid tw-border-blue-500 tw-h-full">
                    <div class="tw-bg-blue-200">
                        scenario
                    </div>
                </div>
                <div class="twelve wide column tw-pr-0 tw-bg-white tw-h-full">
                    <div class="tw-bg-blue-200">
                        cases
                    </div>
                </div>
            </div>
        );
    }
}
