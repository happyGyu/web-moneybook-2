import Component from '@/base/component';
import ListFilter from './ListFilter';

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
        `;
    new ListFilter(this.currentNode, { totalIncome, totalSpent });
  }
}
