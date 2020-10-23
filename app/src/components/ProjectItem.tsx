import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProjectItem extends Vue {
    render() {
        return (
            <div class="tw-mb-8 tw-p-4 tw-bg-yellow">A</div>
        );
    }
}
