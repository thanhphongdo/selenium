import { Vue, Component, Prop } from 'vue-property-decorator';
declare var $: any;

@Component
export default class Modal extends Vue {
    @Prop(String) readonly id?: string;
    @Prop(String) readonly className?: string;
    @Prop(Object) settings!: { [key: string]: any }
    eleId!: string;
    jQuery: (seletor: string) => any = $;
    constructor() {
        super();
    }

    setControlId(controlName: string) {
        this.eleId = controlName.toLowerCase() + '-' + (this.id || new Date().getTime());
    }
}
