import './index.css';
import Component from '@/base/component';
import LineChart from './LineChart';

export default class LineChartBoard extends Component {
  constructor(parentNode, categoryChartData) {
    super(
      parentNode,
      'section',
      { class: 'line-chart-board' },
      categoryChartData,
    );
  }

  render(categoryChartData) {
    const { category: categoryTitle, data } = categoryChartData;
    this.currentNode.innerHTML = `
        <h3 class="line-chart__title">${categoryTitle} 카테고리 소비 추이</h3>
    `;
    new LineChart(this.currentNode, data);
  }
}
