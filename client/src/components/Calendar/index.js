import './index.css';
import Component from '@/base/component';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import { STORE_KEYS } from '@/constants/keys';
import { calculateTotalAmount } from '@/utils/transaction-history-util';

export default class Calendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'table', {
      class: 'calendar container',
    });
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const { totalIncomeAmount, totalSpentAmount } =
      calculateTotalAmount(transactionHistories);
    new CalendarHeader(this.currentNode);
    new CalendarBody(this.currentNode);
    new CalendarFooter(this.currentNode, {
      totalIncomeAmount,
      totalSpentAmount,
    });
  }
}
