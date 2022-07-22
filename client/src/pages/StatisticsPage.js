import Component from '@/base/component';

export default class StatisticsPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    this.currentNode.innerHTML = '<h2>StatisticsPage</h2>';
  }
}
