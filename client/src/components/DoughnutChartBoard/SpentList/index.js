import Component from '@/base/component';

export default class SpentList extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'spent-list' });
    this.activate();
  }

  render() {
    this.currentNode.innerHTML = 'SPENTLIST';
  }

  activate() {}
}
