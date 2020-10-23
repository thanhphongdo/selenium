import { Vue, Component } from 'vue-property-decorator';
import Logo from '../components/Logo';

@Component({
  components: { Logo },
})
export default class Home extends Vue {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}