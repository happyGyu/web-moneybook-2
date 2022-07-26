import Component from '@/base/component';

function splitByLength(arr, length) {
  const totalLength = Math.ceil(arr.length / length);
  return arr.reduce(
    (prev, curr, currIndex) => {
      prev[Math.floor(currIndex / length)].push(curr);
      return prev;
    },
    Array.from({ length: totalLength }).map(() => []),
  );
}

export default class CalendarBody extends Component {
  constructor(parentNode) {
    super(parentNode, 'tbody', { class: 'calendar-body' });
  }

  render() {
    const days = new Array(35).fill(undefined).map((_, i) => i + 1);
    const weeks = splitByLength(days, 7);
    this.currentNode.innerHTML = `
      ${weeks
        .map(
          (week) => `
          <tr class="calendar-body__week">
          ${week
            .map(
              (day) => `
              <td class="calendar-body__day">
                <span class="calendar-day__income">100,000</span>
                <span class="calendar-day__spent">-132,000</span>
                <span class="calendar-day__total">-32,000</span>
                <span class="calendar-day__date">${day}</span>
              </td>
            `,
            )
            .join('')}
          </tr>
        `,
        )
        .join('')}
    `;
  }
}
