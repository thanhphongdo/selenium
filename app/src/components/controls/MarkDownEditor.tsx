import { Component, Prop } from 'vue-property-decorator';
import BaseControl from './BaseControl';

declare var StackEdit: any;

@Component
export default class MarkDownEditor extends BaseControl {
    @Prop(String) width!: String;
    @Prop(String) height!: String;
    element: any;
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.element = this.jQuery('#' + this.eleId);
        this.$emit('addRef', this);
    }
    open(src?: String) {
        const self = this;
        const stackEdit = new StackEdit();
        stackEdit.openFile({
            name: 'Filename',
            content: {
                text: src || ''
            }
        });

        stackEdit.on('fileChange', (file: any) => {
            self.$emit('change', file.content.text);
        });
    }
    render() {
        return (
            <div></div>
        );
    }
}
