import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';
import { CaseInterface } from '../../interfaces/scenario-interface';

@Component
export default class CaseItem extends BaseComponent {
    @Prop() projectId!: string;
    @Prop() scenarioId!: string;
    @Prop() caseItem!: CaseInterface;
    constructor() {
        super();
    }
    mounted() {
    }
    render() {
        return (
            <div class="tw-bg-blue-200 tw-mb-2">
                <div class="tw-cursor-pointer tw-p-2">
                    <div class="tw-text-blue-700 tw-text-xl">ID: {this.caseItem.id}</div>
                    <div class="tw-text-blue-600">Url: {this.caseItem.url}</div>
                    <div class="tw-text-blue-600">Descriptions: <span class="tw-italic">{this.caseItem.desc}</span></div>
                </div>
            </div>
        );
    }
}
