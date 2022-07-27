import Component from '@/base/component';
// import {
//   calculateTotalAmount,
//   makeTransactionHistoryGroupbyCategory,
// } from '@/utils/transaction-history-util';

export default class SpentList extends Component {
  constructor(parentNode, initialData) {
    super(parentNode, 'ul', { class: 'spent-list' }, initialData);
  }

  render(totalSpentAmounts) {
    console.log(totalSpentAmounts);
    const monthTotalSpentAmount = totalSpentAmounts.reduce(
      (prev, { totalSpentAmount }) => prev + totalSpentAmount,
      0,
    );
    this.currentNode.innerHTML = `
      <h3 class="spent-list__title">이번 달 지출 금액 ${monthTotalSpentAmount.toLocaleString()}</h3>
      ${totalSpentAmounts
        .map((totalSpentAmountData) =>
          this.getListItemTemplate(totalSpentAmountData, monthTotalSpentAmount),
        )
        .join('')}
      `;
  }

  getListItemTemplate(totalSpentAmountData, monthTotalSpentAmount) {
    const { id, title, color, totalSpentAmount } = totalSpentAmountData;

    return `
    <div class="spent-list-item" data-id="${id}" data-title="${title}">
      <div class="spent-list-item__category" style="background: ${color}">${title}</div>
      <span class="spent-list-item__ratio">${Math.round(
        (totalSpentAmount / monthTotalSpentAmount) * 100,
      )}%</span>
      <span class="spent-list-item__spent">${totalSpentAmount.toLocaleString()}</span>
    </div>
    `;
  }
}
