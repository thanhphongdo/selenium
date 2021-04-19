import { Vue, Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../BaseComponent';

@Component
export default class BaseControl extends BaseComponent {
    @Prop(String) readonly id?: string;
    @Prop(String) readonly className?: string;
    @Prop(Object) settings!: { [key: string]: any }
    cmpSettings!: { [key: string]: any }
    eleId!: string;
    element: any;
    constructor() {
        super();
    }

    mounted() {
        this.element = this.jQuery('#' + this.eleId);
        this.cmpSettings = this.settings || {};
    }

    set(settings: { [key: string]: any }) {
        this.cmpSettings = settings || {};
    }

    setControlId(controlName: string) {
        this.eleId = controlName.toLowerCase() + '-' + (this.id || new Date().getTime());
    }
} 
