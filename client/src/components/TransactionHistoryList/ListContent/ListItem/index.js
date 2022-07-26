import Component from '@/base/component';
import ListItemHeader from './ListItemHeader';
import { calTotalIncomeAndSpent } from '@/utils/transaction-history-util';
import ListItemCell from './ListItemCell';

export default class ListItem extends Component {
  constructor(parentNode, listItemData) {
    super(
      parentNode,
      'li',
      { class: 'transaction-history-item' },
      listItemData,
    );
  }
  render(listItemData) {
    const [dateString, transactionHistories] = listItemData;
    const totalIncomeAndSpent = calTotalIncomeAndSpent(transactionHistories);
    const listItemHeaderData = { dateString, ...totalIncomeAndSpent };
    new ListItemHeader(this.currentNode, listItemHeaderData);
    transactionHistories.forEach(
      (history) => new ListItemCell(this.currentNode, history),
    );
  }
}
