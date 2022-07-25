import Component from '@/base/component';
import controller from '@/controller';
import { STORE_KEYS } from '@/constants/keys';

export default class ConfirmButton extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'confirm-button-container' });
    this.activate();
  }

  render(isInputBarValid) {
    this.currentNode.innerHTML = `
      <button class="confirm-button" ${
        isInputBarValid ? '' : 'disabled'
      }>버튼</button>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.IS_INPUT_BAR_VALID);
    this.addEvent(
      'click',
      '.confirm-button',
      controller.createNewTransactionHistory,
    );
  }
}
