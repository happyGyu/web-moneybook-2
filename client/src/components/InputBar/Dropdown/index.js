import Component from '@/base/component';
import controller from '@/controller';

export default class Dropdown extends Component {
  constructor(parentNode, storeKey, inputBarKey) {
    super(parentNode, 'div', { class: 'dropdown shadow closed' });
    this.storeKey = storeKey;
    this.inputBarKey = inputBarKey;
    this.activate();
  }

  render(dropdownItemData) {
    if (!dropdownItemData) return;
    this.currentNode.innerHTML = `
      <div class="dropdown__backdrop"></div>
      <ul class="dropdown__list">
        ${dropdownItemData
          .map(
            ({ id, title }) =>
              `<li class="dropdown__item" data-id=${id} data-title=${title}>${title}</li>`,
          )
          .join('')}  
      </ul>
    `;
  }

  activate() {
    this.subscribe(this.storeKey);
    this.addEvent('click', '.dropdown__item', (event) =>
      this.handleDropdownItemClick(event),
    );
  }

  handleDropdownItemClick(event) {
    event.stopPropagation();
    const { id, title } = event.target.dataset;
    controller.changeInputData(this.inputBarKey, { id, title });
  }
}
