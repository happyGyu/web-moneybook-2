import Component from '@/base/component';
import InputBar from '@/components/InputBar';
import TransactionHistoryList from '@/components/TransactionHistoryList';

export default class MainPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    new InputBar(this.currentNode);
    new TransactionHistoryList(this.currentNode);
  }
}
