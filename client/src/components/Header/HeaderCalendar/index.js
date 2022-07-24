import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import controller from '@/controller';
import dateUtil from '@/utils/date-util';
import chevronLeftIcon from '@/assets/chevron-left.svg';
import chevronRightIcon from '@/assets/chevron-right.svg';

export default class HeaderCalendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'header-calendar' });
  }

  render(currentHeaderDate) {
    if (!currentHeaderDate) return;
    const { year, month } = dateUtil.getYearAndMonth(currentHeaderDate);
    this.currentNode.innerHTML = `
        <button class='header-calendar__button--prev'>${chevronLeftIcon}</button>
        <div class='header-calendar__container'>
          <div class='header-calendar__month font-dohyeon'>${month}월</div>
          <div class='header-calendar__year font-dohyeon'>${year}</div>
        </div>
        <button class='header-calendar__button--next'>${chevronRightIcon}</button>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.CURRENT_HEADER_DATE);
    this.addEvents();
  }

  addEvents() {
    this.addEvent(
      'click',
      '.header-calendar__button--prev',
      controller.decreaseMonth,
    );
    this.addEvent(
      'click',
      '.header-calendar__button--next',
      controller.increaseMonth,
    );
  }
}
