import { Vue, Component, Prop } from 'vue-property-decorator';
import BaseControl from './BaseControl';

@Component
export default class Modal extends BaseControl {
    @Prop(String) readonly id?: string;
    @Prop(Object) settings!: { [key: string]: any }
    element: any;
    modalSettings!: { [key: string]: any };
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    show() {
        this.element.modal(this.cmpSettings).modal('show');
    }
    hide() {
        this.element.modal(this.cmpSettings).modal('hide');
    }
    toggle() {
        this.element.modal(this.cmpSettings).modal('toggle');
    }
    call(methodName: string) {
        this.element.modal(this.cmpSettings).modal(methodName);
    }
    render() {
        return (
            <div id={this.eleId} class="ui modal">
                <i class="close icon"></i>
                <div class="header">
                    {
                        (this.$scopedSlots as any).modalHeader ? (this.$scopedSlots as any).modalHeader() : null
                    }
                </div>
                <div class="content">
                    {
                        (this.$scopedSlots as any).modalContent ? (this.$scopedSlots as any).modalContent() : null
                    }
                </div>
                <div class="actions">
                    {
                        (this.$scopedSlots as any).modalActions ? (this.$scopedSlots as any).modalActions() : null
                    }
                </div>
            </div>
        );
    }
}
