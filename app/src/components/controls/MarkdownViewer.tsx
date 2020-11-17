import { Component, Prop } from 'vue-property-decorator';
import marked from 'marked';
import showdown from 'showdown';
import { MarkedOptions } from 'marked';
import BaseControl from './BaseControl';
@Component
export default class MarkdownViewer extends BaseControl {
    @Prop(String) src!: String;
    @Prop(String) width!: String;
    @Prop(String) height!: String;
    element: any;
    markedSettings!: MarkedOptions;
    marked!: string;
    constructor() {
        super();
        this.setControlId(this.constructor.name);
    }
    mounted() {
        this.element = this.jQuery('#' + this.eleId);
        this.markedSettings = this.settings || undefined;
        this.$emit('addRef', this);
        var converter = new showdown.Converter();
        var html = converter.makeHtml(this.src + '');
        this.jQuery('#' + this.eleId).html(html);
    }
    render() {
        return (
            <div id={this.eleId} style={{
                width: '100%',
                height: '300px'
            }} class="tw-overflow-auto tw-border tw-border-blue-400 tw-border-solid tw-p-2 tw-rounded-md"></div>
        );
    }
}
