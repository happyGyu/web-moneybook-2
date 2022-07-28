import Component from '@/base/component';
import StatisticsBoard from '@/components/StatisticsBoard';

export default class StatisticsPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'container' });
  }

  render() {
    new StatisticsBoard(this.currentNode);
  }
}
