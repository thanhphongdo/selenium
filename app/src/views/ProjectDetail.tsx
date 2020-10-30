import { Vue, Component, Watch } from 'vue-property-decorator';
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
    @Watch('$route', { immediate: true, deep: true }) onRouteChange(route: Route) {
        console.log(route.params.projectId);
    }
    mounted() {
    }
    render() {
        return (
            <div class="ui grid">
                ProjectDetail
            </div>
        );
    }
}
