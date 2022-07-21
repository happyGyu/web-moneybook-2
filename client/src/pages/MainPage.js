import Component from '../base/component';

export default class MainPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    this.currentNode.innerHTML = '<h2>MainPage</h2>';
  }
}
