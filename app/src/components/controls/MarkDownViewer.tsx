import { Component, Prop } from 'vue-property-decorator';
import showdown from 'showdown';
import { MarkedOptions } from 'marked';
import BaseControl from './BaseControl';
@Component
export default class MarkDownViewer extends BaseControl {
    @Prop(String) src!: String;
    @Prop(String) maxWidth!: String;
    @Prop(String) maxHeight!: String;
    @Prop(String) minWidth!: String;
    @Prop(String) minHeight!: String;
    element: any;
    markedSettings!: MarkedOptions;
    markedSrc!: String;
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.markedSrc = this.src;
        this.element = this.jQuery('#' + this.eleId);
        this.markedSettings = this.settings || undefined;
        this.$emit('addRef', this);
        this.view(this.src || '');
    }
    view(src: String) {
        this.markedSrc = src;
        const converter = new showdown.Converter();
        const html = converter.makeHtml(src + '');
        this.jQuery('#' + this.eleId).html(html);
    }
    getSrc() {
        return this.markedSrc;
    }
    render() {
        return (
            <div id={this.eleId} style={{
                'max-width': this.maxWidth || '100%',
                'max-height': this.maxHeight || '300px',
                'min-width': this.minWidth || '100%',
                'min-height': this.minHeight || '100px'
            }} class="tw-overflow-auto tw-border tw-border-blue-400 tw-border-solid tw-p-2 tw-rounded-md"></div>
        );
    }
}
