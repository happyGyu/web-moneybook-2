import './index.css';
import Component from '@/base/component';
import DateInput from './DateInput';
import TitleInput from './TitleInput';
import CategoryInput from './CategoryInput';
import PaymentMethodInput from './PaymentMethodInput';
import MoneyInput from './MoneyInput';
import SubmitButton from './SubmitButton';
import { STORE_KEYS } from '@/constants/keys';

export default class InputBar extends Component {
  constructor(parentNode) {
    super(parentNode, 'form', { class: 'input-bar shadow' });
    this.activate();
  }

  render(inputBarData) {
    if (!inputBarData) return;
    const { date, title, category, paymentMethod, isIncome, amount } =
      inputBarData;
    this.currentNode.innerHTML = '';
    new DateInput(this.currentNode, date);
    new CategoryInput(this.currentNode, category);
    new TitleInput(this.currentNode, title);
    new PaymentMethodInput(this.currentNode, paymentMethod);
    new MoneyInput(this.currentNode, { isIncome, amount });
    new SubmitButton(this.currentNode);
  }

  activate() {
    this.subscribe(STORE_KEYS.INPUT_BAR_DATA);
  }
}
