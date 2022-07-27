import Component from '@/base/component';
import Dropdown from '../Dropdown';
import PaymentMethodList from './PaymentMethodList';

export default class PaymentMethodInput extends Component {
  constructor(parentNode, paymentMethodTitle) {
    super(parentNode, 'div', { class: 'input-box' }, paymentMethodTitle);
    this.activate();
  }

  render(paymentMethodTitle) {
    this.currentNode.innerHTML = `
      <label for="inputbar-payment-methods" class="input__label">결제수단</label>
      <input id="inputbar-payment-methods" class="input input__payment-methods"
        name="category" type="text" placeholder="선택하세요"
        value="${paymentMethodTitle || ''}" readonly />        
    `;
    new Dropdown(this.currentNode, PaymentMethodList);
  }

  activate() {
    this.addEvent('click', '.input__payment-methods', () =>
      this.toggleDropDown(),
    );
  }

  toggleDropDown() {
    const dropdown = this.currentNode.querySelector('.dropdown');
    dropdown.classList.toggle('closed');
  }
}
