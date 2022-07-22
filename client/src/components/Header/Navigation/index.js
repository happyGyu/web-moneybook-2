import './index.css';
import Component from '@/base/component';

export default class Navigation extends Component {
  constructor(parentNode) {
    super(parentNode, 'nav', { class: 'navigation' });
  }

  render() {
    this.currentNode.innerHTML = `
      <nav>
        <a class="link" href='/'>메인</a>
        <a class="link" href="/calendar">달력</a>
        <a class="link" href="/statistics">통계</a>
      </nav>
    `;
  }
}
