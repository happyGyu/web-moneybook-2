import Component from '@/base/component';

export default class Navigation extends Component {
  constructor(parentNode) {
    super(parentNode, 'nav', { class: 'header__navigation' });
  }

  render() {
    this.currentNode.innerHTML = `
      <a class="header__navigation--link link" href="/">메인</a>
      <a class="header__navigation--link link" href="/calendar">달력</a>
      <a class="header__navigation--link link" href="/statistics">통계</a>
    `;
  }
}
