import '@/styles/normalize.css';
import '@/styles/fonts.css';
import '@/styles/global.css';
import Router from './base/router';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import CalendarPage from './pages/CalendarPage';
import StatisticsPage from './pages/StatisticsPage';

(function () {
  const app = document.getElementById('app');

  new Header(app);
  new Router({
    '/': () => new MainPage(app),
    '/calendar': () => new CalendarPage(app),
    '/statistics': () => new StatisticsPage(app),
    '*': () => new NotFoundPage(app),
  });
})();
