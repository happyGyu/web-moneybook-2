import controller from '@/controller';
import Component from '@/base/component';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';

export default class PaymentMethodInput extends Component {
  constructor(parentNode) {
    super(parentNode, 'ul', { class: 'dropdown__list' });
    this.activate();
  }

  render(paymentMethodData) {
    if (!paymentMethodData) return;
    this.currentNode.innerHTML = `
      ${paymentMethodData
        .map(
          ({ id, title }) =>
            `<li class="dropdown__item payment-method__item" data-id=${id} data-title=${title}>
                <span>${title}</span>
                <button class="payment-method__delete-btn">X</button>
            </li>`,
        )
        .join('')}
      <li class="dropdown__item payment-method__add-btn">추가하기</li>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.PAYMENT_METHODS);
    this.addEvent('click', '.payment-method__item', (event) =>
      this.setPaymentMethod(event),
    );
    this.addEvent('click', '.payment-method__delete-btn', () =>
      alert('delete'),
    );
    this.addEvent('click', '.payment-method__add-btn', () => alert('add'));
  }

  setPaymentMethod(event) {
    event.stopPropagation();
    const { id, title } = event.target.dataset;
    controller.changeInputData(INPUT_BAR_KEYS.PAYMENT_METHOD, { id, title });
  }
}
