import '@/styles/normalize.css';
import '@/styles/fonts.css';
import '@/styles/global.css';
import Router from '@/base/router';
import Header from '@/components/Header';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CalendarPage from '@/pages/CalendarPage';
import StatisticsPage from '@/pages/StatisticsPage';
import store from '@/store';
import request from '@/utils/api-util';

(async function () {
  const app = document.getElementById('app');
  const routes = {
    '/': () => new MainPage(app),
    '/calendar': () => new CalendarPage(app),
    '/statistics': () => new StatisticsPage(app),
    '*': () => new NotFoundPage(app),
  };

  await initStore();
  new Header(app);
  new Router(routes);
})();

async function initStore() {
  const currentHeaderDate = new Date();
  const [transactionHistories, categories, paymentMethods] = await Promise.all([
    request.getTranscationHistoriesByMonth(currentHeaderDate),
    request.getCategories(),
    request.getPaymentMethods(),
  ]);
  const inputBarData = {
    title: null,
    date: new Date(),
    category: null,
    paymentMethod: null,
    isIncome: false,
    amount: null,
  };
  const inputBarState = 'CREATE';
  const isInputBarValid = false;

  const initialData = {
    currentHeaderDate,
    transactionHistories,
    categories,
    paymentMethods,
    inputBarData,
    inputBarState,
    isInputBarValid,
  };
  store.initStore(initialData);
}
