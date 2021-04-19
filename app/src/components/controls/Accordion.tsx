import { Component, Prop } from 'vue-property-decorator';
import BaseControl from './BaseControl';

@Component
export default class Accordion extends BaseControl {
    element: any;
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.element.accordion();
    }
    open() {
        this.element.accordion(this.cmpSettings).accordion('open');
    }
    close() {
        this.element.accordion(this.cmpSettings).accordion('close');
    }
    toggle() {
        this.element.accordion(this.cmpSettings).accordion('toggle');
    }
    call(methodName: string) {
        this.element.accordion(this.cmpSettings).accordion(methodName);
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
