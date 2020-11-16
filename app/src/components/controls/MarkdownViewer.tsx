import { Component, Prop } from 'vue-property-decorator';
import marked from 'marked';
import showdown from 'showdown';
import { MarkedOptions } from 'marked';
import BaseControl from './BaseControl';
@Component
export default class MarkdownViewer extends BaseControl {
    @Prop(String) src!: String;
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
        // (window as any).marked = marked;
        // setTimeout(() => {
        //     this.marked = (window as any).marked(`Marked - Markdown Parser asdsa
        //     ==========`);
        //     console.log(this.eleId);
        //     this.jQuery('#' + this.eleId).html(this.marked);
        // }, 2000);
        this.marked = new showdown.Converter().makeHtml(this.src + '');
        this.jQuery('#' + this.eleId).html(this.marked);
    }
    render() {
        return (
            <div id={this.eleId}></div>
        );
    }
}
