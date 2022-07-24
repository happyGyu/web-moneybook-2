import Component from '@/base/component';
import { MODEL_KEYS } from '@/constants/keys';
import controller from '@/controller';
import dateUtil from '@/utils/date-util';
export default class HeaderCalendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'header-calendar' });
  }

  render(currentHeaderDate) {
    if (!currentHeaderDate) return;
    const { year, month } = dateUtil.getYearAndMonth(currentHeaderDate);
    this.currentNode.innerHTML = `
        <button class='header-calendar__button--prev'><</button>
        <div class='header-calendar__container'>
          <span class='header-calendar__month'>${month}월</span>
          <span class='header-calendar__year'>${year}</span>
        </div>
        <button class='header-calendar__button--next'>></button>
    `;
  }

  activate() {
    this.subscribe(MODEL_KEYS.CURRENT_HEADER_DATE);
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
