import Component from '@/base/component';
import ListHeader from './ListHeader';
import { STORE_KEYS } from '@/constants/keys';
import './index.css';
import ListContent from './ListContent';
import { calTotalIncomeAndSpent } from '@/utils/transaction-history-util';

export default class TransactionHistoryList extends Component {
  constructor(parentNode) {
    super(parentNode, 'section', {
      class: 'transaction-history-list-container',
    });
    this.activate();
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const listHeaderData = calTotalIncomeAndSpent(transactionHistories);
    console.log(listHeaderData);
    new ListHeader(this.currentNode, listHeaderData);
    new ListContent(this.currentNode, transactionHistories);
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  countIncomeAndSpent(transactionHistories) {
    transactionHistories.reduce(
      (counts, history) => {
        history.isIncome ? counts.incomeCnt++ : counts.spentCnt++;
        return counts;
      },
      { incomeCnt, spentCnt },
    );
  }
}
