import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';
import Accordion from '../controls/Accordion';

@Component({
    components: {
        Accordion
    }
})
export default class ScenarioItem extends BaseComponent {
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
                <Accordion className="styled">
                    <div class="title active">
                        <i class="dropdown icon"></i>{this.scenarioItem.id}
                        <div class="tw-italic tw-font-normal">{this.scenarioItem.desc}</div>
                    </div>
                    <div class="content active tw-p-2">
                        <p class="visible" style="display: block !important;">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </div>
                </Accordion>
                {/* <div class="tw-cursor-pointer tw-p-2">
                    <div class="tw-text-blue-700 tw-text-xl">{this.scenarioItem.id}</div>
                    <div class="tw-text-blue-600 tw-italic">{this.scenarioItem.desc}</div>
                </div> */}
            </div>
        );
    }
}
