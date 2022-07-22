import Component from '@/base/component';

export default class NotFoundPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    this.currentNode.innerHTML = '<h2>NotFound</h2>';
  }
}
