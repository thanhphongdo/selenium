import { Vue } from 'vue-property-decorator';
export default class BaseComponent extends Vue {
    filters: { [key: string]: Function } | undefined;
    constructor() {
        super();
        this.filters = this.$options.filters;
    }
    notify(obj: any) {
        obj.__ob__.dep.notify();
    }
    showLoading() {
        (window as any).showLoading();
    }
    hideLoading() {
        (window as any).hideLoading();
    }
}
