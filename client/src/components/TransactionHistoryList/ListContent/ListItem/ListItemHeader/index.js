import Component from '@/base/component';
import { getYearAndMonthAndDate, getDayName } from '@/utils/date-util';

export default class ListItemHeader extends Component {
  constructor(parentNode, listItemHeaderData) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-item__header' },
      listItemHeaderData,
    );
    this.activate();
  }
  render(listItemHeaderData) {
    const { dateString, totalIncome, totalSpent } = listItemHeaderData;
    const dateTemplate = this.getDateTemplate(new Date(dateString));
    const totalAmountTemplate = this.getTotalAmountTemplate(
      totalIncome,
      totalSpent,
    );
    this.currentNode.innerHTML = dateTemplate + totalAmountTemplate;
  }

  getDateTemplate(dateObj) {
    const { month, date } = getYearAndMonthAndDate(dateObj);
    const dayName = getDayName(dateObj);
    return `
      <h4 class="transaction-history-item__date">
        ${month}월 ${date}일
        <span class="transaction-history-item__day-name">${dayName}<span>
      </h4>
    `;
  }

  getTotalAmountTemplate(totalIncome, totalSpent) {
    const totalIncomeText = totalIncome
      ? `수입 ${totalIncome.toLocaleString()}`
      : '';
    const totalSpentText = totalSpent
      ? `지출 ${totalSpent.toLocaleString()}`
      : '';
    return `<span class="transaction-history-item__total-amount">${
      totalIncomeText + totalSpentText
    }</span>`;
  }
}
