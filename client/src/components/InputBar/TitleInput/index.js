import Component from '@/base/component';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';
export default class TitleInput extends Component {
  constructor(parentNode, titleData) {
    super(parentNode, 'label', { class: 'input-box' }, titleData);
    this.activate();
  }

  render(titleData) {
    this.currentNode.innerHTML = `
      <h4 class="input__title">내용</h4>
      <input class="input input__content" name="title" type="text" placeholder='입력하세요' value="${
        titleData || ''
      }">
    `;
  }

  activate() {
    this.addEvent('input', '.input__content', (event) =>
      controller.changeInputData(INPUT_BAR_KEYS.TITLE, event.target.value, {
        rerender: false,
      }),
    );
  }
}
