import Component from '@/base/component';

export default class HeaderCalendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'header-calendar' });
  }

  render(yearMonthData) {
    // const yearMonthData = { , 2021 };
    // if (!data) return;
    this.currentNode.innerHTML = `
        <button class='header-calendar__button--left'><</button>
        <div class='header-calendar__container'>
          <span class='header-calendar__month'>${7}월</span>
          <span class='header-calendar__year'>${2021}</span>
        </div>
        <button class='header-calendar__button--right'>></button>
    `;
  }
}
