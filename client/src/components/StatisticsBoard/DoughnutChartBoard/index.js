import store from '@/store';
import Component from '@/base/component';
import SpentList from './SpentList';
import DoughnutChart from './DoughnutChart';
import { STORE_KEYS } from '@/constants/keys';
import { getTotalSpentAmounts } from '@/utils/transaction-history-util';

export default class DoughnutChartBoard extends Component {
  constructor(parentNode, initialData) {
    super(
      parentNode,
      'section',
      { class: 'doughnut-chart-board' },
      initialData,
    );
    this.activate();
  }

  render(transactionHistories) {
    this.currentNode.innerHTML = `
      <div class="doughnut-chart-board__chart">
        <canvas class="doughnut-chart"></canvas>
      </div>
      <div class="doughnut-chart-board__list"></div>
    `;

    const categories = store.getData(STORE_KEYS.CATEGORIES);
    const totalSpentAmounts = getTotalSpentAmounts(
      transactionHistories,
      categories,
    );
    const key = {
      label: 'category',
      value: 'totalSpentAmount',
      color: 'color',
    };
    const chart = this.currentNode.querySelector('.doughnut-chart');
    const list = this.currentNode.querySelector('.doughnut-chart-board__list');
    new DoughnutChart(chart, totalSpentAmounts, {
      key,
      scale: 0.8,
      innerRadius: 0.5,
    }).startDraw(0.025);
    new SpentList(list, totalSpentAmounts);
  }
}
