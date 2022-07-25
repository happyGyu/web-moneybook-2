import Component from '@/base/component';

export default class Dropdown extends Component {
  constructor(parentNode, ListComponent) {
    super(parentNode, 'div', { class: 'dropdown shadow closed' }, null, {
      ListComponent,
    });
    this.activate();
  }

  render() {
    const { ListComponent } = this.props;
    this.currentNode.innerHTML = `<div class="dropdown__backdrop"></div>`;
    new ListComponent(this.currentNode);
  }
}
