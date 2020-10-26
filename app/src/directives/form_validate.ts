
import { DirectiveFunction, DirectiveOptions } from 'vue';
import { Vue } from 'vue-property-decorator';

export const FormValidateDirective: DirectiveOptions = {
    bind: (el, data) => {
        console.log(el);
        console.log(data.value);
    }
}