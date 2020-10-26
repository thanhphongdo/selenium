import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProjectItemInterface } from '../../store/root_state_interface';

@Component
export default class ProjectItem extends Vue {
    @Prop(Object) readonly projectData!: ProjectItemInterface;
    constructor() {
        super();
    }
    render() {
        return (
            <div class="tw-mb-8 tw-p-4 tw-bg-blue-200 tw-rounded-md">
                <div class="tw-text-blue-700 tw-mb-2">
                    {this.projectData.projectTitle}
                </div>
                <div style="height: 120px" class="tw-text-blue-700 tw-p-2 tw-mb-2 tw-rounded-md tw-border tw-border-solid tw-border-blue-400 tw-italic">
                    <div>
                        {this.projectData.projectDesc}
                    </div>
                </div>
                <div class="tw-mb-2 tw-flex">
                    <div class="tw-flex-1">
                        <button class="ui icon teal basic mini button" on-click={() => { this.$emit('edit', this.projectData) }}>
                            <i class="save icon"></i>
                        </button>
                    </div>
                    <div class="tw-flex-1 tw-text-right">
                        <button class="ui icon brown basic mini button">
                            <i class="trash icon"></i>
                        </button>
                        <button class="ui icon teal basic mini button tw-mr-0">
                            <i class="arrow alternate circle right outline icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
