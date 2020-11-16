import { Component, Prop } from 'vue-property-decorator';
import BaseControl from './BaseControl';

@Component
export default class Accordion extends BaseControl {
    element: any;
    accordionSettings!: { [key: string]: any };
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.element = this.jQuery('#' + this.eleId);
        this.accordionSettings = this.settings || {};
        this.element.accordion(this.accordionSettings);
        this.$emit('addRef', this);
    }
    set(settings: { [key: string]: any }) {
        this.accordionSettings = settings || {};
    }
    open() {
        this.element.accordion(this.accordionSettings).accordion('open');
    }
    close() {
        this.element.accordion(this.accordionSettings).accordion('close');
    }
    toggle() {
        this.element.accordion(this.accordionSettings).accordion('toggle');
    }
    call(methodName: string) {
        this.element.accordion(this.accordionSettings).accordion(methodName);
    }
    render() {
        return (
            <div id={this.eleId} class={'ui accordion ' + (this.className || '')}>
                {
                    (this.$scopedSlots as any).default ? (this.$scopedSlots as any).default() : null
                }
            </div>
        );
    }
}
