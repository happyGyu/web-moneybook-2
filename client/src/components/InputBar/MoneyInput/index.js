import Component from '@/base/component';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';

export default class MoneyInput extends Component {
  constructor(parentNode, moneyData) {
    super(parentNode, 'label', { class: 'input-box' }, moneyData);
    this.moneyData = moneyData;
    this.activate();
  }

  render(moneyData) {
    this.moneyData = moneyData;
    const { isIncome, amount } = moneyData;
    this.currentNode.innerHTML = `
      <h4 class="input__title">금액</h4>
      <div class="input__money-container">
        <span class="input input__money-sign" name="money-sign" type="text" data-isincome=${isIncome}>${
      isIncome ? '+' : '-'
    }</span>
        <input class="input input__money-amount" name="amount" type="number" placeholder='입력하세요' value="${
          amount || ''
        }">
        <span>원</span>
      </div>
      `;
  }

  activate() {
    this.addEvent('input', '.input__money-amount', (event) =>
      controller.changeInputData(INPUT_BAR_KEYS.AMOUNT, event.target.value, {
        rerender: false,
      }),
    );
    this.addEvent('click', '.input__money-sign', (event) =>
      controller.changeInputData(
        INPUT_BAR_KEYS.IS_INCOME,
        !this.moneyData.isIncome,
      ),
    );
  }
}
