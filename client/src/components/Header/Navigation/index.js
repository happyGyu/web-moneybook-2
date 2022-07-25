import Component from '@/base/component';
import fileIcon from '@/assets/file.svg';
import calendarIcon from '@/assets/calendar.svg';
import statisticsIcon from '@/assets/statistics.svg';

export default class Navigation extends Component {
  constructor(parentNode) {
    super(parentNode, 'nav', { class: 'header__navigation' });
  }

  render() {
    this.currentNode.innerHTML = `
      <a class="header__navigation--link link" href="/">${fileIcon}</a>
      <a class="header__navigation--link link" href="/calendar">${calendarIcon}</a>
      <a class="header__navigation--link link" href="/statistics">${statisticsIcon}</a>
    `;
  }
}
