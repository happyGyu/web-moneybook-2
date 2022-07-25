import Component from '@/base/component';
import Dropdown from '../Dropdown';
import PaymentMethodList from './PaymentMethodList';

export default class PaymentMethodInput extends Component {
  constructor(parentNode, paymentMethodInputData) {
    super(parentNode, 'label', { class: 'input-box' }, paymentMethodInputData);
    this.activate();
  }

  render(paymentMethodInputData) {
    this.currentNode.innerHTML = `
        <h4 class="input__title">분류</h4>
        <input readonly class="input input__payment-methods" name="category" type="text" placeholder="선택하세요" value="${
          paymentMethodInputData?.title || ''
        }">        
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
