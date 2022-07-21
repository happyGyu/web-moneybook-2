import Component from '../base/component';

export default class CalendarPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main');
  }

  render() {
    this.currentNode.innerHTML = '<h2>CalendarPage</h2>';
  }
}
