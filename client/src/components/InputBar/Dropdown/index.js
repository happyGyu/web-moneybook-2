import Component from '@/base/component';

export default class Dropdown extends Component {
  constructor(parentNode, ListComponent) {
    super(parentNode, 'div', { class: 'dropdown closed' }, null, {
      ListComponent,
    });
    this.activate();
  }

  render() {
    const { ListComponent } = this.props;
    this.currentNode.innerHTML = `<div class="dropdown__backdrop"></div>`;
    new ListComponent(this.currentNode);
  }

  activate() {
    this.addEvent('click', '.dropdown__backdrop', () => this.onCloseDropdown());
  }

  onCloseDropdown() {
    this.parentNode.classList.toggle('is-open-dropdown');
  }
}
