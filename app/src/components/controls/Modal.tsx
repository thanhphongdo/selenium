import { Vue, Component, Prop } from 'vue-property-decorator';
declare var $: any;

@Component
export default class Modal extends Vue {
    @Prop(String) readonly id?: string;
    @Prop(Object) settings!: { [key: string]: any }
    element: any;
    modalSettings!: { [key: string]: any };
    constructor() {
        super();
    }
    mounted() {
        this.element = $('#' + this.id);
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
            <div id={'modal-' + this.id}>
                <div id={this.id} class="ui modal">
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
            </div>
        );
    }
}
