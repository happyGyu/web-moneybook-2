export default class Router {
  static #instance;

  constructor(routes) {
    if (Router.#instance) {
      return Router.#instance;
    }

    this.routes = new Map(Object.entries(routes));
    this.render(location.pathname);
    this.onPopState();
    Router.#instance = this;
  }

  render(pathname) {
    if (this.routes.has(pathname)) {
      this.routes.get(pathname)();
    } else {
      this.routes.get('/404')();
    }
  }

  onPopState() {
    window.addEventListener('popstate', () => {
      this.render(location.pathname);
    });
  }

  static link(pathname, data, unused) {
    if (!Router.#instance) return;
    history.pushState(data, unused, pathname);
    Router.#instance.render(pathname);
  }
}
