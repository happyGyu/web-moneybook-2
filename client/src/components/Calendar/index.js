import './index.css';
import Component from '@/base/component';
import CalendarHeader from './CalendarHeader';

export default class Calendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'calendar' });
  }

  render() {
    new CalendarHeader(this.currentNode);
  }
}
