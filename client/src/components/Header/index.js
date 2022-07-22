import Router from '@/base/router';
import Component from '@/base/component';
import Logo from './Logo';
import Navigation from './Navigation';

export default class Header extends Component {
  constructor(parentNode) {
    super(parentNode, 'header', { class: 'header' });
  }

  render() {
    new Logo(this.currentNode);
    new Navigation(this.currentNode);
  }

  activate() {
    this.addEvent('click', '.link', (event) => {
      event.preventDefault();
      Router.link(event.target.pathname);
    });
  }
}
