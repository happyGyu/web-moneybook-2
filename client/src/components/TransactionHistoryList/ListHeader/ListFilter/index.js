import Component from '@/base/component';
import controller from '@/controller';

export default class ListFilter extends Component {
  constructor(
    parentNode,
    filterOptions,
    { totalIncomeAmount, totalSpentAmount },
  ) {
    super(
      parentNode,
      'div',
      { class: 'transaction-history-list__filter-container' },
      filterOptions,
      { totalIncomeAmount, totalSpentAmount },
    );
    this.activate();
  }
  render(filterOptions) {
    const { totalIncomeAmount, totalSpentAmount } = this.props;
    this.currentNode.innerHTML = `
      <input type="checkbox" id="income-checkbox" ${
        filterOptions.income ? 'checked' : ''
      }>
      <label for="income-checkbox" class="transaction-history-list__filter-income">수입 ${totalIncomeAmount.toLocaleString()}</label>
      <input type="checkbox" id="spent-checkbox" ${
        filterOptions.spent ? 'checked' : ''
      }>
      <label for="spent-checkbox" class="transaction-history-list__filter-spending">지출 ${totalSpentAmount.toLocaleString()}</label>
    `;
  }

  activate() {
    this.addEvent('click', '#income-checkbox', (event) =>
      controller.changeFilterOptions('income', event.target.checked),
    );
    this.addEvent('click', '#spent-checkbox', (event) =>
      controller.changeFilterOptions('spent', event.target.checked),
    );
  }
}
