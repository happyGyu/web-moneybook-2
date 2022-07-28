import controller from '@/controller';
import Component from '@/base/component';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';

export default class CategoryList extends Component {
  constructor(parentNode, options) {
    super(parentNode, 'ul', { class: 'dropdown__list' }, null, { options });
    this.activate();
  }

  render(categoryListData) {
    if (!categoryListData) return;
    const { isIncome: currentInputBarIsIncome } = this.props.options;
    this.currentNode.innerHTML = `
      ${categoryListData
        .map(({ id, title, isIncome }) => {
          // category데이터는 서버로부터 응답 온 것이고, mysql에서는 true/false를 1/0으로 저장하기 때문에 === 비교가 불가
          return isIncome == currentInputBarIsIncome
            ? `<li class="dropdown__item category__item" data-id="${id}" data-title="${title}">${title}</li>`
            : '';
        })
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
    controller.changeInputData([
      { dataKey: INPUT_BAR_KEYS.CATEGORY_ID, value: id },
      { dataKey: INPUT_BAR_KEYS.CATEGORY_TITLE, value: title },
    ]);
  }
}
