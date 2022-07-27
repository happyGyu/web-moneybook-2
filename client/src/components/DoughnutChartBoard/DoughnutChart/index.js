import Component from '@/base/component';

export default class DoughnutChart extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'doughnut-chart' });
    this.activate();
  }

  render() {
    this.currentNode.innerHTML = 'DOUGHNUT_CHART';
  }

  activate() {}
}
