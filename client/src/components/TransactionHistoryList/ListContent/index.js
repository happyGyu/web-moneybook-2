import Component from '@/base/component';
import ListItem from './ListItem';
import { convertDateString } from '@/utils/date-util';
import { STORE_KEYS } from '@/constants/keys';
import EditingOverlay from './EditingOverlay';

export default class ListContent extends Component {
  constructor(parentNode, transactionHistories) {
    super(parentNode, 'ul', { class: 'transaction-history-list' }, null, {
      transactionHistories,
    });
    this.activate();
  }

  render(filterOptions) {
    if (!filterOptions) return;
    const { transactionHistories } = this.props;
    const sortedListItemData = this.makSortedTransactionHistoryGroupbyDate(
      transactionHistories,
      filterOptions,
    );
    this.currentNode.innerHTML = '';
    sortedListItemData.forEach(
      (listItemData) => new ListItem(this.currentNode, listItemData),
    );
    new EditingOverlay(this.currentNode);
  }

  activate() {
    this.subscribe(STORE_KEYS.FILTER_OPTIONS);
  }

  makeTransactionHistoryGroupByDate(transactionHistories, filterOptions) {
    const groupMap = new Map();
    transactionHistories.forEach((history) => {
      const dateString = convertDateString(new Date(history.date));
      if (!this.doesHistoryPassFilter(history, filterOptions)) return;
      if (!groupMap.has(dateString)) {
        groupMap.set(dateString, []);
      }
      groupMap.get(dateString).push(history);
    });
    return groupMap;
  }

  doesHistoryPassFilter(history, filterOptions) {
    const type = history.isIncome ? 'income' : 'spent';
    return filterOptions[type];
  }

  sortGroup(groupMap) {
    const groupArr = [...groupMap];
    const sortedGroupArr = groupArr.sort(
      (group1, group2) => new Date(group2[0]) - new Date(group1[0]),
    );
    return sortedGroupArr;
  }

  makSortedTransactionHistoryGroupbyDate(transactionHistories, filterOptions) {
    const groupMap = this.makeTransactionHistoryGroupByDate(
      transactionHistories,
      filterOptions,
    );
    const sortedGroupArr = this.sortGroup(groupMap);
    return sortedGroupArr;
  }
}
