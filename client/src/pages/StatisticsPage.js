import Component from '@/base/component';
import DoughnutChartBoard from '@/components/DoughnutChartBoard';

export default class StatisticsPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'container' });
  }

  render() {
    new DoughnutChartBoard(this.currentNode);
  }
}
