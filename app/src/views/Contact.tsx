import { Vue, Component } from 'vue-property-decorator';
import Logo from '../components/Logo';

@Component({
  components: { Logo },
})
export default class Contact extends Vue {
    message?: string;

    render() {
      this.message = 'hihi';
      return (
            <div>
                Contact <Logo message={this.message}></Logo>
            </div>
      );
    }
}
