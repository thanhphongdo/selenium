import { Vue, Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';
declare var $: any;

@Component
export default class Modal extends BaseComponent {
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
