import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
    @Prop(String) readonly message?: string;
    constructor() {
        super();
    }
    render() {
        console.log(this.$props);
        return <div>Logo - {this.message}</div>;
    }
}
