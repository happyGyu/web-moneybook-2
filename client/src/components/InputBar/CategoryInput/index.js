import Component from '@/base/component';
import Dropdown from '../Dropdown';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';

export default class CategoryInput extends Component {
  constructor(parentNode, categoryInputData) {
    super(parentNode, 'label', { class: 'input-box' }, categoryInputData);
    this.activate();
  }

  render(categoryInputData) {
    this.currentNode.innerHTML = `
        <h4 class="input__title">분류</h4>
        <input readonly class="input input__category" name="category" type="text" placeholder="선택하세요" value="${
          categoryInputData?.title || ''
        }">        
        `;
    new Dropdown(
      this.currentNode,
      STORE_KEYS.CATEGORIES,
      INPUT_BAR_KEYS.CATEGORY,
    );
  }

  activate() {
    this.addEvent('click', '.input__category', () => this.toggleDropDown());
  }

  toggleDropDown() {
    const dropdown = this.currentNode.querySelector('.dropdown');
    dropdown.classList.toggle('closed');
  }
}
