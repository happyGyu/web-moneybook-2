import controller from '@/controller';
import Component from '@/base/component';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';

export default class CategoryList extends Component {
  constructor(parentNode) {
    super(parentNode, 'ul', { class: 'dropdown__list' });
    this.activate();
  }

  render(categoryListData) {
    if (!categoryListData) return;
    this.currentNode.innerHTML = `
      ${categoryListData
        .map(
          ({ id, title }) =>
            `<li class="dropdown__item category__item" data-id=${id} data-title=${title}>${title}</li>`,
        )
        .join('')}
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.CATEGORIES);
    this.addEvent('click', '.category__item', (event) =>
      this.setCategory(event),
    );
  }

  setCategory(event) {
    event.stopPropagation();
    const { id, title } = event.target.dataset;
    controller.changeInputData(INPUT_BAR_KEYS.CATEGORY, { id, title });
  }
}