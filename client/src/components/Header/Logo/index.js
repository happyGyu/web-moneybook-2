import Component from '@/base/component';

export default class Logo extends Component {
  constructor(parentNode) {
    super(parentNode, 'h1', { class: 'logo' });
  }

  render() {
    this.currentNode.innerHTML = `
      <a class="logo__link link" href="/">우아우아한 가계부</h1>
    `;
  }
}
