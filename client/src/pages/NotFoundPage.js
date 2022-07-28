import Component from '@/base/component';

export default class NotFoundPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'not-found-page' });
  }

  render() {
    this.currentNode.innerHTML = '<h2>NotFound</h2>';
  }
}
