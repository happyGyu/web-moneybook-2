import Component from '@/base/component';

export default class ListHeader extends Component {
  constructor(parentNode, listHeaderData) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-list__header' },
      listHeaderData,
    );
    this.activate();
  }
  render(listHeaderData) {
    const { totalCnt, totalIncome, totalSpent } = listHeaderData;
    this.currentNode.innerHTML = `
          <h1 class="transaction-history-list__title">전체내역 ${totalCnt}건</h1>
          <div class="transaction-history-list__filter-container">
              <input type="checkbox" name="income-checkbox">
              <label for="income-checkbox" class="transaction-history-list__filter-income">수입 ${totalIncome.toLocaleString()}</label>
              <input type="checkbox" name="spent-checkbox">
              <label for="spent-checkbox" class="transaction-history-list__filter-spending">지출 ${totalSpent.toLocaleString()}</label>
          </div>
        `;
  }
}
