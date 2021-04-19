declare var $: any;
import { Vue } from "vue-property-decorator";
export default class BaseComponent extends Vue {
  filters: { [key: string]: Function } | undefined;
  constructor() {
    super();
    this.filters = this.$options.filters;
    this.$emit("addRef", this);
  }
  jQuery(seletor: string) {
    return $(seletor);
  }
  ref(event: any, cmp: any) {
    (this as any)[cmp] = event;
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
