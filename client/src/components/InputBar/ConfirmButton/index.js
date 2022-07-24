import Component from '@/base/component';
import controller from '@/controller';

export default class ConfirmButton extends Component {
  constructor(parentNode, inputData) {
    super(parentNode, 'div', { class: 'confirm-button-container' }, inputData);
    this.activate();
  }

  render(inputData) {
    const doseAllInputFilled = this.checkAllInputFilled(inputData);
    this.currentNode.innerHTML = `
      <button class="confirm-button" ${
        doseAllInputFilled ? '' : 'disabled'
      }>버튼</button>
    `;
  }

  checkAllInputFilled(inputData) {
    const inputValues = Object.values(inputData);
    return inputValues.every((value) => value !== null);
  }

  activate() {
    this.addEvent(
      'click',
      '.confirm-button',
      controller.createNewTransactionHistory,
    );
  }
}
