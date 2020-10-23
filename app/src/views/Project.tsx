import { Vue, Component } from 'vue-property-decorator';
import ProjectItem from '../components/ProjectItem';

@Component({
    components: { ProjectItem },
})
export default class Project extends Vue {
    render() {
        return (
            <div class="ui grid">
                <div class="sixteen wide column tw-pb-2">
                    <div class="ui grid">
                        <div class="eight wide column">
                            <div class="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i class="circular search link icon"></i>
                            </div>
                        </div>
                        <div class="eight wide column tw-text-right">
                            <button class="ui blue basic button">New project</button>
                        </div>
                    </div>
                </div>
                <div class="sixteen wide column tw-pb-2">
                    <div class="ui grid">
                        <div class="three column row">
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
                            <div class="column">
                                <ProjectItem></ProjectItem>
                            </div>
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
            </div>
        );
    }
}
