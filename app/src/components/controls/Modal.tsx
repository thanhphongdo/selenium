import { Component, Prop } from 'vue-property-decorator';
import BaseControl from './BaseControl';
@Component
export default class Modal extends BaseControl {
    element: any;
    modalSettings!: { [key: string]: any };
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.element = this.jQuery('#' + this.eleId);
        this.modalSettings = this.settings || {};
        this.$emit('addRef', this);
    }
    set(settings: { [key: string]: any }) {
        this.modalSettings = settings || {};
    }
    show() {
        this.element.modal(this.modalSettings).modal('show');
    }
    hide() {
        this.element.modal(this.modalSettings).modal('hide');
    }
    toggle() {
        this.element.modal(this.modalSettings).modal('toggle');
    }
    call(methodName: string) {
        this.element.modal(this.modalSettings).modal(methodName);
    }
    render() {
        return (
            <div>
                <div id={this.eleId} class={'ui modal ' + (this.className || '')}>
                    <i class="close icon"></i>
                    <div class="header">
                        {
                            (this.$scopedSlots as any).header ? (this.$scopedSlots as any).header() : null
                        }
                    </div>
                    <div class="content">
                        {
                            (this.$scopedSlots as any).content ? (this.$scopedSlots as any).content() : null
                        }
                    </div>
                    <div class="actions">
                        {
                            (this.$scopedSlots as any).actions ? (this.$scopedSlots as any).actions() : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
