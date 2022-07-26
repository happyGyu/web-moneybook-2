import './index.css';
import Component from '@/base/component';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';

export default class Calendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'table', {
      class: 'calendar container',
      cellspacing: 0,
    });
  }

  render() {
    new CalendarHeader(this.currentNode);
    new CalendarBody(this.currentNode);
    new CalendarFooter(this.currentNode);
  }
}
