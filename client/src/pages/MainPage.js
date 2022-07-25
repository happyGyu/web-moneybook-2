import Component from '@/base/component';
import InputBar from '@/components/InputBar';
import './page.css';
export default class MainPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    new InputBar(this.currentNode);
  }
}
