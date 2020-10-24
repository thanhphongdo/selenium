import { Vue, Component, Prop } from 'vue-property-decorator';
declare var $: any;

@Component
export default class Modal extends Vue {
    @Prop(String) readonly id?: string;
    constructor() {
        super();
    }
    mounted() {
        $('#' + this.id).modal('show');
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
                    <div class="image content">
                        {
                            (this.$scopedSlots as any).modalContent ? (this.$scopedSlots as any).modalContent() : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
