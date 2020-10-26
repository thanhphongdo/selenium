import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { ProjectItemInterface } from '../store/root_state_interface';
import ProjectItem from '../components/project/ProjectItem';
import CreateEditProject from '../components/project/CreateEditProject';

@Component({
    components: { ProjectItem, CreateEditProject },
    computed: {
        ...mapState(['projectList'])
    }
})
export default class Project extends Vue {
    test: string = 'Test Project';
    createEditProject !: CreateEditProject;
    projectList !: Array<ProjectItemInterface>;
    mounted() {
    }
    render() {
        return (
            <div class="ui grid" v-formValidate={{a:1}}>
                <CreateEditProject id="create-edit-project" on-addRef={(createEditProject: CreateEditProject) => this.createEditProject = createEditProject} />
                <div class="sixteen wide column tw-pb-2">
                    <div class="ui grid">
                        <div class="eight wide column">
                            <div class="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i class="circular search link icon"></i>
                            </div>
                        </div>
                        <div class="eight wide column tw-text-right">
                            <button class="ui blue basic button" on-click={() => this.createEditProject.create()}>New project</button>
                        </div>
                    </div>
                </div>
                <div class="sixteen wide column tw-pb-2">
                    <div class="ui grid">
                        <div class="three column row">
                            {this.projectList.map(item => {
                                return (
                                    <div class="column">
                                        <ProjectItem projectData={item}
                                            on-edit={(projectData: ProjectItemInterface) => this.createEditProject.edit(projectData)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div class="sixteen wide column tw-pb-2 tw-flex tw-justify-end tw-pt-0">
                    <div class="ui pagination small menu">
                        <span class="active item">
                            {'<'}
                        </span>
                        <span class="active item">
                            1
                        </span>
                        <span class="item">
                            2
                        </span>
                        <span class="item">
                            3
                        </span>
                        <span class="item">
                            4
                        </span>
                        <span class="item">
                            5
                        </span>
                        <span class="item">
                            {'>'}
                        </span>
                    </div>
                </div>
            </div >
        );
    }
}
