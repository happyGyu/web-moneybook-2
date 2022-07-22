import './index.css';
import Router from '@/base/router';
import Component from '@/base/component';
import Navigation from './Navigation';

export default class Header extends Component {
  constructor(parentNode) {
    super(parentNode, 'header', { class: 'header' });
  }

  render() {
    // new Logo(this.currentNode);
    // new HeaderCalendar(this.currentNode);
    new Navigation(this.currentNode);
  }

  activate() {
    this.addEvent('click', '.link', (event) => {
      event.preventDefault();
      Router.link(event.target.pathname);
    });
  }
}
