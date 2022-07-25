import Component from '@/base/component';
import controller from '@/controller';
import { STORE_KEYS } from '@/constants/keys';

export default class ListFilter extends Component {
  constructor(parentNode, { totalIncome, totalSpent }) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-list__filter-container' },
      null,
      { totalIncome, totalSpent },
    );
    this.activate();
  }
  render(filterOptions) {
    if (!filterOptions) return;
    const { totalIncome, totalSpent } = this.props;
    this.currentNode.innerHTML = `
      <input type="checkbox" id="income-checkbox" ${
        filterOptions.income ? 'checked' : ''
      }>
      <label for="income-checkbox" class="transaction-history-list__filter-income">수입 ${totalIncome.toLocaleString()}</label>
      <input type="checkbox" id="spent-checkbox" ${
        filterOptions.spent ? 'checked' : ''
      }>
      <label for="spent-checkbox" class="transaction-history-list__filter-spending">지출 ${totalSpent.toLocaleString()}</label>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.FILTER_OPTIONS);
    this.addEvent('click', '#income-checkbox', (event) =>
      controller.changeFilterOptions('income', event.target.checked),
    );
    this.addEvent('click', '#spent-checkbox', (event) =>
      controller.changeFilterOptions('spent', event.target.checked),
    );
  }
}
