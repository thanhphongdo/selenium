import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['getMessage']),
  },
  methods: {
    ...mapActions(['changeMessage']),
  },
})
export default class Logo extends Vue {
    @Prop(String) readonly message?: string;

    messageCount = 0;

    getMessage?: string;

    changeMessage!: (newMessage: string) => void;

    constructor() {
      super();
      // this.messageCount = 0;
    }

    render() {
      return (
            <div>
                <button on-click={() => this.changeMessage(`${++this.messageCount} changed`)}>change message</button>
                <div>Logo - {this.message}</div>
                <div>{this.getMessage}</div>
            </div>
      );
    }
}
