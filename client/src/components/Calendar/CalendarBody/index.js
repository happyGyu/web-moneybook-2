import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import { splitByWeek, getAllDatesForCalendar } from '@/utils/date-util';
import {
  calculateTotalAmount,
  makeGroupByDate,
} from '@/utils/transaction-history-util';

export default class CalendarBody extends Component {
  constructor(parentNode, props) {
    super(parentNode, 'tbody', { class: 'calendar-body' }, null, props);
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const { currentDate } = this.props;
    const calendarDates = getAllDatesForCalendar(currentDate);
    const transactionHistoriesByDate = makeGroupByDate(transactionHistories);
    const weeks = splitByWeek(calendarDates, 7);
    this.currentNode.innerHTML = `
      ${weeks
        .map((week) => this.renderWeek(week, transactionHistoriesByDate))
        .join('')}
    `;
  }

  renderWeek(week, transactionHistoriesByDate) {
    return `
      <tr class="calendar-body__week">
        ${week
          .map((calendarInfo) =>
            this.renderDay(calendarInfo, transactionHistoriesByDate),
          )
          .join('')}
      </tr>
    `;
  }

  renderDay(calendarInfo, transactionHistoriesByDate) {
    const { date, dateString, isCurrentMonth } = calendarInfo;
    if (!isCurrentMonth) {
      return `
        <td class="calendar-body__day">
          <span class="calendar-day__date out-range">${date.getDate()}</span>
        </td>
      `;
    }

    const transactionHistories =
      transactionHistoriesByDate.get(dateString) || [];
    const { totalIncomeAmount, totalSpentAmount } =
      calculateTotalAmount(transactionHistories);
    const totalAmount = totalIncomeAmount - totalSpentAmount;
    return `
      <td class="calendar-body__day">
        ${
          totalIncomeAmount !== 0
            ? `<span class="calendar-day__income">
              ${totalIncomeAmount.toLocaleString()}
            </span>`
            : ''
        }
        ${
          totalSpentAmount !== 0
            ? `<span class="calendar-day__spent">
              -${totalSpentAmount.toLocaleString()}
            </span>`
            : ''
        }
        ${
          totalAmount !== 0
            ? `<span class="calendar-day__total">
              ${totalAmount.toLocaleString()}
            </span>`
            : ''
        }
        <span class="calendar-day__date">${date.getDate()}</span>
      </td>
    `;
  }
}
