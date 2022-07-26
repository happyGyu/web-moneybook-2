import Component from '@/base/component';

export default class CalendarHeader extends Component {
  constructor(parentNode) {
    super(parentNode, 'thead', { class: 'calendar-header' });
  }

  render() {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    this.currentNode.innerHTML = `
      <tr class="calendar-header__weekdays">
        ${weekDays
          .map(
            (weekDay) => `<th class="calendar-header__weekday">${weekDay}</th>`,
          )
          .join('')}
      </tr>
    `;
  }
}
