import './index.css';
import Component from '@/base/component';
// import DoughnutChart from './DoughnutChart';
import SpentList from './SpentList';

export default class DoughnutChartBoard extends Component {
  constructor(parentNode) {
    super(parentNode, 'section', { class: 'doughnut-chart-board' });
    this.activate();
  }

  render() {
    // new DoughnutChart(this.currentNode);
    new SpentList(this.currentNode);
  }

  activate() {}
}
