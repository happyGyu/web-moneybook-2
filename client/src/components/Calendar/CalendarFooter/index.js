import Component from '@/base/component';

export default class CalendarFooter extends Component {
  constructor(parentNode) {
    super(parentNode, 'tfoot', { class: 'calendar-footer' });
  }

  render() {
    this.currentNode.innerHTML = `
      <tr class="calendar-footer__income">
        <th>총 수입</th>
        <td>1,822,480</td>
      </tr>
      <tr class="calendar-footer__spent">
        <th>총 지출</th>
        <td>1,822,480</td>
      </tr>
      <tr class="calendar-footer__total">
        <th>총계</th>
        <td>1,822,480</td>
      </tr>
    `;
  }
}
