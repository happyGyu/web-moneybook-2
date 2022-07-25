import Component from '@/base/component';
import ListItem from './ListItem';
import { convertDateString } from '@/utils/date-util';

export default class ListContent extends Component {
  constructor(parentNode, transactionHistories) {
    super(
      parentNode,
      'ul',
      { class: 'transaction-history-list' },
      transactionHistories,
    );
    this.activate();
  }

  render(transactionHistories) {
    const sortedListItemData =
      this.makSortedTransactionHistoryGroupbyDate(transactionHistories);
    sortedListItemData.forEach(
      (listItemData) => new ListItem(this.currentNode, listItemData),
    );
  }

  makeTransactionHistoryGroupByDate(transactionHistories) {
    const groupMap = new Map();
    transactionHistories.forEach((history) => {
      const dateString = convertDateString(new Date(history.date));
      if (!groupMap.has(dateString)) {
        groupMap.set(dateString, []);
      }
      groupMap.get(dateString).push(history);
    });
    return groupMap;
  }

  sortGroup(groupMap) {
    const groupArr = [...groupMap];
    const sortedGroupArr = groupArr.sort(
      (group1, group2) => new Date(group2[0]) - new Date(group1[0]),
    );
    return sortedGroupArr;
  }

  makSortedTransactionHistoryGroupbyDate(transactionHistories) {
    const groupMap =
      this.makeTransactionHistoryGroupByDate(transactionHistories);
    const sortedGroupArr = this.sortGroup(groupMap);
    return sortedGroupArr;
  }
}
