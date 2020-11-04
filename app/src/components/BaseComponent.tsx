import { Vue } from 'vue-property-decorator';
export default class BaseComponent extends Vue {
    filters: { [key: string]: Function } | undefined;
    constructor() {
        super();
        this.filters = this.$options.filters;
    }
    showLoading() {
        (window as any).showLoading();
    }
    hideLoading() {
        (window as any).hideLoading();
    }
}
