import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import {
  calculateTotalAmount,
  makeTransactionHistoryGroupbyCategory,
} from '@/utils/transaction-history-util';
export default class SpentList extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'spent-list' });
    this.activate();
  }

  render(transationHistories) {
    if (!transationHistories) return;
    const { totalSpentAmount } = calculateTotalAmount(transationHistories);
    const spentListData = this.makeSpentListData(transationHistories);
    this.currentNode.innerHTML = `
      <h3 class="spent-list__title">이번 달 지출 금액 ${totalSpentAmount.toLocaleString()}
      ${spentListData
        .map((itemData) => this.getListItemTemplate(itemData, totalSpentAmount))
        .join('')}
      `;
  }

  makeSpentListData(transactionHistories) {
    const groupByCategory = makeTransactionHistoryGroupbyCategory(
      transactionHistories,
      { spent: true },
    );
    return this.calculateSpentsByCategory(groupByCategory);
  }

  calculateSpentsByCategory(categoryGroup) {
    return [...categoryGroup].map(([categoryId, historyGroup]) => {
      const { categoryColor, categoryTitle } = historyGroup[0];
      const { totalSpentAmount } = calculateTotalAmount(historyGroup);
      return {
        categoryId,
        categoryColor,
        categoryTitle,
        categoryTotalSpent: totalSpentAmount,
      };
    });
  }

  getListItemTemplate(itemData, monthTotalSpent) {
    const { categoryId, categoryColor, categoryTitle, categoryTotalSpent } =
      itemData;
    return `
    <div class="spent-list-item" data-categoryid="${categoryId}">
      <div class="spent-list-item__category" style="background: ${categoryColor}">${categoryTitle}</div>
      <span class="spent-list-item__ratio">${Math.round(
        (categoryTotalSpent / monthTotalSpent) * 100,
      )}%</span>
      <span class="spent-list-item__spent">${categoryTotalSpent.toLocaleString()}</span>
    </div>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }
}
