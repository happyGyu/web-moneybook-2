import Component from '@/base/component';

export default class CalendarFooter extends Component {
  constructor(parentNode, props) {
    super(parentNode, 'tfoot', { class: 'calendar-footer' }, null, props);
  }

  render() {
    const { totalIncomeAmount, totalSpentAmount } = this.props;
    this.currentNode.innerHTML = `
      <tr class="calendar-footer__income">
        <th>총 수입</th>
        <td>${totalIncomeAmount.toLocaleString()}원</td>
      </tr>
      <tr class="calendar-footer__spent">
        <th>총 지출</th>
        <td>${totalSpentAmount.toLocaleString()}원</td>
      </tr>
      <tr class="calendar-footer__total">
        <th>총계</th>
        <td>${(totalIncomeAmount - totalSpentAmount).toLocaleString()}원</td>
      </tr>
    `;
  }
}
