import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';
import { CaseInterface } from '../../interfaces/scenario-interface';
import MarkDownViewer from '../controls/MarkDownViewer';
import MarkDownEditor from '../controls/MarkDownEditor';

@Component
export default class CaseItem extends BaseComponent {
    @Prop() projectId!: string;
    @Prop() scenarioId!: string;
    @Prop() caseItem!: CaseInterface;
    src!: string;
    markDownEditor!: MarkDownEditor;
    markDownViewer!: MarkDownViewer;
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
                <div class="tw-p-2">
                    <div>
                        <button on-click={() => {
                            this.markDownEditor.open(this.markDownViewer.getSrc());
                            console.log(this.markDownViewer.getSrc());
                        }}>edit</button>
                    </div>
                    <MarkDownViewer on-addRef={(markDownViewer: MarkDownViewer) => this.markDownViewer = markDownViewer} src={this.src}></MarkDownViewer>
                    <MarkDownEditor
                        on-addRef={(markDownEditor: MarkDownEditor) => this.markDownEditor = markDownEditor}
                        on-change={(text: string) => this.markDownViewer.view(text)}
                    ></MarkDownEditor>
                </div>
            </div>
        );
    }
}
