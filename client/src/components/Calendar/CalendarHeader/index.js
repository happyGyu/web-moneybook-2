import Component from '@/base/component';

export default class CalendarHeader extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'calendar-header container' });
  }

  render() {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    this.currentNode.innerHTML = `
      <ul class="calendar-header__weekdays">
        ${weekDays
          .map(
            (weekDay) => `
            <li class="calendar-header__weekday">${weekDay}</li>
          `,
          )
          .join('')}
      </ul>
    `;
  }
}
