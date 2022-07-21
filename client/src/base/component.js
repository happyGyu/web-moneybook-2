export default class Component {
  constructor(parentNode, tagName, attrs) {
    this.parentNode = parentNode;
    this.currentNode = document.createElement(tagName);
    this.setAttributes(attrs);

    this.render();
    this.activate();
    this.parentNode.appendChild(this.currentNode);
  }

  setAttributes(attrs) {
    if (!attrs) return;
    Object.entries(attrs).forEach(([key, value]) =>
      this.currentNode.setAttribute(key, value),
    );
  }

  activate() {}

  render() {}
}
