import Router from '../base/router';
import Component from '../base/component';

export default class Header extends Component {
  constructor(parentNode) {
    super(parentNode, 'header', { class: 'header' });
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

  activate() {
    const anchors = [...this.currentNode.querySelectorAll('.link')];
    this.currentNode.addEventListener('click', (event) => {
      if (!anchors.includes(event.target)) return;
      event.preventDefault();
      Router.link(event.target.pathname);
    });
  }
}
