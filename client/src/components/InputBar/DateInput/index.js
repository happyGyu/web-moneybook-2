import Component from '@/base/component';
import dateUtil from '@/utils/date-util';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';

export default class DateInput extends Component {
  constructor(parentNode, dateInputData) {
    super(parentNode, 'label', { class: 'input-box' }, dateInputData);
    this.activate();
  }

  render(dateInputData) {
    const dateString = dateUtil.convertDateString(dateInputData);
    const firstDateOfMonth = dateUtil.getFirstDateOfMonth(dateInputData);
    const firstDateString = dateUtil.convertDateString(firstDateOfMonth);
    const lastDateOfMonth = dateUtil.getLastDateOfMonth(dateInputData);
    const lastDateString = dateUtil.convertDateString(lastDateOfMonth);

    this.currentNode.innerHTML = `
      <h4 class="input__title">일자</h4>
      <input draggable="false" class="input input__date" name="date" type="date" min="${firstDateString}" max="${lastDateString}" value="${dateString}">
    `;
  }

  activate() {
    this.addEvent('input', '.input__date', this.handleDateInput.bind(this));
  }

  handleDateInput(event) {
    const inputValue = event.target.value;
    if (!inputValue) return;
    controller.changeInputData(INPUT_BAR_KEYS.DATE, new Date(inputValue));
  }
}
