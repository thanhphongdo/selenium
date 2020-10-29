import { Vue } from 'vue-property-decorator';
export default class BaseComponent extends Vue {
    showLoading() {
        (window as any).showLoading();
    }
    hideLoading() {
        (window as any).hideLoading();
    }
}

