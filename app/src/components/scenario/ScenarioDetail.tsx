import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';

@Component
export default class ScenarioDetail extends BaseComponent {
    @Prop() scenarioItem!: {
        id: string;
        desc: string;
    }
    constructor() {
        super();
    }
    mounted() {
    }
    render() {
        return (
            <div class="tw-bg-blue-200 tw-mb-2">
                <div class="tw-cursor-pointer tw-p-2">
                    <div class="tw-text-blue-700 tw-text-xl">{this.scenarioItem.id}</div>
                    <div class="tw-text-blue-600 tw-italic">{this.scenarioItem.desc}</div>
                </div>
            </div>
        );
    }
}
