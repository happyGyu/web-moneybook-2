import Component from '@/base/component';
import Dropdown from '../Dropdown';
import CategoryList from './CategoryList';

export default class CategoryInput extends Component {
  constructor(parentNode, categoryTitle, isIncome) {
    super(parentNode, 'div', { class: 'input-box' }, categoryTitle, {
      isIncome,
    });
    this.activate();
  }

  render(categoryTitle) {
    this.currentNode.innerHTML = `
      <label for="inputbar-category" class="input__label">분류</label>
      <input id="inputbar-category" class="input input__category"
        name="category" type="text" placeholder="선택하세요"
        value="${categoryTitle || ''}" readonly />        
    `;
    new Dropdown(this.currentNode, CategoryList, this.props);
  }

  activate() {
    this.addEvent('click', '.input__category', (event) =>
      this.toggleDropDown(event),
    );
  }

  toggleDropDown(event) {
    const dropdown = this.currentNode.querySelector('.dropdown');
    dropdown.classList.toggle('closed');
  }
}
